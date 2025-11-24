import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Attendance from '@/models/Attendance';

// GET - Fetch attendance records
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const attendance = await Attendance.find(query)
      .populate('userId', 'name email role')
      .sort({ date: -1 });

    return NextResponse.json({ success: true, data: attendance });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create attendance record
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const attendance = await Attendance.create(body);

    return NextResponse.json({ success: true, data: attendance }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// PUT - Update attendance record
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Attendance ID is required' }, { status: 400 });
    }

    const attendance = await Attendance.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!attendance) {
      return NextResponse.json({ error: 'Attendance record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: attendance });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE - Delete attendance record
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Attendance ID is required' }, { status: 400 });
    }

    const attendance = await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return NextResponse.json({ error: 'Attendance record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
