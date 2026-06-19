import Link from "next/link";
import {
  FolderKanban,
  Image,
  Users,
  Layers3,
  Plus,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    title: "Categories",
    value: "4",
    icon: FolderKanban,
  },
  {
    title: "Templates",
    value: "150",
    icon: Image,
  },
  {
    title: "Users",
    value: "1200",
    icon: Users,
  },
  {
    title: "Elements",
    value: "850",
    icon: Layers3,
  },
];

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Welcome to FestivalPost Admin
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-500 text-sm">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Icon
                    size={22}
                    className="text-orange-600"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-xl font-semibold mb-5">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/categories"
            className="p-5 border rounded-xl hover:bg-slate-50 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  Categories
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Manage category list
                </p>
              </div>

              <ArrowRight size={18} />
            </div>
          </Link>

          <Link
            href="/admin/templates"
            className="p-5 border rounded-xl hover:bg-slate-50 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  Templates
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Upload festival templates
                </p>
              </div>

              <ArrowRight size={18} />
            </div>
          </Link>

          <Link
            href="/admin/elements"
            className="p-5 border rounded-xl hover:bg-slate-50 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  Elements
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Manage logo & text positions
                </p>
              </div>

              <ArrowRight size={18} />
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-xl font-semibold mb-5">
          Recent Activity
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">
                New Template Added
              </p>

              <p className="text-sm text-slate-500">
                Diwali Celebration Poster
              </p>
            </div>

            <span className="text-sm text-slate-400">
              2 min ago
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">
                New User Registered
              </p>

              <p className="text-sm text-slate-500">
                Business Account
              </p>
            </div>

            <span className="text-sm text-slate-400">
              15 min ago
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                New Category Created
              </p>

              <p className="text-sm text-slate-500">
                Political Campaign
              </p>
            </div>

            <span className="text-sm text-slate-400">
              1 hour ago
            </span>
          </div>
        </div>
      </div>

      {/* Floating Button */}

      <Link
        href="/admin/templates"
        className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      >
        <Plus size={24} />
      </Link>
    </div>
  );
}