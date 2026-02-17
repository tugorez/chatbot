import Markdown from "react-markdown";

export function UserTurn({ message }) {
  return (
    <span className="p-3 rounded-2xl  bg-black/50 ml-auto">{message}</span>
  );
}

export function ModelTurn({ message }) {
  if (!message) {
    return (
      <div className="p-3 mr-auto flex items-center gap-2 text-foreground/40">
        <span className="material-symbols-outlined animate-spin text-sm">
          progress_activity
        </span>
        Thinking...
      </div>
    );
  }

  return (
    <div className="p-3 mr-auto prose prose-invert prose-sm max-w-none">
      <Markdown>{message}</Markdown>
    </div>
  );
}
