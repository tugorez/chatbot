export default function MainContent({ children }) {
  return (
    <main className="h-screen pt-18 px-4 pb-8 flex flex-col overflow-hidden">
      {children}
    </main>
  );
}
