import { Inter } from "next/font/google";
import "./globals.css";
import { BooksProvider } from "./contexts/BooksContexts";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <BooksProvider>{children}</BooksProvider>
      </body>
    </html>
  );
}
