import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
  try {
    // Fetch all projects from Supabase table 'projects', sorted by newest first
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(projects, { status: 200 });
  } catch (error: any) {
    console.error("Supabase Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects from Supabase" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Insert a new project record into your Supabase 'projects' table
    const { data: project, error } = await supabase
      .from("projects")
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error("Supabase Insert Error:", error);
    return NextResponse.json(
      { error: "Failed to create project in Supabase" },
      { status: 500 }
    );
  }
}