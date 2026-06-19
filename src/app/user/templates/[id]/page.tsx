"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PosterEditorPage() {
  const params = useParams();
  const templateId = params.id as string;

  const [template, setTemplate] =
    useState<any>(null);

  const [form, setForm] =
    useState({
      businessName: "",
      address: "",
      phone: "",
      email: "",
      logoUrl: "",
    });

  useEffect(() => {
    fetchTemplate();
  }, []);

  async function fetchTemplate() {
    try {
      const response = await fetch(
        "/api/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
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
            variables: {
              id: templateId,
            },
          }),
        }
      );

      const result =
        await response.json();

      setTemplate(
        result.data?.template
      );
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  }

  async function generatePoster() {
    alert(
      "Poster Generated Successfully"
    );
  }

  if (!template) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Form */}

      <div className="col-span-3 bg-white border rounded-xl p-5">
        <h2 className="text-xl font-bold mb-5">
          Business Details
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            value={
              form.businessName
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={
              handleChange
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={
              handleChange
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={
              handleChange
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="logoUrl"
            placeholder="Logo URL"
            value={form.logoUrl}
            onChange={
              handleChange
            }
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={
              generatePoster
            }
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"
          >
            Generate Poster
          </button>
        </div>
      </div>

      {/* Preview */}

      <div className="col-span-9">
        <div className="relative border rounded-xl overflow-hidden bg-white">
          <img
            src={
              template.backgroundImage
            }
            alt=""
            className="w-full"
          />

          {/* Logo */}

          {form.logoUrl && (
            <img
              src={
                form.logoUrl
              }
              alt=""
              className="absolute top-6 left-6 w-28 h-28 object-contain"
            />
          )}

          {/* Business Name */}

          <div className="absolute top-8 left-40 text-4xl font-bold text-white">
            {
              form.businessName
            }
          </div>

          {/* Address */}

          <div className="absolute bottom-24 left-10 text-white text-lg">
            {form.address}
          </div>

          {/* Phone */}

          <div className="absolute bottom-16 left-10 text-white text-lg">
            {form.phone}
          </div>

          {/* Email */}

          <div className="absolute bottom-8 left-10 text-white text-lg">
            {form.email}
          </div>
        </div>
      </div>
    </div>
  );
}