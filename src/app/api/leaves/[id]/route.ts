import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import LeaveRequest from '@/models/LeaveRequest';

// PATCH - Update leave request status (Approve/Reject)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const id = params.id;
    const body = await request.json();
    
    // body could contain status, substituteTeacherId, comments, reviewedBy, reviewedAt
    const updatedLeave = await LeaveRequest.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    
    if (!updatedLeave) {
      return NextResponse.json(
        { error: 'Leave request not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedLeave);
  } catch (error) {
    console.error('Error updating leave request:', error);
    return NextResponse.json(
      { error: 'Failed to update leave request' },
      { status: 500 }
    );
  }
}
