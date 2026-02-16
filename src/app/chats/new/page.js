"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MessageInput from "@/components/ui/message_input";
import { partOfTheDayGreeting } from "@/lib/utils";

export default function NewPage() {
  const greeting = partOfTheDayGreeting();

  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    const response = await fetch("/api/chats/new", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    const { id } = await response.json();
    router.push(`/chats/${id}`);
  };

  return (
    <>
      <header className="text-center mb-8">
        <h1 className="font-serif text-3xl">{greeting}, Juan</h1>
      </header>

      <section>
        <MessageInput
          loading={loading}
          message={message}
          setMessage={setMessage}
          placeholder="How can I help you today?"
          handleSubmit={handleSubmit}
        />
      </section>
    </>
  );
}
