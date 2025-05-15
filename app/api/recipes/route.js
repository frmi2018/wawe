// app/api/recipes/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET all recipes
export async function GET() {
  const { data, error } = await supabase.from("recipes").select("*");

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}
