import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth } = NextAuth({
  providers: [Google],
  // You can customize pages/callbacks as needed
});

export const { GET, POST } = handlers;
