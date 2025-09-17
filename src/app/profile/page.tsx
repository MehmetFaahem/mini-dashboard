import { auth, signOut } from "@/lib/auth";
import Card from "@/components/Card";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">
          You must sign in to view this page.
        </p>
         <Link
           href="/api/auth/signin?callbackUrl=/profile"
          className="text-sm px-3 py-1 rounded-md border border-white/15 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors"
        >
          Sign in with Google
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Profile</h1>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="text-sm px-3 py-1 rounded-md border border-white/15 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors">
            Sign out
          </button>
        </form>
      </div>
      <Card title={session.user.name || "User"}>
        <div className="text-sm space-y-1">
          {session.user.email ? (
            <div>
              <span className="font-medium">Email:</span> {session.user.email}
            </div>
          ) : null}
          {session.user.image ? (
            <div className="flex items-center gap-2">
              <span className="font-medium">Avatar:</span>
              <img
                src={session.user.image}
                alt="avatar"
                className="h-8 w-8 rounded-full"
              />
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
