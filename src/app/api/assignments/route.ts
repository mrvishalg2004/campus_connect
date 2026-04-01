import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Assignment from '@/models/Assignment';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// GET /api/assignments - List assignments (for both teacher and student)
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    console.log('=== Assignments GET: Starting ===');

    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    console.log('=== Assignments GET: User ===', { role: decoded.role });

    let assignments;
    
    if (decoded.role === 'teacher') {
      // Teachers see only their own assignments
      assignments = await Assignment.find({ teacherId: decoded.userId })
        .populate('teacherId', 'name email')
        .sort({ createdAt: -1 });
    } else if (decoded.role === 'student') {
      // Students see all published assignments
      assignments = await Assignment.find({ published: true })
        .populate('teacherId', 'name email')
        .sort({ createdAt: -1 });
    } else {
      return NextResponse.json(
        { success: false, error: 'Unauthorized role' },
        { status: 403 }
      );
    }

    console.log('=== Assignments GET: Found ===', assignments.length);

    return NextResponse.json({
      success: true,
      data: assignments,
    });
  } catch (error: any) {
    console.error('=== Assignments GET: Error ===', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/assignments - Create new assignment (teachers only)
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    console.log('=== Assignments POST: Starting ===');

    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    
    if (decoded.role !== 'teacher') {
      return NextResponse.json(
        { success: false, error: 'Only teachers can create assignments' },
        { status: 403 }
      );
    }

    const body = await req.json();
    console.log('=== Assignments POST: Body ===', body);
    
    const { title, description, subject, class: className, totalMarks, dueDate, rubric, published } = body;

    // Validate required fields
    if (!title || !subject || !className || !totalMarks || !dueDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const assignment = await Assignment.create({
      teacherId: decoded.userId,
      title,
      description: description || '',
      subject,
      class: className,
      totalMarks,
      dueDate: new Date(dueDate),
      rubric: rubric || '',
      published: published !== false, // Default to true
      submissions: [],
    });

    console.log('=== Assignments POST: Created ===', assignment._id);

    return NextResponse.json({
      success: true,
      data: assignment,
      message: 'Assignment created successfully',
    });
  } catch (error: any) {
    console.error('=== Assignments POST: Error ===', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
