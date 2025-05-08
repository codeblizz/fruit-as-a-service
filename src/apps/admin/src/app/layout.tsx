import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/packages/ui/src/molecules/navBar";
import { authOptions } from "@/packages/auth/src/authOptions";
import StoreProvider from "@/packages/providers/src/store.provider";
import { ThemeProvider } from "@/packages/providers/src/theme.provider";
import SessionProvider from "@/packages/providers/src/session.provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fruit as a Service",
  description: "Product of FAAS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions); 
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <SessionProvider session={session}>
            <ThemeProvider>
              <NavBar />
              {children}
            </ThemeProvider>
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
