import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Mark from '@/models/Mark';

// GET - Fetch marks
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const subject = searchParams.get('subject');
    const semester = searchParams.get('semester');

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }
    if (subject) {
      query.subject = subject;
    }
    if (semester) {
      query.semester = semester;
    }

    const marks = await Mark.find(query)
      .populate('userId', 'name email role')
      .sort({ date: -1 });

    return NextResponse.json({ success: true, data: marks });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create mark record
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const mark = await Mark.create(body);

    return NextResponse.json({ success: true, data: mark }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// PUT - Update mark record
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Mark ID is required' }, { status: 400 });
    }

    const mark = await Mark.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!mark) {
      return NextResponse.json({ error: 'Mark record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: mark });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE - Delete mark record
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Mark ID is required' }, { status: 400 });
    }

    const mark = await Mark.findByIdAndDelete(id);

    if (!mark) {
      return NextResponse.json({ error: 'Mark record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
