import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
  role: {
    type: String,
    required: true,
    enum: ["user", "model"],
  },
  content: { type: String, required: true },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
});

const ChatSchema = new Schema({
  title: { type: String, default: "New Chat" },
  messages: [MessageSchema],

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// If the model already exists (hot reload), use it. Otherwise create it.
const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

export default Chat;
