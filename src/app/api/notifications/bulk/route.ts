import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Notification from '@/models/Notification';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// POST - Bulk create notifications
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Verify authentication
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };

    // Only teachers, HODs, and principals can send bulk notifications
    if (!['teacher', 'hod', 'principal'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { userIds, text, type, category, link } = body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json({ error: 'userIds array is required' }, { status: 400 });
    }

    if (!text) {
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
    }

    // Create notification for each user
    const notifications = userIds.map(userId => ({
      userId,
      text,
      type: type || 'info',
      category: category || 'general',
      link: link || '',
      timestamp: new Date(),
      read: false,
    }));

    const createdNotifications = await Notification.insertMany(notifications);

    return NextResponse.json({ 
      success: true, 
      data: createdNotifications,
      count: createdNotifications.length 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating bulk notifications:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
