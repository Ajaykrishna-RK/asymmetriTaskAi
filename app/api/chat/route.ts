import { NextResponse } from "next/server";
import Groq from "groq-sdk";

import { getWeather } from "@/lib/tools/weather";
import { getStockPrice } from "@/lib/tools/stock";
import { getF1NextRace } from "@/lib/tools/f1";


const groq = new Groq({
  apiKey: process.env.GROQ_AI_API_KEY!,
});

/* ------------------ helpers ------------------ */

function extractCity(message: string) {
  const match = message.match(/weather in ([a-zA-Z\s]+)/i);
  return match?.[1]?.trim();
}

function extractStockSymbol(message: string) {
  const match = message.match(
    /(stock price of|price of stock|stock)\s+([A-Z]{1,5})/i
  );
  return match?.[2]?.toUpperCase();
}

function isF1NextRace(message: string) {
  return /next f1 race|f1 next race|upcoming f1/i.test(message);
}

/* ------------------ route ------------------ */

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    /* 🌤️ WEATHER TOOL */
    const city = extractCity(message);
    if (city) {
      const weather = await getWeather(city);

      return NextResponse.json({
        response: `🌤️ Weather in ${weather.city}
• Temperature: ${weather.temperature}°C
• Condition: ${weather.condition}`,
      });
    }

    /* 📈 STOCK PRICE TOOL */
    const symbol = extractStockSymbol(message);
    if (symbol) {
      const stock = await getStockPrice(symbol);

      return NextResponse.json({
        response: `📈 Stock Price for ${stock.symbol}
• Price: $${stock.price}
• Change: ${stock.change}`,
      });
    }

    /* 🏎️ F1 NEXT RACE TOOL */
    if (isF1NextRace(message)) {
      const race = await getF1NextRace();

      return NextResponse.json({
        response: `🏎️ Next F1 Race
• Race: ${race.raceName}
• Circuit: ${race.circuit}
• Location: ${race.location}
• Date: ${race.date}`,
      });
    }

    /* 🤖 FALLBACK: AI CHAT */
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
