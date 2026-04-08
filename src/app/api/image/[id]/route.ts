import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) return new NextResponse('Missing ID', { status: 400 });

  const driveUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w400`;

  try {
    const response = await fetch(driveUrl);
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate',
      },
    });
  } catch (error) {
    return new NextResponse('Error fetching image', { status: 500 });
  }
}