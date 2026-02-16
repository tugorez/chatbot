import "./globals.css";
import { Inter, Source_Serif_4 } from "next/font/google";
import AppBar from "@/components/app_bar";
import MainContent from "@/components/ui/main_content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${sourceSerif.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="bg-background text-foreground font-sans">
        <AppBar />
        <MainContent>{children}</MainContent>
      </body>
    </html>
  );
}
