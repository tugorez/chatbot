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
      { id: "streaming", role: "model", content: "" },
    ]);

    try {
      const res = await fetch(`/api/chats/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === "streaming" ? { ...m, content: m.content + chunk } : m,
          ),
        );
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === "streaming" ? { ...m, id: Date.now().toString() } : m,
        ),
      );
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
