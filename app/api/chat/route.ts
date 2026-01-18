import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getWeather } from "@/lib/tools/weather";


const groq = new Groq({
  apiKey: process.env.GROQ_AI_API_KEY!,
});

function extractCity(message: string) {
  const match = message.match(/weather in ([a-zA-Z\s]+)/i);
  return match?.[1]?.trim();
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const city = extractCity(message);

    if (city) {
      const weather = await getWeather(city);

      return NextResponse.json({
        response: `🌤️ Weather in ${weather.city}:
• Temperature: ${weather.temperature}°C
• Condition: ${weather.condition}`,
      });
    }

    // 🤖 Normal AI chat
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: message }],
    });

    return NextResponse.json({
      response: completion.choices[0].message.content,
    });

  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
