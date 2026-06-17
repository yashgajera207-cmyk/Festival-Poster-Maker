"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoUpload from "@/components/upload/LogoUpload";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [logoUrl, setLogoUrl] =
    useState("");

  const [form, setForm] =
    useState({
      businessName: "",
      email: "",
      mobile: "",
      address: "",
      password: "",
      confirmPassword: "",
    });

  const validateForm = () => {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const mobileRegex =
      /^[0-9]{10}$/;

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!form.businessName.trim()) {
      setError(
        "Business name is required"
      );
      return false;
    }

    if (!emailRegex.test(form.email)) {
      setError("Invalid email address");
      return false;
    }

    if (!mobileRegex.test(form.mobile)) {
      setError(
        "Mobile number must be 10 digits"
      );
      return false;
    }

    if (!form.address.trim()) {
      setError("Address is required");
      return false;
    }

    if (!logoUrl) {
      setError(
        "Business logo is required"
      );
      return false;
    }

    if (
      !passwordRegex.test(
        form.password
      )
    ) {
      setError(
        "Password must contain uppercase, lowercase, number and special character"
      );
      return false;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );
      return false;
    }

    return true;
  };

  async function submit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response =
        await fetch(
          "/api/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              query: `
                mutation Register($input: RegisterInput!) {
                  register(input: $input) {
                    user {
                      id
                      email
                    }
                  }
                }
              `,
              variables: {
                input: {
                  businessName:
                    form.businessName,
                  email:
                    form.email,
                  mobile:
                    "+91" +
                    form.mobile,
                  address:
                    form.address,
                  logoUrl,
                  password:
                    form.password,
                },
              },
            }),
          }
        );

      const result =
        await response.json();

      if (result.errors) {
        throw new Error(
          result.errors[0].message
        );
      }

      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Registration failed"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Business Registration
        </h1>

        <form
          onSubmit={submit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Business Name"
            className="w-full border p-3 rounded"
            value={
              form.businessName
            }
            onChange={(e) =>
              setForm({
                ...form,
                businessName:
                  e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-3 rounded"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
            }
          />

          <div className="flex">
            <div className="bg-gray-100 border border-r-0 px-4 flex items-center rounded-l">
              +91
            </div>

            <input
              type="text"
              maxLength={10}
              placeholder="Mobile Number"
              className="w-full border p-3 rounded-r"
              value={
                form.mobile
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile:
                    e.target.value.replace(
                      /\D/g,
                      ""
                    ),
                })
              }
            />
          </div>

          <textarea
            rows={3}
            placeholder="Business Address"
            className="w-full border p-3 rounded"
            value={
              form.address
            }
            onChange={(e) =>
              setForm({
                ...form,
                address:
                  e.target.value,
              })
            }
          />

          <div>
            <label className="block mb-2 font-medium">
              Business Logo
            </label>

            <LogoUpload
              onUploadSuccess={(
                url
              ) => {
                setLogoUrl(url);
              }}
            />
          </div>

          {logoUrl && (
            <div className="flex justify-center">
              <Image
                src={logoUrl}
                alt="Logo"
                width={120}
                height={120}
                className="rounded-lg border"
              />
            </div>
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            value={
              form.password
            }
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-3 rounded"
            value={
              form.confirmPassword
            }
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword:
                  e.target.value,
              })
            }
          />

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded hover:bg-gray-800"
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}