"use client";

import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatUIInput";
import Button from "@/components/ui/Button";
import LogoutModal from "@/components/ui/Modal";
import { useState } from "react";
import { signOutFunction } from "../actions/auth";
import Modal from "@/components/ui/Modal";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showLogout, setShowLogout] = useState(false);


  const sendMessage = async (message: string) => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.ok
            ? data.response
            : data?.details || data?.error || "Something went wrong",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error" },
      ]);
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100  p-2 sm:p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-lg">
        <div className="shadow px-6 flex justify-between py-4">
          <h1 className="text-xl font-semibold text-gray-800">
            AI Chat
          </h1>

          <img
            src="/logout.svg"
            alt="Logout"
            onClick={() => setShowLogout(true)}
            className="h-[30px] w-[30px] cursor-pointer object-cover"
          />
        </div>

        <Modal
          open={showLogout}

  message="Are you sure you want to log out?"
  confirmText="Logout"
  cancelText="Cancel"
  variant="danger"
          onClose={() => setShowLogout(false)}
          onConfirm={signOutFunction}
        />
        <div className="px-2 sm:px-6 py-4">  <ChatMessages messages={messages} loading={loading} /></div>




        <div className="px-2 sm:px-6 py-4">
          <ChatInput onSend={sendMessage} disabled={loading} />
        </div>

      </div>
    </div>
  );
}
