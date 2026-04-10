import { NextResponse } from 'next/server';
import sharp from 'sharp';
// Ensure this path matches your project structure
import { coreLeads, departments, pastMembers } from '@/app/team/teamData';

/**
 * ── BUILD-TIME PRE-CACHING (SSG) ──
 * This function tells Next.js to run the GET function for every single
 * member ID during the build process. These images will be saved as 
 * static files on Vercel's global CDN before you even deploy.
 */
export async function generateStaticParams() {
  try {
    const allMembers = [
      ...coreLeads,
      ...pastMembers,
      ...departments.flatMap((d) => [...d.leads, ...d.members]),
    ];

    const ids = allMembers
      .map((m) => {
        // Extract the ID from the Google Drive URL
        const match = m.image?.match(/\/d\/([a-zA-Z0-9_-]+)/);
        return match ? { id: match[1] } : null;
      })
      .filter((item): item is { id: string } => item !== null);

    // Filter for unique IDs to avoid duplicate processing
    const uniqueIds = Array.from(new Set(ids.map((i) => i.id))).map((id) => ({
      id,
    }));

    return uniqueIds;
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

/**
 * ── IMAGE OPTIMIZATION API ──
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) return new NextResponse('Missing ID', { status: 400 });

  // sz=w256 is the "sweet spot" source size for Google Drive thumbnails
  const driveUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w256`;

  try {
    const response = await fetch(driveUrl);
    
    if (!response.ok) {
      throw new Error(`Google Drive returned ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    /**
     * SHARP OPTIMIZATION:
     * 1. Resize to 128x128 (matching your TeamPage UI)
     * 2. 'cover' ensures the image fills the circle perfectly
     * 3. Convert to WebP for ~90% size reduction
     */
    const optimizedBuffer = await sharp(buffer)
      .resize(128, 128, { fit: 'cover', position: 'center' })
      .webp({ quality: 75, effort: 6 }) // effort 6 provides better compression at build time
      .toBuffer();

    // Convert Node.js Buffer to Web-Standard Uint8Array for Next.js Type Safety
    const webBuffer = new Uint8Array(optimizedBuffer);

    return new NextResponse(webBuffer, {
      headers: {
        'Content-Type': 'image/webp',
        /**
         * s-maxage: Cache on Vercel Edge for 1 year.
         * stale-while-revalidate: Serve old cache while updating in background.
         * This combination ensures your 95th percentile stays <100ms.
         */
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=60',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error(`Image processing failed for ID ${id}:`, error);
    
    // Return a 500 but keep it "stale" if possible so the UI doesn't break
    return new NextResponse('Error fetching or processing image', { status: 500 });
  }
}