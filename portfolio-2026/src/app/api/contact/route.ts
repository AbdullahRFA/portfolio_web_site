import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Message from '../../../models/Message';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const { name, email, message } = await request.json();

    // 1. Basic Defensive Backend Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields (Name, Email, Message) are mandatory.' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address provided.' },
        { status: 400 }
      );
    }

    // 2. Persist into MongoDB database
    const newMessage = await Message.create({
      name,
      email,
      message,
    });

    return NextResponse.json(
      { success: true, data: newMessage },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Contact Form Backend Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error. Failed to send message.' },
      { status: 500 }
    );
  }
}