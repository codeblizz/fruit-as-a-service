import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import Toast from "@/packages/ui/src/molecules/toast";
import NavBar from "@/packages/ui/src/molecules/navBar";
import Footer from "@/packages/ui/src/organisms/footer";
import AuthGuard from "@/packages/ui/src/organisms/authGuard";
import { authOptions } from "@/packages/auth/src/authOptions";
import StoreProvider from "@/packages/providers/src/store.provider";
import { ThemeProvider } from "@/packages/providers/src/theme.provider";
import SessionProvider from "@/packages/providers/src/session.provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FAAS - An e-commerce Fruit as a Service Platform",
  description:
    "The most trusted community-backed capital funding payroll platform and comprehensive utility payment solution for Nigeria",
  keywords: [
    "faas",
    "banana",
    "orange",
    "capital",
    "funding",
    "nigeria",
    "payment",
    "pineapple",
    "e-commerce",
    "strawberry",
    "fruit vendor",
    "online store",
    "fruit delivery",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: [
      {
        url: "/android-chrome-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        url: "/android-chrome-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <SessionProvider session={session}>
            <ThemeProvider>
              <AuthGuard>
                <NavBar />
                {children}
                <Toast />
                <Footer />
              </AuthGuard>
            </ThemeProvider>
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
