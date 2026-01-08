"use client";

import { ReactNode } from "react";
import { Session } from "next-auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

function SessionProvider({
  session,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}

export default SessionProvider;
