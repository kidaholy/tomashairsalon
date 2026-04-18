import { NextResponse } from 'next/server';
import { getTeamMembers } from '@/lib/database';

export async function GET() {
  try {
    const team = await getTeamMembers();
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}
