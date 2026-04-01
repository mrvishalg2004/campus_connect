import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ChatMessage from '@/models/ChatMessage';
import User from '@/models/User';

// GET - Fetch all messages for a specific room
export async function GET(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    await dbConnect();
    
    // Ensure User model is registered
    if (!User) console.log("User model not found");
    
    const { roomId } = params;
    
    const messages = await ChatMessage.find({ roomId })
      .populate('authorId', 'name avatarUrl role')
      .populate('replies.authorId', 'name avatarUrl role')
      .sort({ timestamp: 1 }); // Oldest first for chat history
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST - Create a new message in a room
export async function POST(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    await dbConnect();
    const { roomId } = params;
    const body = await request.json();
    
    const { text, isAnonymous, authorId } = body;
    
    if (!text || !authorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const newMessage = await ChatMessage.create({
      roomId,
      authorId,
      text,
      isAnonymous: !!isAnonymous,
      timestamp: new Date(),
    });
    
    // Fetch the inserted message and populate author so we can return it
    const populatedMessage = await ChatMessage.findById(newMessage._id)
      .populate('authorId', 'name avatarUrl role');
      
    return NextResponse.json(populatedMessage, { status: 201 });
  } catch (error) {
    console.error('Error creating chat message:', error);
    return NextResponse.json(
      { error: 'Failed to post message' },
      { status: 500 }
    );
  }
}
