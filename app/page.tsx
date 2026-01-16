"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  async function sendMessage() {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });

    const result = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "assistant", ...result },
    ]);

    setInput("");
  }

  return (
    <div style={{ maxWidth: 500, margin: "50px auto" }}>
      <h2>Simple AI Assistant</h2>

      {messages.map((msg, i) => (
        <div key={i} style={{ margin: "10px 0" }}>
          {msg.role === "user" && <b>You:</b>}

          {msg.type === "text" && (
            <p>🤖 {msg.data}</p>
          )}

          {msg.type === "weather" && (
            <div style={{ border: "1px solid #ccc", padding: 10 }}>
              <p>🌤️ Weather in {msg.data.city}</p>
              <p>Temp: {msg.data.temperature}°C</p>
              <p>{msg.data.condition}</p>
            </div>
          )}
        </div>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about weather..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
