import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Assignment from '@/models/Assignment';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
  } catch {
    return null;
  }
};

// POST /api/assignments/[id]/submissions - Submit assignment (student)
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'student') {
      return NextResponse.json(
        { success: false, error: 'Only students can submit assignments' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { attachments, comments } = body;

    const assignment = await Assignment.findById(params.id);

    if (!assignment) {
      return NextResponse.json(
        { success: false, error: 'Assignment not found' },
        { status: 404 }
      );
    }

    // Check if assignment is still open
    if (new Date() > new Date(assignment.dueDate)) {
      return NextResponse.json(
        { success: false, error: 'Assignment deadline has passed' },
        { status: 400 }
      );
    }

    // Check if student already submitted
    const existingSubmission = assignment.submissions.find(
      (sub: any) => sub.studentId.toString() === decoded.userId
    );

    if (existingSubmission) {
      return NextResponse.json(
        { success: false, error: 'Assignment already submitted' },
        { status: 400 }
      );
    }

    // Add submission
    assignment.submissions.push({
      studentId: new mongoose.Types.ObjectId(decoded.userId),
      submittedAt: new Date(),
      attachments: attachments || [],
      comments: comments || '',
      grade: null,
      feedback: '',
      gradedAt: null,
    } as any);

    await assignment.save();

    return NextResponse.json({
      success: true,
      message: 'Assignment submitted successfully',
    });
  } catch (error: any) {
    console.error('Error submitting assignment:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/assignments/[id]/submissions - Grade submission (teacher)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'teacher') {
      return NextResponse.json(
        { success: false, error: 'Only teachers can grade assignments' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { studentId, grade, feedback, annotations } = body;

    if (!studentId || grade === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const assignment = await Assignment.findById(params.id);

    if (!assignment) {
      return NextResponse.json(
        { success: false, error: 'Assignment not found' },
        { status: 404 }
      );
    }

    // Check if teacher owns this assignment
    if (assignment.teacherId.toString() !== decoded.userId) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Find and update submission
    const submission = assignment.submissions.find(
      (sub: any) => sub.studentId.toString() === studentId
    );

    if (!submission) {
      return NextResponse.json(
        { success: false, error: 'Submission not found' },
        { status: 404 }
      );
    }

    // Validate grade
    if (grade < 0 || grade > assignment.totalMarks) {
      return NextResponse.json(
        { success: false, error: `Grade must be between 0 and ${assignment.totalMarks}` },
        { status: 400 }
      );
    }

    submission.grade = grade;
    submission.feedback = feedback || '';
    submission.annotations = annotations || [];
    submission.gradedAt = new Date();

    await assignment.save();

    return NextResponse.json({
      success: true,
      message: 'Assignment graded successfully',
    });
  } catch (error: any) {
    console.error('Error grading assignment:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
