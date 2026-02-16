"use client";

import { UserTurn, ModelTurn } from "@/components/ui/turns";
import MessageInput from "@/components/ui/message_input";
import { useState } from "react";

export default function ChatInterface({ id, turns }) {
  const [messages, setMessages] = useState(turns);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);

    const userMessage = message;
    setMessage("");
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: userMessage },
    ]);

    try {
      const res = await fetch(`/api/chats/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const reply = await res.json();
      setMessages((prev) => [...prev, { id: Date.now().toString(), ...reply }]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex-1 overflow-y-auto flex flex-col">
        {messages.map((turn) =>
          turn.role === "user" ? (
            <UserTurn key={turn.id} message={turn.content} />
          ) : (
            <ModelTurn key={turn.id} message={turn.content} />
          ),
        )}
      </section>
      <section className="shrink-0 pt-4">
        <MessageInput
          loading={loading}
          message={message}
          setMessage={setMessage}
          placeholder="Reply..."
          handleSubmit={handleSubmit}
        />
      </section>
    </>
  );
}
