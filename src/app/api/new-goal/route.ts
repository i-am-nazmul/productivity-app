
import { connect } from '@/dbconfig/dbconfig';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connect();
    return NextResponse.json({ status: 'connected nazmul bhai' });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: (error as Error).message }, { status: 500 });
  }
}
