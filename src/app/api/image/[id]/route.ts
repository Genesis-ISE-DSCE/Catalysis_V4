import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) return new NextResponse('Missing ID', { status: 400 });

  // We can fetch a slightly larger thumbnail (e.g., w256) to give sharp good data to work with
  const driveUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w128`;

  try {
    const response = await fetch(driveUrl);
    
    if (!response.ok) {
        throw new Error('Failed to fetch from Google Drive');
    }

    const arrayBuffer = await response.arrayBuffer();
    // Convert ArrayBuffer to Node.js Buffer for sharp
    const buffer = Buffer.from(arrayBuffer); 

    // Compress, resize, and convert to WebP
    const optimizedBuffer = await sharp(buffer)
      .resize(128, 128, { fit: 'cover' }) // Force exact dimensions
      .webp({ quality: 75 }) // Convert to WebP (75 is the sweet spot for quality/size)
      .toBuffer();

    const webBuffer = new Uint8Array(optimizedBuffer);

    return new NextResponse(webBuffer, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error("Image processing error:", error);
    return new NextResponse('Error fetching or processing image', { status: 500 });
  }
} 