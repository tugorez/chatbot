import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateReply(messages) {
  const history = messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));

  const chat = ai.chats.create({
    model: "gemma-3-27b-it",
    history: history.slice(0, -1),
  });

  const lastMessage = messages[messages.length - 1].content;
  const response = await chat.sendMessage({ message: lastMessage });

  return response.text;
}

export async function generateReplyStream(messages) {
  const history = messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));

  const chat = ai.chats.create({
    model: "gemma-3-27b-it",
    history: history.slice(0, -1),
  });

  const lastMessage = messages[messages.length - 1].content;
  const response = await chat.sendMessageStream({ message: lastMessage });

  return response;
}
