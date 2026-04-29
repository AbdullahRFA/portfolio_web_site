import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import Project from "../../../models/Project";

export async function GET() {
  try {
    // Ensure we are connected to the DB
    await connectDB();

    // Fetch all projects, sorted by newest first
    const projects = await Project.find({}).sort({ createdAt: -1 });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Create a new project using our Model
    const project = await Project.create(body);
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}