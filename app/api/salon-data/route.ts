import { NextResponse } from 'next/server';
import { getSalonData } from '@/lib/database';

export async function GET() {
  try {
    const data = await getSalonData();
    if (!data) {
      return NextResponse.json({ error: 'No data found. Please seed the database first.' }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch salon data' }, { status: 500 });
  }
}
