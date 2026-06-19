"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Image,
  LayoutGrid,
  List,
  Calendar,
  Tag,
} from "lucide-react";

interface Template {
  id: string;
  title: string;
  backgroundImage: string;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  async function fetchTemplates() {
    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query Templates {
              templates {
                id title backgroundImage createdAt
                category { id name }
              }
            }
          `,
        }),
      });
      const result = await response.json();
      if (result.errors) { console.error("GRAPHQL ERROR:", result.errors); return; }
      setTemplates(result.data?.templates || []);
    } catch (error) {
      console.error("FETCH TEMPLATE ERROR:", error);
    }
  }

  async function deleteTemplate(id: string) {
    const ok = confirm("Delete Template?");
    if (!ok) return;
    try {
      await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `mutation DeleteTemplate($id: ID!) { deleteTemplate(id: $id) }`,
          variables: { id },
        }),
      });
      fetchTemplates();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => { fetchTemplates(); }, []);

  const categories = ["all", ...new Set(templates.map((t) => t.category.name))];

  const filteredTemplates = templates.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "all" || t.category.name === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500">
            <Image size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage all festival templates</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-500 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                ● Total: {templates.length}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">
                ● Showing: {filteredTemplates.length}
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/admin/templates/create"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow transition-colors whitespace-nowrap"
        >
          <Plus size={18} /> Add Template
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-3 mb-6 flex-wrap shadow-sm">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                  : "bg-gray-50 text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex gap-1 bg-gray-100 border border-gray-200 rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            title="Grid view"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              viewMode === "grid" ? "bg-orange-500 text-white shadow-sm" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            title="List view"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              viewMode === "list" ? "bg-orange-500 text-white shadow-sm" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
          {filteredTemplates.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4 text-orange-300">
                <Image size={28} />
              </div>
              <p className="text-sm font-semibold text-gray-500">No Templates Found</p>
              <p className="text-xs text-gray-400 mt-1">Create your first template to get started</p>
            </div>
          ) : (
            filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 group">
                {/* Image */}
                <div className="relative overflow-hidden">
                  {template.backgroundImage ? (
                    <img
                      src={template.backgroundImage}
                      alt={template.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-44 bg-orange-50 flex items-center justify-center text-orange-200">
                      <Image size={36} />
                    </div>
                  )}
                  <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm text-orange-500 text-[11px] font-bold px-2.5 py-1 rounded-full border border-orange-100">
                    {template.category.name}
                  </span>
                </div>
                {/* Body */}
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-800 truncate mb-1">{template.title}</p>
                  <p className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                    <Calendar size={11} />
                    {new Date(template.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/templates/create?id=${template.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-500 hover:bg-blue-100 text-xs font-semibold transition-colors"
                    >
                      <Pencil size={12} /> Edit
                    </Link>
                    <button
                      onClick={() => deleteTemplate(template.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-50 border border-red-100 text-red-400 hover:bg-red-100 text-xs font-semibold transition-colors"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="flex flex-col gap-3">
          {filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-2xl text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4 text-orange-300">
                <Image size={28} />
              </div>
              <p className="text-sm font-semibold text-gray-500">No Templates Found</p>
              <p className="text-xs text-gray-400 mt-1">Create your first template to get started</p>
            </div>
          ) : (
            filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white border border-gray-200 rounded-xl flex items-center gap-4 px-5 py-4 shadow-sm hover:border-orange-200 hover:bg-orange-50/30 transition-all">
                {template.backgroundImage ? (
                  <img
                    src={template.backgroundImage}
                    alt={template.title}
                    className="w-14 h-14 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-300 flex-shrink-0">
                    <Image size={20} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate mb-1">{template.title}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-500 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md">
                      <Tag size={10} /> {template.category.name}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                      <Calendar size={10} /> {new Date(template.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/templates/create?id=${template.id}`}
                    className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors"
                  >
                    <Pencil size={14} />
                  </Link>
                  <button
                    onClick={() => deleteTemplate(template.id)}
                    className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 text-red-400 hover:bg-red-100 flex items-center justify-center transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}