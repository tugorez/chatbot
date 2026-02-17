"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { timeAgo } from "@/lib/utils";

export default function ChatsPage() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    fetch("/api/chats")
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/chats/${deleteTarget}`, { method: "DELETE" });
    setChats((prev) => prev.filter((c) => c.id !== deleteTarget));
    setDeleteTarget(null);
  };

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
          <li
            key={chat.id}
            className="border-b border-foreground/10 flex items-center"
          >
            <Link
              href={`/chats/${chat.id}`}
              className="flex-1 flex flex-col gap-0.5 py-3 hover:bg-foreground/5 rounded-md transition"
            >
              <span className="font-medium">{chat.title}</span>
              <span className="text-sm text-foreground/40">
                Last message {timeAgo(chat.updatedAt)}
              </span>
            </Link>
            <button
              onClick={() => setDeleteTarget(chat.id)}
              className="p-2 rounded-md hover:bg-foreground/10 transition text-foreground/40 hover:text-red-400"
              aria-label="Delete chat"
            >
              <span className="material-symbols-outlined text-xl">delete</span>
            </button>
          </li>
        ))}
      </ul>

      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="bg-background border border-foreground/10 rounded-2xl p-6 mx-4 max-w-sm w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-lg mb-2">Delete chat?</h2>
            <p className="text-sm text-foreground/50 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-md hover:bg-foreground/10 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
