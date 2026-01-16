import { getWeather } from "@/lib/weather";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { message } = await req.json();

  // very simple "AI logic"
  if (message.toLowerCase().includes("weather")) {
    const city = message.split(" ").pop(); // rough extract
    const weather = await getWeather (city || "Unknown");

    return NextResponse.json({
      type: "weather",
      data: weather,
    });
  }

  // normal AI reply
  return NextResponse.json({
    type: "text",
    data: "I can help with weather, stocks, or F1 info 🙂",
  });
}
