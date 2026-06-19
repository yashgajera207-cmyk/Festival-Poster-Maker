"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { toPng } from "html-to-image";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Download,
  Loader2,
  MousePointer2,
  Image as ImageIcon,
  Type,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const elementIcon: Record<string, any> = {
  LOGO: ImageIcon,
  BUSINESS_NAME: Type,
  ADDRESS: MapPin,
  PHONE: Phone,
  EMAIL: Mail,
};

export default function CustomizeLayoutPage() {
  const params = useParams();
  const templateId = params.id as string;
  const [userData, setUserData] = useState({
    businessName: "",
    address: "",
    phone: "",
    email: "",
    logoUrl: "",
  });

  const [template, setTemplate] = useState<any>(null);
  const [elements, setElements] = useState<any[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    await fetchTemplate();
    await fetchProfile();
    await fetchUserLayout();
  }

  async function fetchProfile() {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

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
                  address
                  mobile
                  email
                  logoUrl
                }
              }
            `,
        }),
      });

      const result = await response.json();
      const user = result.data?.me;

      if (user) {
        setUserData({
          businessName: user.businessName || "",
          address: user.address || "",
          phone: user.mobile || "",
          email: user.email || "",
          logoUrl: user.logoUrl || "",
        });
      }
    } catch (error) {
      console.error(error);
    }
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

  async function fetchUserLayout() {
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
          variables: { templateId },
        }),
      });

      const result = await response.json();
      const layouts = result.data?.userPosterLayouts;

      if (layouts && layouts.length > 0) {
        setElements(layouts);
      } else {
        setElements([
          {
            id: "logo",
            elementType: "LOGO",
            xPosition: 20,
            yPosition: 20,
            width: 120,
            height: 120,
          },
          {
            id: "business",
            elementType: "BUSINESS_NAME",
            xPosition: 170,
            yPosition: 40,
            width: 350,
            height: 80,
          },
          {
            id: "address",
            elementType: "ADDRESS",
            xPosition: 20,
            yPosition: 500,
            width: 500,
            height: 50,
          },
          {
            id: "phone",
            elementType: "PHONE",
            xPosition: 20,
            yPosition: 560,
            width: 350,
            height: 50,
          },
          {
            id: "email",
            elementType: "EMAIL",
            xPosition: 20,
            yPosition: 620,
            width: 500,
            height: 50,
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      await fetchElements();
    }
  }

  async function fetchElements() {
    const response = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        variables: { templateId },
      }),
    });

    const result = await response.json();
    setElements(result.data?.elements || []);
  }

  async function saveLayout() {
    try {
      setIsSaving(true);
      const token = localStorage.getItem("accessToken");

      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
              mutation SaveLayout(
                $elements:[
                  UserPosterLayoutInput!
                ]!
              ){
                saveUserPosterLayout(
                  elements:$elements
                )
              }
            `,
          variables: {
            elements: elements.map((item) => ({
              templateId,
              elementType: item.elementType,
              xPosition: item.xPosition,
              yPosition: item.yPosition,
              width: item.width,
              height: item.height,
            })),
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        alert(result.errors[0].message);
        return;
      }

      alert("Layout Saved Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed To Save Layout");
    } finally {
      setIsSaving(false);
    }
  }

  async function downloadPoster() {
    if (!posterRef.current) return;

    try {
      setIsDownloading(true);

      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });

      const link = document.createElement("a");

      link.download = `${userData.businessName}-poster.png`;

      link.href = dataUrl;

      link.click();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDownloading(false);
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
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      {/* Top bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-4">
          <Link
            href={`/user/templates/${templateId}`}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-300 hover:-translate-x-0.5 transition-all flex-shrink-0"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Customize Layout
            </h1>
            <p className="text-sm text-slate-500">{template.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={saveLayout}
            disabled={isSaving}
            className="flex items-center gap-2 bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 disabled:opacity-60 font-semibold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-colors"
          >
            {isSaving ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Save size={15} />
            )}
            {isSaving ? "Saving..." : "Save Layout"}
          </button>
          <button
            onClick={downloadPoster}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow transition-colors"
          >
            {isDownloading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Download size={15} />
            )}
            {isDownloading ? "Downloading..." : "Download Poster"}
          </button>
        </div>
      </div>

      {/* Hint bar */}
      <div className="max-w-6xl mx-auto mb-5">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-xl px-4 py-2.5 w-fit shadow-sm">
          <MousePointer2 size={14} className="text-orange-500" />
          Drag elements to reposition · drag corners to resize
        </div>
      </div>

      {/* Poster canvas */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <div
            ref={posterRef}
            className="relative border border-slate-200 rounded-xl overflow-hidden bg-white"
          >
            <img src={template.backgroundImage} alt="" className="w-full" />

            {elements.map((element, index) => {
              const Icon =
                elementIcon[element.elementType?.toUpperCase()] || Type;
              return (
                <Rnd
                  key={element.id}
                  bounds="parent"
                  size={{ width: element.width, height: element.height }}
                  position={{ x: element.xPosition, y: element.yPosition }}
                  onDragStop={(e, d) => {
                    setElements((prev) =>
                      prev.map((item, i) =>
                        i === index
                          ? { ...item, xPosition: d.x, yPosition: d.y }
                          : item,
                      ),
                    );
                  }}
                  onResizeStop={(e, dir, ref, delta, pos) => {
                    setElements((prev) =>
                      prev.map((item, i) =>
                        i === index
                          ? {
                              ...item,
                              width: ref.offsetWidth,
                              height: ref.offsetHeight,
                              xPosition: pos.x,
                              yPosition: pos.y,
                            }
                          : item,
                      ),
                    );
                  }}
                >
                  <div
                    className="w-full h-full rounded-lg transition-colors"
                    style={{
                      border: isDownloading ? "none" : "2px dashed #f97316",
                      backgroundColor: isDownloading
                        ? "transparent"
                        : "rgba(249,115,22,0.06)",
                    }}
                  >
                    {!isDownloading && (
                      <div className="absolute -top-px -left-px flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-tl-md rounded-br-md bg-orange-500 text-white">
                        <Icon size={10} />
                        {element.elementType}
                      </div>
                    )}

                    {element.elementType?.toUpperCase() === "LOGO" &&
                      userData.logoUrl && (
                        <img
                          src={userData.logoUrl}
                          alt="logo"
                          crossOrigin="anonymous"
                          className="w-full h-full object-contain"
                        />
                      )}

                    {element.elementType?.toUpperCase() === "BUSINESS_NAME" && (
                      <div className="font-bold text-3xl text-center px-2 flex items-center justify-center h-full">
                        {userData.businessName}
                      </div>
                    )}

                    {element.elementType?.toUpperCase() === "ADDRESS" && (
                      <div className="text-center px-2 flex items-center justify-center h-full">
                        {userData.address}
                      </div>
                    )}

                    {element.elementType?.toUpperCase() === "PHONE" && (
                      <div className="text-center px-2 flex items-center justify-center h-full">
                        {userData.phone}
                      </div>
                    )}

                    {element.elementType?.toUpperCase() === "EMAIL" && (
                      <div className="text-center px-2 break-all flex items-center justify-center h-full">
                        {userData.email}
                      </div>
                    )}
                  </div>
                </Rnd>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
