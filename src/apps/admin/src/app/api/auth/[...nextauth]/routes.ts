import NextAuth from "next-auth";
import { authOptions } from "@/packages/auth/src/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };