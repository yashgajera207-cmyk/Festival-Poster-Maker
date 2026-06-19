"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  LayoutTemplate,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

const navLinks = [
  { href: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/user/templates", label: "Templates", icon: LayoutTemplate },
  { href: "/user/profile", label: "Profile", icon: User },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    const ok = confirm("Are you sure you want to logout?");

    if (!ok) return;

    try {
      const token = localStorage.getItem("accessToken");

      await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout Error:", error);
    }

    localStorage.removeItem("accessToken");

    localStorage.removeItem("refreshToken");

    router.replace("/login");
  }
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/user/dashboard"
              className="flex items-center gap-2 font-bold text-lg text-slate-800"
            >
              <span className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                <Sparkles size={16} />
              </span>
              FestivalPost
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-orange-50 text-orange-600"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon size={16} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-red-500 bg-red-50 border border-red-100 hover:bg-red-100 transition-colors"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 px-4 py-3 space-y-1 bg-white">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-red-500 bg-red-50 mt-2"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
