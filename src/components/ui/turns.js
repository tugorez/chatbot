import Markdown from "react-markdown";

export function UserTurn({ message }) {
  return (
    <span className="p-3 rounded-2xl  bg-black/50 ml-auto">{message}</span>
  );
}

export function ModelTurn({ message }) {
  return (
    <div className="p-3 mr-auto prose prose-invert prose-sm max-w-none">
      <Markdown>{message}</Markdown>
    </div>
  );
}
