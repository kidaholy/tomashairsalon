import { NextResponse } from 'next/server';
import { getGalleryItems } from '@/lib/database';

export async function GET() {
  try {
    const gallery = await getGalleryItems();
    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}
