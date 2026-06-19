"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import LogoUpload from "@/components/upload/LogoUpload";
import {
  ArrowLeft,
  Image,
  Tag,
  Type,
  Sparkles,
  CheckCircle2,
  Upload,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

export default function CreateTemplatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (templateId) fetchTemplate();
  }, [templateId]);

  async function fetchCategories() {
    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: `query { categories { id name } }` }),
      });
      const result = await response.json();
      if (result.errors) { console.error(result.errors); return; }
      setCategories(result.data?.categories || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTemplate() {
    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query Template($id: ID!) {
              template(id: $id) {
                id title categoryId backgroundImage
              }
            }
          `,
          variables: { id: templateId },
        }),
      });
      const result = await response.json();
      if (result.data?.template) {
        setTitle(result.data.template.title);
        setCategoryId(result.data.template.categoryId);
        setBackgroundImage(result.data.template.backgroundImage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function saveTemplate() {
    try {
      if (!title.trim() || !categoryId || !backgroundImage) {
        alert("Please fill all fields");
        return;
      }
      setLoading(true);
      const query = templateId
        ? `mutation UpdateTemplate($input: UpdateTemplateInput!) { updateTemplate(input: $input) { id } }`
        : `mutation CreateTemplate($input: CreateTemplateInput!) { createTemplate(input: $input) { id } }`;

      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          variables: {
            input: templateId
              ? { id: templateId, title, backgroundImage, categoryId }
              : { title, backgroundImage, categoryId },
          },
        }),
      });
      const result = await response.json();
      if (result.errors) {
        alert(result.errors[0]?.message || "Failed to create template");
        return;
      }
      alert(templateId ? "Template Updated Successfully" : "Template Created Successfully");
      router.push("/admin/templates");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const steps = [
    { num: 1, label: "Title", done: title.trim().length > 0 },
    { num: 2, label: "Category", done: categoryId !== "" },
    { num: 3, label: "Image", done: backgroundImage !== "" },
  ];

  const doneCount = steps.filter((s) => s.done).length;
  const progressPct = Math.round((doneCount / steps.length) * 100);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8 pb-16">
      {/* Top bar */}
      <div className="flex items-center gap-4 mb-8 max-w-4xl mx-auto">
        <Link
          href="/admin/templates"
          className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-300 hover:-translate-x-0.5 transition-all flex-shrink-0"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 flex-shrink-0">
          <Image size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Create Template</h1>
          <p className="text-sm text-gray-500">
            {templateId ? "Update template details" : "Fill in the details to publish a new festival template"}
          </p>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_280px] gap-5 items-start">
        {/* Main form card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500" />
          <div className="p-7">
            {/* Title */}
            <div className="mb-6">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                <Type size={13} /> Template Title
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                placeholder="e.g. Diwali Celebration 2025"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                <Tag size={13} /> Category
              </label>
              <select
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition cursor-pointer"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">— Select a category —</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Background image */}
            <div className="mb-6">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                <Upload size={13} /> Background Image
              </label>

              {!backgroundImage ? (
                <div className="border-2 border-dashed border-gray-200 rounded-2xl px-5 py-8 flex flex-col items-center justify-center gap-2.5 hover:border-orange-300 hover:bg-orange-50/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-500">
                    <Upload size={20} />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">Upload background image</p>
                  <p className="text-xs text-gray-400">PNG, JPG or WEBP — recommended 1080×1080</p>
                  <LogoUpload
                    onUploadSuccess={(url: string) => {
                      console.log("UPLOADED URL:", url);
                      setBackgroundImage(url);
                    }}
                  />
                </div>
              ) : (
                <>
                  <div className="relative rounded-2xl overflow-hidden border border-orange-200">
                    <img src={backgroundImage} alt="Preview" className="w-full h-60 object-cover" />
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-black/65 backdrop-blur-sm border border-green-400/30 text-green-400 text-xs font-semibold px-2.5 py-1.5 rounded-lg">
                      <CheckCircle2 size={12} /> Image uploaded
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-[11px] text-orange-500 font-mono break-all mt-2.5">
                    {backgroundImage}
                  </div>
                  <div className="mt-2.5">
                    <LogoUpload onUploadSuccess={(url: string) => setBackgroundImage(url)} />
                  </div>
                </>
              )}
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* Save button */}
            <button
              onClick={saveTemplate}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-xl shadow transition-colors"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  {templateId ? "Updating Template..." : "Creating Template..."}
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  {templateId ? "Update Template" : "Create Template"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Progress card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-4">
              <Sparkles size={14} className="text-orange-500" /> Completion
            </div>

            {steps.map((step) => (
              <div
                key={step.num}
                className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-b-0 last:pb-0 first:pt-0"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    step.done
                      ? "bg-green-50 border border-green-200 text-green-500"
                      : "bg-gray-100 border border-gray-200 text-gray-400"
                  }`}
                >
                  {step.done ? <CheckCircle2 size={14} /> : step.num}
                </div>
                <span className={`text-sm font-semibold ${step.done ? "text-gray-700" : "text-gray-400"}`}>
                  {step.label}
                </span>
                {step.done && <CheckCircle2 size={14} className="text-green-500 ml-auto flex-shrink-0" />}
              </div>
            ))}

            <div className="mt-4 bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[11px] text-gray-400">
              <span>{doneCount} of {steps.length} completed</span>
              <span>{progressPct}%</span>
            </div>
          </div>

          {/* Tips card */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-500 mb-3">
              <Sparkles size={13} /> Tips
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-500 mb-2.5 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-300 mt-1.5 flex-shrink-0" />
              Use a descriptive title so users can easily find this template.
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-500 mb-2.5 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-300 mt-1.5 flex-shrink-0" />
              Upload a high-quality image (1080×1080px) for best results.
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-300 mt-1.5 flex-shrink-0" />
              Assign the correct category so templates appear in the right section.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}