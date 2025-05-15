// app/api/recipes/[id]/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// PUT a specific recipe
export async function PUT(request, { params }) {
  const { id } = params;
  const updatedData = await request.json();

  const { data, error } = await supabase
    .from("recipes")
    .update(updatedData)
    .eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}
