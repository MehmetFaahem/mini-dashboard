import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async redirect({ url, baseUrl }) {
      try {
        const parsed = new URL(url, baseUrl);
        // If a relative path or same-origin, allow it
        if (parsed.origin === baseUrl) {
          // Default to /profile if landing on root
          if (parsed.pathname === "/" || parsed.pathname === "") {
            return `${baseUrl}/profile`;
          }
          return parsed.toString();
        }
      } catch {}
      return `${baseUrl}/profile`;
    },
  },
});

export const { GET, POST } = handlers;
