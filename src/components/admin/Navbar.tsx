"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Image,
  Layers3,
  Users,
  LogOut,
  Sparkles,
  ChevronDown,
  User,
  Settings,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Categories", href: "/admin/categories", icon: FolderKanban },
  { name: "Templates", href: "/admin/templates", icon: Image },
  { name: "Elements", href: "/admin/elements", icon: Layers3 },
  { name: "Users", href: "/admin/users", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .navbar-root {
          font-family: 'Inter', sans-serif;
          position: sticky;
          top: 0;
          z-index: 50;
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 40%, #1f1208 100%);
          border-bottom: 1px solid rgba(251, 146, 60, 0.15);
          box-shadow: 0 4px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(251,146,60,0.12);
        }

        /* Subtle animated gradient strip at very top */
        .navbar-root::before {
          content: '';
          display: block;
          height: 2px;
          background: linear-gradient(90deg, transparent, #f97316, #fbbf24, #f97316, transparent);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* ── Logo ── */
        .logo-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
          group: true;
        }

        .logo-icon-wrap {
          position: relative;
        }

        .logo-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: linear-gradient(135deg, #f97316 0%, #fbbf24 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 17px;
          letter-spacing: -0.5px;
          box-shadow: 0 4px 16px rgba(249,115,22,0.45);
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease;
        }

        .logo-link:hover .logo-icon {
          transform: scale(1.1) rotate(6deg);
          box-shadow: 0 8px 24px rgba(249,115,22,0.6);
        }

        .logo-pulse {
          position: absolute;
          top: -3px;
          right: -3px;
          width: 10px;
          height: 10px;
          background: #22c55e;
          border-radius: 50%;
          border: 2px solid #0f0f0f;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }

        .logo-text-main {
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          line-height: 1;
          transition: color 0.2s;
        }

        .logo-text-main span {
          color: #f97316;
        }

        .logo-link:hover .logo-text-main {
          color: #fed7aa;
        }

        .logo-sub {
          font-size: 11px;
          color: rgba(255,255,255,0.38);
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 2px;
          letter-spacing: 0.3px;
        }

        /* ── Nav ── */
        .nav-list {
          display: none;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        @media (min-width: 768px) {
          .nav-list { display: flex; }
        }

        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          transition: color 0.2s, background 0.2s, transform 0.2s;
          white-space: nowrap;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: rgba(249,115,22,0.0);
          transition: background 0.25s ease;
        }

        .nav-link:hover {
          color: #fff;
          transform: translateY(-1px);
        }

        .nav-link:hover::before {
          background: rgba(249,115,22,0.12);
        }

        .nav-link.active {
          color: #fff;
          background: linear-gradient(135deg, rgba(249,115,22,0.9), rgba(251,191,36,0.8));
          box-shadow: 0 4px 16px rgba(249,115,22,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .nav-link.active::before { background: none; }

        .nav-link .nav-icon {
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1);
          flex-shrink: 0;
        }

        .nav-link:not(.active):hover .nav-icon {
          transform: rotate(12deg) scale(1.15);
        }

        /* active shimmer */
        .nav-link.active .nav-shine {
          position: absolute;
          inset: 0;
          border-radius: 10px;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
          background-size: 200% 100%;
          animation: nav-shine 2.5s ease-in-out infinite;
        }

        @keyframes nav-shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* ── Profile ── */
        .profile-wrap { position: relative; flex-shrink: 0; }

        .profile-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }

        .profile-btn:hover {
          background: rgba(249,115,22,0.12);
          border-color: rgba(249,115,22,0.3);
          transform: translateY(-1px);
        }

        .profile-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316, #fbbf24);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          box-shadow: 0 2px 10px rgba(249,115,22,0.4);
          flex-shrink: 0;
        }

        .profile-name {
          font-weight: 700;
          font-size: 13.5px;
          color: #fff;
          line-height: 1.1;
        }

        .profile-email {
          font-size: 11px;
          color: rgba(255,255,255,0.38);
        }

        .profile-chevron {
          color: rgba(255,255,255,0.4);
          transition: transform 0.3s ease, color 0.2s;
        }

        .profile-chevron.open { transform: rotate(180deg); color: #f97316; }

        /* ── Dropdown ── */
        .dropdown {
          position: absolute;
          right: 0;
          margin-top: 8px;
          width: 220px;
          background: #1e1e1e;
          border: 1px solid rgba(249,115,22,0.18);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04);
          z-index: 50;
          animation: dropdown-in 0.2s cubic-bezier(.34,1.2,.64,1) forwards;
          transform-origin: top right;
        }

        @keyframes dropdown-in {
          from { opacity: 0; transform: scale(0.92) translateY(-8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .dropdown-header {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .dropdown-header-name {
          font-weight: 700;
          font-size: 13px;
          color: #fff;
        }

        .dropdown-header-email {
          font-size: 11.5px;
          color: rgba(255,255,255,0.38);
          margin-top: 1px;
        }

        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, padding-left 0.18s;
          text-align: left;
        }

        .dropdown-item:hover {
          background: rgba(249,115,22,0.1);
          color: #f97316;
          padding-left: 20px;
        }

        .dropdown-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 2px 0;
        }

        .dropdown-item.danger { color: rgba(239,68,68,0.8); }
        .dropdown-item.danger:hover { background: rgba(239,68,68,0.1); color: #ef4444; padding-left: 20px; }

        .overlay { position: fixed; inset: 0; z-index: 40; }
      `}</style>

      <header className="navbar-root">
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/admin/dashboard" className="logo-link">
            <div className="logo-icon-wrap">
              <div className="logo-icon">FP</div>
              <div className="logo-pulse" />
            </div>
            <div>
              <div className="logo-text-main">
                Festival<span>Post</span>
              </div>
              <div className="logo-sub">
                <Sparkles size={11} color="#f97316" />
                Admin Panel v3.0
              </div>
            </div>
          </Link>

          {/* Nav */}
          <nav>
            <ul className="nav-list">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`nav-link${active ? " active" : ""}`}
                    >
                      <Icon size={16} className="nav-icon" />
                      {item.name}
                      {active && <span className="nav-shine" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Profile */}
          <div className="profile-wrap">
            <button
              className="profile-btn"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="profile-avatar">A</div>
              <div className="hidden md:block">
                <div className="profile-name">Admin</div>
                <div className="profile-email">festivalpost.in</div>
              </div>
              <ChevronDown
                size={16}
                className={`profile-chevron${isProfileOpen ? " open" : ""}`}
              />
            </button>

            {isProfileOpen && (
              <>
                <div className="overlay" onClick={() => setIsProfileOpen(false)} />
                <div className="dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-header-name">Admin User</div>
                    <div className="dropdown-header-email">admin@festivalpost.in</div>
                  </div>
                  <button className="dropdown-item">
                    <User size={15} />
                    Profile
                  </button>
                  <button className="dropdown-item">
                    <Settings size={15} />
                    Settings
                  </button>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item danger">
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}