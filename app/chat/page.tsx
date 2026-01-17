"use client";

import ChatInput from "@/components/chat/ChatUIInput";
import { useState } from "react";


export default function ChatPage() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message: string) => {
    setLoading(true);

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    try {
   const res = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message }),
});

const data = await res.json();

if (!res.ok) {
  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content: data?.details || data?.error || "Something went wrong",
    },
  ]);
  return;
}

setMessages((prev) => [
  ...prev,
  { role: "assistant", content: data.response },
]);

    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Groq AI Chat</h1>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background:
                msg.role === "user" ? "#2563eb" : "#e5e7eb",
              color: msg.role === "user" ? "#fff" : "#000",
            }}
          >
            {msg.content}
          </div>
        ))}

        {loading && <p>Thinking...</p>}
      </div>

      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    padding: 20,
  },
  chatBox: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
    border: "1px solid #ddd",
    padding: 15,
    height: 400,
    overflowY: "auto" as const,
    marginBottom: 20,
  },
  message: {
    padding: "10px 14px",
    borderRadius: 8,
    maxWidth: "80%",
    wordBreak: "break-word" as const,
  },
};
