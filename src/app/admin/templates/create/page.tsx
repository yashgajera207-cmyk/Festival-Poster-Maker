"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

export default function CreateTemplatePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const templateId = searchParams.get("id");

  useEffect(() => {
    fetchCategories();

    if (templateId) {
      fetchTemplate();
    }
  }, [templateId]);

  async function fetchCategories() {
    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: `query { categories { id name } }` }),
      });
      const result = await response.json();
      if (result.errors) {
        console.error(result.errors);
        return;
      }
      setCategories(result.data?.categories || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTemplate() {
    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query Template(
              $id: ID!
            ) {
              template(
                id: $id
              ) {
                id
                title
                categoryId
                backgroundImage
              }
            }
          `,
          variables: {
            id: templateId,
          },
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
        ? `
      mutation UpdateTemplate(
        $input: UpdateTemplateInput!
      ) {
        updateTemplate(
          input: $input
        ) {
          id
        }
      }
    `
        : `
      mutation CreateTemplate(
        $input: CreateTemplateInput!
      ) {
        createTemplate(
          input: $input
        ) {
          id
        }
      }
    `;

      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {
            input: templateId
              ? {
                  id: templateId,
                  title,
                  backgroundImage,
                  categoryId,
                }
              : {
                  title,
                  backgroundImage,
                  categoryId,
                },
          },
        }),
      });
      const result = await response.json();
      if (result.errors) {
        alert(result.errors[0]?.message || "Failed to create template");
        return;
      }
      alert(
        templateId
          ? "Template Updated Successfully"
          : "Template Created Successfully",
      );
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* ─── FIX: natural page scroll, no fixed height ─── */
        .ct-root {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;                 /* full background height */
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #1c1108 100%);
          padding: 32px 24px 60px;           /* extra bottom padding for scroll space */
        }

        /* ── Top bar ── */
        .ct-topbar {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .ct-back {
          width: 40px; height: 40px;
          border-radius: 11px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: background .2s, color .2s, transform .2s;
          flex-shrink: 0;
        }

        .ct-back:hover {
          background: rgba(249,115,22,0.12);
          border-color: rgba(249,115,22,0.3);
          color: #f97316;
          transform: translateX(-2px);
        }

        .ct-topbar-icon {
          width: 48px; height: 48px;
          border-radius: 14px;
          background: rgba(249,115,22,0.15);
          border: 1px solid rgba(249,115,22,0.28);
          display: flex; align-items: center; justify-content: center;
          color: #f97316; flex-shrink: 0;
        }

        .ct-page-title {
          font-size: 24px; font-weight: 800; color: #fff;
          letter-spacing: -.5px; line-height: 1;
        }

        .ct-page-sub { font-size: 13px; color: rgba(255,255,255,.35); margin-top: 3px; }

        /* ── Layout ── */
        .ct-layout {
          max-width: 800px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 20px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .ct-layout { grid-template-columns: 1fr; }
          .ct-sidebar { order: -1; }
        }

        /* ── Main card ── */
        .ct-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: visible;   /* changed from hidden – allows scroll without clipping */
          position: relative;
        }

        .ct-card::before {
          content: '';
          display: block;
          height: 2px;
          background: linear-gradient(90deg, #f97316, #fbbf24, #f97316);
          background-size: 200% 100%;
          animation: sh 3s linear infinite;
          border-radius: 20px 20px 0 0;
        }

        @keyframes sh { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        .ct-card-body { padding: 28px; }

        /* ── Section heading ── */
        .ct-section-label {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: .8px;
          color: rgba(255,255,255,.3);
          margin-bottom: 8px;
        }

        .ct-section-label span {
          width: 22px; height: 22px;
          border-radius: 6px;
          background: rgba(249,115,22,0.15);
          border: 1px solid rgba(249,115,22,0.25);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; color: #f97316;
        }

        /* ── Field ── */
        .ct-field { margin-bottom: 22px; }

        .ct-label {
          display: flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: .6px;
          color: rgba(255,255,255,.38);
          margin-bottom: 9px;
        }

        .ct-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 14px; font-weight: 500;
          color: #fff;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color .2s, background .2s, box-shadow .2s;
          box-sizing: border-box;
        }

        .ct-input::placeholder { color: rgba(255,255,255,0.2); }

        .ct-input:focus {
          border-color: rgba(249,115,22,0.5);
          background: rgba(249,115,22,0.05);
          box-shadow: 0 0 0 3px rgba(249,115,22,0.11);
        }

        /* custom select */
        .ct-select-wrap { position: relative; }

        .ct-select-wrap::after {
          content: '';
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          width: 0; height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid rgba(255,255,255,0.3);
          pointer-events: none;
          transition: border-top-color .2s;
        }

        .ct-select-wrap:hover::after { border-top-color: #f97316; }

        .ct-select {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 14px 40px 14px 16px;
          font-size: 14px; font-weight: 500;
          color: #fff;
          font-family: 'Inter', sans-serif;
          outline: none;
          appearance: none;
          cursor: pointer;
          transition: border-color .2s, background .2s, box-shadow .2s;
          box-sizing: border-box;
        }

        .ct-select option { background: #1e1e1e; color: #fff; }

        .ct-select:focus {
          border-color: rgba(249,115,22,0.5);
          background: rgba(249,115,22,0.05);
          box-shadow: 0 0 0 3px rgba(249,115,22,0.11);
        }

        /* ── Upload zone ── */
        .ct-upload-wrap {
          background: rgba(255,255,255,0.03);
          border: 2px dashed rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 28px 20px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px;
          transition: border-color .2s, background .2s;
          cursor: pointer;
        }

        .ct-upload-wrap:hover {
          border-color: rgba(249,115,22,0.4);
          background: rgba(249,115,22,0.04);
        }

        .ct-upload-icon {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: rgba(249,115,22,0.12);
          border: 1px solid rgba(249,115,22,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #f97316;
        }

        .ct-upload-text { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.55); }
        .ct-upload-sub { font-size: 12px; color: rgba(255,255,255,0.25); }

        /* ── Preview ── */
        .ct-preview-wrap {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(249,115,22,0.2);
          animation: fade-in .35s ease;
        }

        @keyframes fade-in { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }

        .ct-preview-img { width: 100%; height: 260px; object-fit: cover; display: block; }

        .ct-preview-badge {
          position: absolute; bottom: 10px; left: 10px;
          display: flex; align-items: center; gap: 6px;
          background: rgba(0,0,0,0.65); backdrop-filter: blur(8px);
          border: 1px solid rgba(34,197,94,0.3);
          color: #4ade80; font-size: 11px; font-weight: 600;
          padding: 5px 10px; border-radius: 8px;
        }

        .ct-preview-url {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 11px;
          color: rgba(249,115,22,0.7);
          font-family: 'SF Mono', monospace;
          word-break: break-all;
          margin-top: 10px;
        }

        /* ── Divider ── */
        .ct-divider { height: 1px; background: rgba(255,255,255,.06); margin: 22px 0; }

        /* ── Save button ── */
        .ct-save-btn {
          width: 100%;
          background: linear-gradient(135deg, #f97316, #fbbf24);
          color: #fff; font-weight: 700; font-size: 15px;
          padding: 15px;
          border-radius: 13px; border: none; cursor: pointer;
          box-shadow: 0 4px 20px rgba(249,115,22,0.35);
          transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s, opacity .2s;
          font-family: 'Inter', sans-serif;
          display: flex; align-items: center; justify-content: center; gap: 9px;
          position: relative; overflow: hidden;
        }

        .ct-save-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
          background-size: 200% 100%;
          animation: btn-shine 2.5s ease-in-out infinite;
        }

        @keyframes btn-shine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        .ct-save-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(249,115,22,0.5);
        }

        .ct-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* ── Sidebar ── */
        .ct-sidebar { display: flex; flex-direction: column; gap: 16px; }

        /* progress card */
        .ct-progress-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 22px;
        }

        .ct-progress-title {
          font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.5);
          margin-bottom: 18px;
          display: flex; align-items: center; gap: 7px;
        }

        .ct-step {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: all .2s;
        }

        .ct-step:last-child { border-bottom: none; padding-bottom: 0; }
        .ct-step:first-child { padding-top: 0; }

        .ct-step-num {
          width: 32px; height: 32px;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700;
          flex-shrink: 0;
          transition: all .3s;
        }

        .ct-step-num.done {
          background: rgba(34,197,94,0.15);
          border: 1px solid rgba(34,197,94,0.3);
          color: #4ade80;
        }

        .ct-step-num.pending {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.3);
        }

        .ct-step-label {
          font-size: 13px; font-weight: 600;
          transition: color .2s;
        }

        .ct-step-label.done { color: rgba(255,255,255,0.75); }
        .ct-step-label.pending { color: rgba(255,255,255,0.3); }

        .ct-step-check { margin-left: auto; color: #4ade80; flex-shrink: 0; }

        /* progress bar */
        .ct-prog-bar-wrap {
          margin-top: 18px;
          background: rgba(255,255,255,0.06);
          border-radius: 99px;
          height: 5px;
          overflow: hidden;
        }

        .ct-prog-bar {
          height: 100%;
          background: linear-gradient(90deg, #f97316, #fbbf24);
          border-radius: 99px;
          transition: width .4s cubic-bezier(.34,1,.64,1);
          box-shadow: 0 0 8px rgba(249,115,22,0.5);
        }

        .ct-prog-label {
          display: flex; justify-content: space-between;
          margin-top: 8px;
          font-size: 11px; color: rgba(255,255,255,.3);
        }

        /* tips card */
        .ct-tips-card {
          background: rgba(249,115,22,0.06);
          border: 1px solid rgba(249,115,22,0.15);
          border-radius: 16px;
          padding: 18px;
        }

        .ct-tips-title {
          display: flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 700;
          color: rgba(249,115,22,0.8);
          margin-bottom: 12px;
        }

        .ct-tip {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 12px; color: rgba(255,255,255,.35);
          margin-bottom: 8px; line-height: 1.5;
        }

        .ct-tip:last-child { margin-bottom: 0; }

        .ct-tip-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(249,115,22,0.5);
          flex-shrink: 0; margin-top: 6px;
        }

        /* loading spinner */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin .7s linear infinite;
        }
      `}</style>

      <div className="ct-root">
        {/* Top bar */}
        <div className="ct-topbar">
          <Link href="/admin/templates" className="ct-back">
            <ArrowLeft size={18} />
          </Link>
          <div className="ct-topbar-icon">
            <Image size={22} />
          </div>
          <div>
            <div className="ct-page-title">Create Template</div>
            <div className="ct-page-sub">
              {templateId
                ? "Update template details"
                : "Fill in the details to publish a new festival template"}
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="ct-layout">
          {/* Main form */}
          <div className="ct-card">
            <div className="ct-card-body">
              {/* Title field */}
              <div className="ct-field">
                <div className="ct-label">
                  <Type size={13} />
                  Template Title
                </div>
                <input
                  type="text"
                  className="ct-input"
                  placeholder="e.g. Diwali Celebration 2025"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Category field */}
              <div className="ct-field">
                <div className="ct-label">
                  <Tag size={13} />
                  Category
                </div>
                <div className="ct-select-wrap">
                  <select
                    className="ct-select"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">— Select a category —</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Background image */}
              <div className="ct-field">
                <div className="ct-label">
                  <Upload size={13} />
                  Background Image
                </div>

                {!backgroundImage ? (
                  <div className="ct-upload-wrap">
                    <div className="ct-upload-icon">
                      <Upload size={22} />
                    </div>
                    <div className="ct-upload-text">
                      Upload background image
                    </div>
                    <div className="ct-upload-sub">
                      PNG, JPG or WEBP — recommended 1080×1080
                    </div>
                    <LogoUpload
                      onUploadSuccess={(url) => {
                        console.log("UPLOADED URL:", url);
                        setBackgroundImage(url);
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <div className="ct-preview-wrap">
                      <img
                        src={backgroundImage}
                        alt="Preview"
                        className="ct-preview-img"
                      />
                      <div className="ct-preview-badge">
                        <CheckCircle2 size={12} /> Image uploaded
                      </div>
                    </div>
                    <div className="ct-preview-url">{backgroundImage}</div>
                    <div style={{ marginTop: 10 }}>
                      <LogoUpload
                        onUploadSuccess={(url) => setBackgroundImage(url)}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="ct-divider" />

              {/* Save button – now always visible when you scroll */}
              <button
                className="ct-save-btn"
                onClick={saveTemplate}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    {templateId
                      ? "Updating Template..."
                      : "Creating Template..."}
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    {templateId ? "Update Template" : "Create Template"}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="ct-sidebar">
            {/* Progress */}
            <div className="ct-progress-card">
              <div className="ct-progress-title">
                <Sparkles size={14} color="#f97316" /> Completion
              </div>

              {steps.map((step) => (
                <div key={step.num} className="ct-step">
                  <div
                    className={`ct-step-num ${step.done ? "done" : "pending"}`}
                  >
                    {step.done ? <CheckCircle2 size={14} /> : step.num}
                  </div>
                  <div
                    className={`ct-step-label ${step.done ? "done" : "pending"}`}
                  >
                    {step.label}
                  </div>
                  {step.done && (
                    <CheckCircle2 size={14} className="ct-step-check" />
                  )}
                </div>
              ))}

              <div className="ct-prog-bar-wrap">
                <div
                  className="ct-prog-bar"
                  style={{
                    width: `${(steps.filter((s) => s.done).length / steps.length) * 100}%`,
                  }}
                />
              </div>
              <div className="ct-prog-label">
                <span>
                  {steps.filter((s) => s.done).length} of {steps.length}{" "}
                  completed
                </span>
                <span>
                  {Math.round(
                    (steps.filter((s) => s.done).length / steps.length) * 100,
                  )}
                  %
                </span>
              </div>
            </div>

            {/* Tips */}
            <div className="ct-tips-card">
              <div className="ct-tips-title">
                <Sparkles size={13} /> Tips
              </div>
              <div className="ct-tip">
                <div className="ct-tip-dot" />
                Use a descriptive title so users can easily find this template.
              </div>
              <div className="ct-tip">
                <div className="ct-tip-dot" />
                Upload a high-quality image (1080×1080px) for best results.
              </div>
              <div className="ct-tip">
                <div className="ct-tip-dot" />
                Assign the correct category so templates appear in the right
                section.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
