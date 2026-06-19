"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { toPng } from "html-to-image";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  ImageIcon,
  Palette,
  Download,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function PosterEditorPage() {
  const params = useParams();
  const templateId = params.id as string;

  const posterRef = useRef<HTMLDivElement>(null);

  const [template, setTemplate] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [elements, setElements] = useState<any[]>([]);

  const [form, setForm] = useState({
    businessName: "",
    address: "",
    phone: "",
    email: "",
    logoUrl: "",
    textColor: "#ffffff",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    await fetchTemplate();
    await fetchProfile();
    await fetchElements();
  }

  async function fetchTemplate() {
    const response = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query Template($id: ID!) {
            template(id: $id) {
              id
              title
              backgroundImage
            }
          }
        `,
        variables: { id: templateId },
      }),
    });

    const result = await response.json();
    setTemplate(result.data?.template);
  }

  async function fetchProfile() {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            query {
              me {
                businessName
                email
                mobile
                address
                logoUrl
              }
            }
          `,
        }),
      });

      const result = await response.json();
      const user = result.data?.me;
      if (!user) return;

      setForm({
        businessName: user.businessName || "",
        address: user.address || "",
        phone: user.mobile || "",
        email: user.email || "",
        logoUrl: user.logoUrl || "",
        textColor: "#ffffff",
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  async function fetchElements() {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
              query UserLayouts(
                $templateId:String!
              ){
                userPosterLayouts(
                  templateId:$templateId
                ){
                  id
                  elementType
                  xPosition
                  yPosition
                  width
                  height
                }
              }
            `,
          variables: {
            templateId,
          },
        }),
      });

      const result = await response.json();

      const layouts = result.data?.userPosterLayouts;

      if (
  layouts &&
  layouts.length > 0
) {
  setElements(layouts);
} else {
  await fetchTemplateElements();
}
    } catch (error) {
      console.error(error);
    }
  }
async function fetchTemplateElements() {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query Elements(
          $templateId:String!
        ){
          elements(
            templateId:$templateId
          ){
            id
            elementType
            xPosition
            yPosition
            width
            height
          }
        }
      `,
      variables: {
        templateId,
      },
    }),
  });

  const result = await response.json();

  console.log(
    "TEMPLATE ELEMENTS:",
    result
  );

  setElements(
    result.data?.elements || []
  );
}
  async function generatePoster() {
    if (!posterRef.current) {
      alert("Poster not found");
      return;
    }

    setGenerating(true);

    try {
      const image = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      // Download Image
      const link = document.createElement("a");

      link.href = image;
      link.download = `${form.businessName || "poster"}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Save Poster In Database
      try {
        const response = await fetch("/api/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              mutation CreatePoster(
                $templateId:String!
                $companyName:String
                $logoUrl:String
                $address:String
                $phone:String
                $email:String
                $generatedImage:String
              ){
                createGeneratedPoster(
                  templateId:$templateId
                  companyName:$companyName
                  logoUrl:$logoUrl
                  address:$address
                  phone:$phone
                  email:$email
                  generatedImage:$generatedImage
                ){
                  id
                }
              }
            `,
            variables: {
              templateId,
              companyName: form.businessName,
              logoUrl: form.logoUrl,
              address: form.address,
              phone: form.phone,
              email: form.email,
              generatedImage: image,
            },
          }),
        });

        const result = await response.json();

        console.log("POSTER SAVE RESULT:", result);
      } catch (error) {
        console.error("SAVE POSTER ERROR:", error);
      }

      alert("Poster Generated & Downloaded Successfully");
    } catch (error) {
      console.error("POSTER GENERATE ERROR:", error);

      alert("Failed To Generate Poster");
    } finally {
      setGenerating(false);
    }
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="text-orange-500 animate-spin" />
          <p className="text-sm text-slate-400 font-medium">
            Loading template...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-6 py-8"
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* Top bar */}
      <div className="max-w-7xl mx-auto flex items-center gap-4 mb-7">
        <Link
          href="/user/templates"
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-300 hover:-translate-x-0.5 transition-all flex-shrink-0"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800">{template.title}</h1>
          <p className="text-sm text-slate-500">
            Fill in your business details to generate the poster
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form panel */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 lg:sticky lg:top-8">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-800 mb-5">
              <Building2 size={17} className="text-orange-500" />
              Business Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  <Building2 size={12} /> Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Your business name"
                  value={form.businessName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  <MapPin size={12} /> Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Street, City, State"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  <Phone size={12} /> Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+91 00000 00000"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  <Mail size={12} /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@business.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  <ImageIcon size={12} /> Logo URL
                </label>
                <input
                  type="text"
                  name="logoUrl"
                  placeholder="https://..."
                  value={form.logoUrl}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  <Palette size={12} /> Text Color
                </label>
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                  <input
                    type="color"
                    name="textColor"
                    value={form.textColor}
                    onChange={handleChange}
                    className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer bg-transparent"
                  />
                  <span className="text-sm font-mono text-slate-500 uppercase">
                    {form.textColor}
                  </span>
                </div>
              </div>

              <hr className="border-slate-100 !my-5" />

              <button
                onClick={generatePoster}
                disabled={generating}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl shadow transition-colors"
              >
                {generating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Generate & Download Poster
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Poster preview */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-500">
              <Sparkles size={14} className="text-orange-500" />
              Live Preview
            </div>

            <div
              ref={posterRef}
              className="relative border border-slate-200 rounded-xl overflow-hidden bg-white"
            >
              <img src={template.backgroundImage} alt="" className="w-full" />

              {elements.map((element) => (
                <div
                  key={element.id}
                  className="absolute"
                  style={{
                    left: element.xPosition,
                    top: element.yPosition,
                    width: element.width,
                    height: element.height,
                    color: form.textColor,
                  }}
                >
                  {element.elementType === "LOGO" && (
                    <img
                      src={form.logoUrl}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  )}

                  {element.elementType === "BUSINESS_NAME" && (
                    <div className="font-bold text-4xl">
                      {form.businessName}
                    </div>
                  )}

                  {element.elementType === "ADDRESS" && (
                    <div>{form.address}</div>
                  )}

                  {element.elementType === "PHONE" && <div>{form.phone}</div>}

                  {element.elementType === "EMAIL" && <div>{form.email}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
