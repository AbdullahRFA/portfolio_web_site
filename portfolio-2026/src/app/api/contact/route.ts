import { supabase } from "../../../lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    // Insert data into the Supabase 'messages' table
    const { error } = await supabase
      .from("messages")
      .insert([{ name, email, message }]);

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json(
        { error: "Failed to save message." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Message received!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
