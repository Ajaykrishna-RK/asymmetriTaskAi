"use client";

import { useState } from "react";
import Button from "../ui/Button";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
        className=" w-full
          flex-1
          rounded-md
          border
          border-gray-300
          px-3
          py-2
          text-sm
          focus:border-blue-500
          focus:outline-none
          focus:ring-1
          focus:ring-blue-500
          disabled:bg-gray-100
        "
      />

   

      <Button disabled={disabled} type="submit" >     Send</Button>
    </form>
  );
}
