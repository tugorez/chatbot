export default function MessageInput({
  loading,
  message,
  setMessage,
  placeholder = "",
  handleSubmit,
}) {
  return (
    <form
      className="rounded-2xl p-4 bg-foreground/5 border border-foreground/10"
      onSubmit={handleSubmit}
    >
      <textarea
        id="userTurn"
        placeholder={placeholder}
        rows={2}
        className="w-full bg-transparent placeholder:text-foreground/40 resize-none outline-none text-base disabled:opacity-40"
        value={message}
        disabled={loading}
        onChange={(ev) => setMessage(ev.target.value)}
      ></textarea>
      <button
        type="submit"
        className="ml-auto block disabled:opacity-40"
        aria-label="Send message"
        disabled={loading || message.trim().length === 0}
      >
        <span
          className={`material-symbols-outlined ${loading ? "animate-spin" : ""}`}
        >
          {loading ? "progress_activity" : "send"}
        </span>
      </button>
    </form>
  );
}
