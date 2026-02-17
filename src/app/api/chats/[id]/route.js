import { showChat, addUserMessage, streamReply } from "@/services/chat_service";

export async function GET(request, { params }) {
  const { id } = await params;
  const chat = await showChat(id);
  return Response.json({ id: chat.id, messages: chat.messages });
}

export async function POST(request, { params }) {
  const { id } = await params;
  const { message } = await request.json();

  const chat = await addUserMessage(id, message);
  const { stream, save } = await streamReply(chat);

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      let fullText = "";

      for await (const chunk of stream) {
        const text = chunk.text;
        fullText += text;
        controller.enqueue(encoder.encode(text));
      }

      await save(fullText);
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
