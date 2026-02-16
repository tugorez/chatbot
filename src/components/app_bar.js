"use client";

import { useState } from "react";
import Link from "next/link";

export default function AppBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-background/80 backdrop-blur border-b border-foreground/10">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="p-2 rounded-md hover:bg-foreground/10 transition"
        >
          <span className="material-symbols-outlined">
            {open ? "close" : "menu"}
          </span>
        </button>
        <span className="font-serif text-lg">Chatbot</span>
        <div className="w-9" />
      </header>

      <nav
        className={`fixed top-14 left-0 bottom-0 z-40 w-64 bg-background border-r border-foreground/10 p-4 flex flex-col gap-2 transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          href="/chats/new"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-foreground/10 transition"
        >
          <span className="material-symbols-outlined">add</span>
          New Chat
        </Link>
        <Link
          href="/chats"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-foreground/10 transition"
        >
          <span className="material-symbols-outlined">chat</span>
          All Chats
        </Link>
      </nav>

      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 ease-in-out ${
          open
            ? "bg-background/80 opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />
    </>
  );
}
