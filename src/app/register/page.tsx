"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import LogoUpload from "@/components/upload/LogoUpload";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const [form, setForm] = useState({
    businessName: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  // Field-specific errors
  const [fieldErrors, setFieldErrors] = useState<{
    businessName?: string;
    email?: string;
    mobile?: string;
    address?: string;
    logo?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const errors: typeof fieldErrors = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!form.businessName.trim()) {
      errors.businessName = "Business name is required";
      isValid = false;
    }

    if (!emailRegex.test(form.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!mobileRegex.test(form.mobile)) {
      errors.mobile = "Mobile number must be exactly 10 digits";
      isValid = false;
    }

    if (!form.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!logoUrl) {
      errors.logo = "Please upload your business logo";
      isValid = false;
    }

    if (!passwordRegex.test(form.password)) {
      errors.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character";
      isValid = false;
    }

    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFieldErrors(errors);
    setError(isValid ? "" : "Please fix the errors above");
    return isValid;
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
              businessName: form.businessName,
              email: form.email,
              mobile: "+91" + form.mobile,
              address: form.address,
              logoUrl,
              password: form.password,
            },
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      // Show success and redirect
      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100/80">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Business Registration</h1>
        <p className="text-center text-gray-500 text-sm mb-8">Create your account and start creating festival posts</p>

        <form onSubmit={submit} className="space-y-5">
          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <input
              type="text"
              placeholder="Enter your business name"
              className={`w-full border text-black ${fieldErrors.businessName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'} rounded-xl p-3 focus:outline-none focus:ring-2 transition`}
              value={form.businessName}
              onChange={(e) => {
                setForm({ ...form, businessName: e.target.value });
                if (fieldErrors.businessName) setFieldErrors({ ...fieldErrors, businessName: undefined });
              }}
            />
            {fieldErrors.businessName && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {fieldErrors.businessName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className={`w-full border text-black ${fieldErrors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'} rounded-xl p-3 focus:outline-none focus:ring-2 transition`}
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
              }}
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Mobile with country code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <div className="flex">
              <div className="bg-gray-100 border border-r-0 border-gray-300 px-4 py-3 rounded-l-xl flex items-center text-gray-600">
                +91
              </div>
              <input
                type="text"
                maxLength={10}
                placeholder="9876543210"
                className={`w-full border text-black ${fieldErrors.mobile ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'} rounded-r-xl p-3 focus:outline-none focus:ring-2 transition`}
                value={form.mobile}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setForm({ ...form, mobile: val });
                  if (fieldErrors.mobile) setFieldErrors({ ...fieldErrors, mobile: undefined });
                }}
              />
            </div>
            {fieldErrors.mobile && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {fieldErrors.mobile}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
            <textarea
              rows={2}
              placeholder="Enter your business address"
              className={`w-full border text-black ${fieldErrors.address ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'} rounded-xl p-3 focus:outline-none focus:ring-2 transition`}
              value={form.address}
              onChange={(e) => {
                setForm({ ...form, address: e.target.value });
                if (fieldErrors.address) setFieldErrors({ ...fieldErrors, address: undefined });
              }}
            />
            {fieldErrors.address && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {fieldErrors.address}
              </p>
            )}
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Logo</label>
            <LogoUpload onUploadSuccess={(url) => {
              setLogoUrl(url);
              if (fieldErrors.logo) setFieldErrors({ ...fieldErrors, logo: undefined });
            }} />
            {fieldErrors.logo && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {fieldErrors.logo}
              </p>
            )}
          </div>

          {/* Logo Preview */}
          {logoUrl && (
            <div className="flex justify-center">
              <div className="relative w-24 h-24 rounded-lg border-2 border-orange-200 overflow-hidden">
                <Image src={logoUrl} alt="Logo" fill className="object-cover" />
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              className={`w-full border text-black ${fieldErrors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'} rounded-xl p-3 focus:outline-none focus:ring-2 transition`}
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: undefined });
              }}
            />
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-start gap-1">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{fieldErrors.password}</span>
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              className={`w-full border text-black ${fieldErrors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'} rounded-xl p-3 focus:outline-none focus:ring-2 transition`}
              value={form.confirmPassword}
              onChange={(e) => {
                setForm({ ...form, confirmPassword: e.target.value });
                if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: undefined });
              }}
            />
            {fieldErrors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* General Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}