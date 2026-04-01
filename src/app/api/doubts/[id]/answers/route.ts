import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Doubt from '@/models/Doubt';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// POST - Add answer to doubt
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    // Get authenticated user from token
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const doubtId = params.id;
    const body = await request.json();

    const doubt = await Doubt.findById(doubtId);

    if (!doubt) {
      return NextResponse.json({ error: 'Doubt not found' }, { status: 404 });
    }

    const answer = {
      text: body.text,
      upvotes: 0,
      isAnonymous: body.isAnonymous !== undefined ? body.isAnonymous : true,
      files: body.files || [],
      createdAt: new Date(),
      authorId: decoded.userId, // Store author ID for tracking even if anonymous
    };

    doubt.answers.push(answer);
    await doubt.save();

    return NextResponse.json({ success: true, data: doubt }, { status: 201 });
  } catch (error: any) {
    console.error('Error adding answer:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
