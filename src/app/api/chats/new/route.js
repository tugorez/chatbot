import { createChat } from "@/services/chat_service";

export async function POST(request) {
  const { message } = await request.json();
  const { id } = await createChat(message);
  return Response.json({ id });
}
