import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Bitter } from "next/font/google";

const bitter = Bitter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gallery",
  description: "A gallery application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={bitter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
