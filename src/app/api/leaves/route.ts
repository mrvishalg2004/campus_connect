import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import LeaveRequest from '@/models/LeaveRequest';
import User from '@/models/User';

// GET - Fetch all leave requests
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Ensure User model is registered before populating
    if (!User) console.log("User model not found"); 
    
    const leaves = await LeaveRequest.find()
      .populate('facultyId', 'name email department')
      .populate('substituteTeacherId', 'name')
      .populate('reviewedBy', 'name')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(leaves);
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leave requests' },
      { status: 500 }
    );
  }
}

// POST - Create a new leave request
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const leave = await LeaveRequest.create(body);
    
    return NextResponse.json(leave, { status: 201 });
  } catch (error) {
    console.error('Error creating leave request:', error);
    return NextResponse.json(
      { error: 'Failed to create leave request' },
      { status: 500 }
    );
  }
}
