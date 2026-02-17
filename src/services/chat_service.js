import connectDB from "@/infra/db";
import { generateReply, generateReplyStream } from "@/infra/gemini";
import Chat from "@/models/chat";

export async function listChats() {
  await connectDB();

  const chats = await Chat.find()
    .sort({ updatedAt: -1 })
    .select("title updatedAt")
    .lean();

  return chats.map((c) => ({
    id: c._id.toString(),
    title: c.title,
    updatedAt: c.updatedAt,
  }));
}

export async function createChat(message) {
  await connectDB();

  const chat = await Chat.create({
    title: message.slice(0, 50),
    messages: [{ role: "user", content: message }],
  });

  const reply = await generateReply(chat.messages);
  chat.messages.push({ role: "model", content: reply });
  await chat.save();

  return { id: chat._id.toString() };
}

export async function showChat(id) {
  await connectDB();

  const chat = await Chat.findById(id);
  const messages = chat.messages.map((m) => ({
    id: m._id.toString(),
    role: m.role,
    content: m.content,
  }));
  return { id: chat._id.toString(), messages };
}

export async function addMessageAndReply(chatId, message) {
  await connectDB();

  const chat = await Chat.findById(chatId);
  chat.messages.push({ role: "user", content: message });

  const reply = await generateReply(chat.messages);
  chat.messages.push({ role: "model", content: reply });

  chat.updatedAt = new Date();
  await chat.save();

  return { role: "model", content: reply };
}

export async function deleteChat(id) {
  await connectDB();
  await Chat.findByIdAndDelete(id);
}

export async function addUserMessage(chatId, message) {
  await connectDB();

  const chat = await Chat.findById(chatId);
  chat.messages.push({ role: "user", content: message });
  await chat.save();

  return chat;
}

export async function streamReply(chat) {
  const stream = await generateReplyStream(chat.messages);

  return {
    stream,
    async save(fullText) {
      chat.messages.push({ role: "model", content: fullText });
      chat.updatedAt = new Date();
      await chat.save();
    },
  };
}
