import type { Metadata } from "next";
import { AuthProvider } from "@/components/layout/auth-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Procuro - AI-Powered Procurement",
  description:
    "Intelligent procurement automation powered by AI agents. Streamline sourcing, compare suppliers, and optimize your procurement process.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
