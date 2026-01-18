"use client";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface ChatMessagesProps {
  messages: Message[];
  loading?: boolean;
}

export default function ChatMessages({
  messages,
  loading,
}: ChatMessagesProps) {
  return (
    <div className="flex h-[420px] flex-col gap-3 overflow-y-auto ">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`max-w-[80%] rounded-lg px-4 py-2 text-sm leading-relaxed ${
            msg.role === "user"
              ? "self-end bg-blue-600 text-white"
              : "self-start bg-gray-200 text-gray-900"
          }`}
        >
          {msg.content}
        </div>
      ))}

      {loading && (
        <div className="self-start text-sm text-gray-400">
          Thinking...
        </div>
      )}
    </div>
  );
}
