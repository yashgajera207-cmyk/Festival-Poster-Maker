"use client";

import Link from "next/link";
import {
  LayoutTemplate,
  Download,
  Clock,
  TrendingUp,
  Sparkles,
  ImageIcon,
  ArrowUpRight,
  PartyPopper,
  Plus,
  Star,
} from "lucide-react";

const stats = [
  { label: "Templates Used", value: "24", icon: LayoutTemplate, color: "orange", change: "+12% this month" },
  { label: "Posts Downloaded", value: "138", icon: Download, color: "blue", change: "+8% this month" },
  { label: "Favorites", value: "9", icon: Star, color: "green", change: "+3 new" },
];

const recentActivity = [
  { title: "Diwali Celebration 2025", category: "Festival", time: "2 hours ago", img: "🪔" },
  { title: "New Year Greetings", category: "Festival", time: "Yesterday", img: "🎉" },
  { title: "Republic Day Post", category: "National", time: "3 days ago", img: "🇮🇳" },
  { title: "Holi Special Banner", category: "Festival", time: "1 week ago", img: "🎨" },
];

const quickActions = [
  { label: "Browse Templates", href: "/user/templates", icon: LayoutTemplate, desc: "Explore the full collection" },
  { label: "Create New Post", href: "/user/templates", icon: Plus, desc: "Start from a blank canvas" },
  { label: "My Profile", href: "/user/profile", icon: ImageIcon, desc: "Update your details" },
];

const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
  orange: { bg: "bg-orange-50", text: "text-orange-500", ring: "group-hover:ring-orange-200" },
  blue: { bg: "bg-blue-50", text: "text-blue-500", ring: "group-hover:ring-blue-200" },
  green: { bg: "bg-green-50", text: "text-green-500", ring: "group-hover:ring-green-200" },
};

export default function UserDashboard() {
  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease]">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Hero / Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 px-8 py-10 shadow-lg">
        <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm mb-4">
              <PartyPopper size={13} /> Welcome back
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              User Dashboard
            </h1>
            <p className="text-white/85 mt-2 text-sm md:text-base max-w-md">
              Welcome to FestivalPost — create stunning festival posts in seconds.
            </p>
          </div>
          <Link
            href="/user/templates"
            className="flex items-center gap-2 bg-white text-orange-600 font-semibold text-sm px-5 py-3 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <Sparkles size={16} />
            Create New Post
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const c = colorMap[stat.color];
          return (
            <div
              key={stat.label}
              style={{ animation: `fadeInUp 0.5s ease ${i * 0.08}s both` }}
              className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 cursor-default"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.text} flex items-center justify-center ring-0 ring-offset-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} />
                </div>
                <ArrowUpRight size={16} className="text-slate-300 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </div>
              <div className="text-2xl font-extrabold text-slate-800 group-hover:text-orange-600 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 mt-0.5">{stat.label}</div>
              <div className="flex items-center gap-1 text-xs font-medium text-green-500 mt-2">
                <TrendingUp size={12} /> {stat.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-column: Recent activity + Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Clock size={15} className="text-orange-500" />
              Recent Activity
            </h2>
            <Link href="/user/templates" className="text-xs font-semibold text-orange-500 hover:text-orange-600 hover:underline underline-offset-2 transition-colors">
              View all
            </Link>
          </div>
          <div>
            {recentActivity.map((item, i) => (
              <div
                key={item.title}
                style={{ animation: `fadeInUp 0.5s ease ${0.1 + i * 0.07}s both` }}
                className="group flex items-center gap-4 px-6 py-4 border-b border-slate-50 last:border-b-0 hover:bg-orange-50/40 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {item.img}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-semibold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.time}</span>
                  </div>
                </div>
                <ArrowUpRight
                  size={15}
                  className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4">
            <Sparkles size={15} className="text-orange-500" />
            Quick Actions
          </h2>
          <div className="flex flex-col gap-3">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  style={{ animation: `fadeInUp 0.5s ease ${0.15 + i * 0.08}s both` }}
                  className="group flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">
                      {action.label}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{action.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}