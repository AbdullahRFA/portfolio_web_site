// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { Resend } from "resend";

// Initialize Resend with your private server-side environment token
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 1. Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // 2. Insert data into the Supabase 'messages' table
    const { error: dbError } = await supabase
      .from("messages")
      .insert([{ name, email, message }]);

    if (dbError) {
      console.error("Supabase Insert Error:", dbError);
      return NextResponse.json(
        { error: "Failed to save message to database." },
        { status: 500 }
      );
    }

    // 3. Dispatch an automated email alert to your personal inbox
    try {
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>", // Can be replaced with your custom domain later
        to: "shakibrybmn@gmail.com",
        subject: `🚀 New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #1f2937; max-width: 600px; border: 1px solid #e5e7eb; rounded: 12px;">
            <h2 style="color: #06b6d4; margin-bottom: 4px;">New Connection Established</h2>
            <p style="font-size: 14px; color: #6b7280; margin-top: 0;">Your portfolio database pipeline has received a new transmission.</p>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            
            <div style="margin-bottom: 15px;">
              <strong style="font-size: 12px; text-transform: uppercase; color: #9ca3af; tracking: 0.1em;">Sender Name:</strong>
              <div style="font-size: 16px; font-weight: bold; margin-top: 4px; color: #111827;">${name}</div>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="font-size: 12px; text-transform: uppercase; color: #9ca3af; tracking: 0.1em;">Email Address:</strong>
              <div style="font-size: 16px; margin-top: 4px;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></div>
            </div>
            
            <div style="margin-bottom: 5px;">
              <strong style="font-size: 12px; text-transform: uppercase; color: #9ca3af; tracking: 0.1em;">Transmission Message:</strong>
              <div style="font-size: 15px; margin-top: 6px; padding: 16px; bg: #f9fafb; background-color: #f9fafb; border-radius: 8px; border: 1px solid #f3f4f6; color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      // Log email failures but don't crash the user response since the DB write succeeded
      console.error("Resend Notification Dispatch Failure:", emailError);
    }

    return NextResponse.json(
      { success: true, message: "Message received and transmission synchronized!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}