// src/app/api/views/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("site_analytics")
    .select("visitor_count")
    .eq("id", 1)
    .single();

  if (error) {
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
  return NextResponse.json({ count: data.visitor_count });
}

export async function POST() {
  // Calls the safe SQL function we created in Step 1
  const { error } = await supabase.rpc("increment_visitor_count");
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}