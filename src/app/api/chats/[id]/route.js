import { showChat, addMessageAndReply } from "@/services/chat_service";

export async function GET(request, { params }) {
  const { id } = await params;
  const chat = await showChat(id);
  return Response.json({ id: chat.id, messages: chat.messages });
}

export async function POST(request, { params }) {
  const { id } = await params;
  const { message } = await request.json();
  const reply = await addMessageAndReply(id, message);
  return Response.json(reply);
}
