import ChatInterface from "@/components/chat_interface";
import { showChat } from "@/services/chat_service";

export default async function ChatPage({ params }) {
  const { id } = await params;
  const chat = await showChat(id);

  return <ChatInterface id={id} turns={chat.messages} />;
}
