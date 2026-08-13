import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "DermaScan AI | Skin Disease Detection",
  description: "Deep learning-based skin disease classification system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="min-h-[calc(100vh-140px)]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
