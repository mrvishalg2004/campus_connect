import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Notice from '@/models/Notice';

// GET - Fetch all notices
export async function GET() {
  try {
    await connectDB();
    const notices = await Notice.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(notices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notices' },
      { status: 500 }
    );
  }
}

// POST - Create new notice
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const notice = await Notice.create(body);
    
    return NextResponse.json(notice, { status: 201 });
  } catch (error) {
    console.error('Error creating notice:', error);
    return NextResponse.json(
      { error: 'Failed to create notice' },
      { status: 500 }
    );
  }
}
