// app/layout.tsx
// (Conservez les autres imports et la structure de base)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; // Assurez-vous que l'import est correct

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BoostTâche",
  description: "Votre gestionnaire de tâches personnel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class" // <-- Ajoutez cette ligne
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}