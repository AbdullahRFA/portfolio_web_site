import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
  try {
    const { error } = await supabase.from("projects").select("id").limit(1);

    // If we get a '42P01' (relation does not exist) or a 'schema cache' error,
    // it means we connected successfully but haven't run our SQL setup script yet!
    if (
      error &&
      error.code !== "42P01" &&
      !error.message?.includes("schema cache")
    ) {
      throw error;
    }

    return NextResponse.json({
      status: "success",
      message: "🎉 Supabase is successfully connected!",
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: "Failed to connect", details: error.message },
      { status: 500 },
    );
  }
}
