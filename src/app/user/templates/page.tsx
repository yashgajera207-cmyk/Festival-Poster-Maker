"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Sparkles,
  LayoutTemplate,
  Wand2,
  ImageOff,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Template {
  id: string;
  title: string;
  backgroundImage: string;
  category: {
    id: string;
    name: string;
  };
}

export default function UserTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              categories { id name }
              templates {
                id
                title
                backgroundImage
                category { id name }
              }
            }
          `,
        }),
      });

      const result = await response.json();
      setCategories(result.data?.categories || []);
      setTemplates(result.data?.templates || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredTemplates = templates.filter((template) => {
    const categoryMatch =
      selectedCategory === "" ? true : template.category.id === selectedCategory;
    const searchMatch = template.title.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0">
            <LayoutTemplate size={22} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              Festival Templates
            </h1>
            <p className="text-slate-500 mt-1 text-sm md:text-base">
              Choose a template and generate your poster instantly.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search template..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
              />
            </div>

            <div className="relative">
              <Filter size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition cursor-pointer appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          {(search || selectedCategory) && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {search && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-600 bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-full">
                  "{search}"
                  <button onClick={() => setSearch("")} className="hover:text-orange-800">×</button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-600 bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-full">
                  {categories.find((c) => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory("")} className="hover:text-orange-800">×</button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="aspect-[4/5] bg-slate-100 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-16 bg-slate-100 rounded-full animate-pulse" />
                  <div className="h-5 w-3/4 bg-slate-100 rounded animate-pulse" />
                  <div className="h-10 w-full bg-slate-100 rounded-xl animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTemplates.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-14 text-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-4 text-orange-300">
              <ImageOff size={28} />
            </div>
            <h2 className="text-lg font-bold text-slate-700">No Templates Found</h2>
            <p className="text-slate-400 text-sm mt-1.5">Try another search or category.</p>
          </div>
        )}

        {/* Templates Grid */}
        {!loading && filteredTemplates.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template, i) => (
              <div
                key={template.id}
                style={{ animation: `fadeInUp 0.45s ease ${Math.min(i, 8) * 0.05}s both` }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
                  {template.backgroundImage ? (
                    <img
                      src={template.backgroundImage}
                      alt={template.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ImageOff size={32} />
                    </div>
                  )}
                  {/* hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 left-3 text-[11px] font-bold bg-white/90 backdrop-blur-sm text-orange-600 px-2.5 py-1 rounded-full border border-orange-100 shadow-sm">
                    {template.category.name}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4">
                  <h3 className="font-bold text-slate-800 text-base truncate group-hover:text-orange-600 transition-colors">
                    {template.title}
                  </h3>

                  <div className="mt-4 flex flex-col gap-2">
                    <Link
                      href={`/user/templates/${template.id}`}
                      className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white text-sm font-semibold py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-150"
                    >
                      <Sparkles size={15} />
                      Generate Poster
                    </Link>
                    <Link
                      href={`/user/customize/${template.id}`}
                      className="flex items-center justify-center gap-2 w-full bg-white border border-slate-200 hover:border-orange-300 hover:bg-orange-50 active:scale-[0.98] text-slate-700 hover:text-orange-600 text-sm font-semibold py-2.5 rounded-xl transition-all duration-150"
                    >
                      <Wand2 size={15} />
                      Customize Layout
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}