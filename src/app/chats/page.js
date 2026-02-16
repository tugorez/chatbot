"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { timeAgo } from "@/lib/utils";

export default function ChatsPage() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/chats")
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-foreground/40 text-center pt-8">Loading...</p>;
  }

  return (
    <>
      <h1 className="font-serif text-2xl mb-4">Chats</h1>

      <p className="text-sm text-foreground/50 mb-2">
        {chats.length} chat{chats.length !== 1 ? "s" : ""}
      </p>

      <ul className="flex flex-col">
        {chats.map((chat) => (
          <li key={chat.id} className="border-b border-foreground/10">
            <Link
              href={`/chats/${chat.id}`}
              className="flex flex-col gap-0.5 py-3 hover:bg-foreground/5 rounded-md transition"
            >
              <span className="font-medium">{chat.title}</span>
              <span className="text-sm text-foreground/40">
                Last message {timeAgo(chat.updatedAt)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
