import { listChats } from "@/services/chat_service";

export async function GET() {
  const chats = await listChats();
  return Response.json(chats);
}
