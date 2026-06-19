import Link from "next/link";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r">
        <div className="p-6 text-2xl font-bold">
          FestivalPost
        </div>

        <nav className="space-y-2 px-4">
          <Link
            href="/user/dashboard"
            className="block p-3 rounded-lg hover:bg-slate-100"
          >
            Dashboard
          </Link>

          <Link
            href="/user/templates"
            className="block p-3 rounded-lg hover:bg-slate-100"
          >
            Templates
          </Link>

          <Link
            href="/user/generated"
            className="block p-3 rounded-lg hover:bg-slate-100"
          >
            My Posters
          </Link>

          <Link
            href="/user/profile"
            className="block p-3 rounded-lg hover:bg-slate-100"
          >
            Profile
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-slate-50">
        {children}
      </main>
    </div>
  );
}