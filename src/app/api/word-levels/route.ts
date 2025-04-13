import { loadWordLevels } from "@/app/lib/loadWordLevels";
import { NextResponse } from "next/server";

export async function GET() {
  const wordLevels = loadWordLevels();
  return NextResponse.json(wordLevels);
}
