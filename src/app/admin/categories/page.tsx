"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, FolderKanban, Tag, Hash } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  async function fetchCategories() {
    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query { categories { id name slug } }`,
        }),
      });
      const result = await response.json();
      if (result.errors) { alert(JSON.stringify(result.errors, null, 2)); return; }
      setCategories(result.data?.categories || []);
    } catch (error) { console.error(error); }
  }

  useEffect(() => { fetchCategories(); }, []);

  async function saveCategory() {
    try {
      if (!name.trim()) { alert("Category name required"); return; }
      if (!slug.trim()) { alert("Slug required"); return; }
      setLoading(true);
      const mutation = editing
        ? `mutation UpdateCategory($input: UpdateCategoryInput!) { updateCategory(input: $input) { id } }`
        : `mutation CreateCategory($input: CreateCategoryInput!) { createCategory(input: $input) { id } }`;
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: mutation,
          variables: { input: editing ? { id: editing.id, name, slug } : { name, slug } },
        }),
      });
      const result = await response.json();
      if (result.errors) { alert(result.errors[0].message); return; }
      setOpen(false); setEditing(null); setName(""); setSlug("");
      await fetchCategories();
    } catch (error) { console.error(error); alert("Failed to save category"); }
    finally { setLoading(false); }
  }

  async function deleteCategory(id: string) {
    const ok = confirm("Delete category?");
    if (!ok) return;
    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `mutation DeleteCategory($id: ID!) { deleteCategory(id: $id) }`,
          variables: { id },
        }),
      });
      const result = await response.json();
      if (result.errors) { alert(result.errors[0].message); return; }
      await fetchCategories();
    } catch (error) { console.error(error); alert("Delete failed"); }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500">
            <FolderKanban size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
            <p className="text-sm text-gray-500">Manage all your content categories</p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-500 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full mt-1">
              ● {categories.length} total
            </span>
          </div>
        </div>
        <button
          onClick={() => { setEditing(null); setName(""); setSlug(""); setOpen(true); }}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow transition-colors"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500">
            <FolderKanban size={18} />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">{categories.length}</div>
            <div className="text-xs text-gray-400">Total Categories</div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500">
            <Tag size={18} />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">{categories.length}</div>
            <div className="text-xs text-gray-400">Active</div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-500">
            <Hash size={18} />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">{categories.length}</div>
            <div className="text-xs text-gray-400">With Slugs</div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 text-sm font-semibold text-gray-600">
          <FolderKanban size={16} />
          All Categories
        </div>

        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4 text-orange-300">
              <FolderKanban size={28} />
            </div>
            <p className="text-sm font-semibold text-gray-500">No categories yet</p>
            <p className="text-xs text-gray-400 mt-1">Click "Add Category" to create your first one</p>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400 w-12">#</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Slug</th>
                <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-400">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center text-sm font-bold text-orange-500">
                        {category.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 bg-gray-100 border border-gray-200 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-lg font-mono">
                      <Hash size={11} />
                      {category.slug}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        title="Edit"
                        onClick={() => { setEditing(category); setName(category.name); setSlug(category.slug); setOpen(true); }}
                        className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => deleteCategory(category.id)}
                        className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 text-red-400 hover:bg-red-100 flex items-center justify-center transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-7 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500">
                  <FolderKanban size={20} />
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900">{editing ? "Edit Category" : "New Category"}</div>
                  <div className="text-xs text-gray-400">{editing ? "Update category details" : "Fill in the details below"}</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-400 transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <hr className="border-gray-100 mb-5" />

            {/* Fields */}
            <div className="mb-4">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                <Tag size={11} /> Category Name
              </label>
              <input
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                placeholder="e.g. Festivals, Events..."
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                  setName(value);
                  setSlug(value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
                }}
              />
            </div>

            <div className="mb-5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                <Hash size={11} /> URL Slug
              </label>
              <input
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-orange-500 font-mono placeholder-gray-300 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                placeholder="auto-generated-slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <button
              onClick={saveCategory}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition-colors"
            >
              {loading ? "Saving..." : editing ? <><Pencil size={15} /> Update Category</> : <><Plus size={15} /> Save Category</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}