"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ImageIcon,
  ShieldCheck,
  Loader2,
  Save,
  User,
} from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    email: "",
    mobile: "",
    address: "",
    logoUrl: "",
    role: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const token = localStorage.getItem("accessToken");

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
              role
            }
          }
        `,
      }),
    });

    const result = await response.json();
    const user = result.data?.me;

    if (user) {
      setForm(user);
    }

    setLoading(false);
  }

  async function saveProfile() {
    try {
      setSaving(true);

      const token = localStorage.getItem("accessToken");

      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            mutation UpdateProfile(
              $input:UpdateProfileInput!
            ){
              updateProfile(
                input:$input
              ){
                id
              }
            }
          `,
          variables: {
            input: {
              businessName: form.businessName,
              mobile: form.mobile,
              address: form.address,
              logoUrl: form.logoUrl,
            },
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        alert(result.errors[0].message);
        return;
      }

      alert("Profile Updated Successfully");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="text-orange-500 animate-spin" />
          <p className="text-sm text-slate-400 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Page heading */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0">
            <User size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">My Profile</h1>
            <p className="text-sm text-slate-500">Manage your business information</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Cover / avatar header */}
          <div className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 px-8 pt-10 pb-16">
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full ring-4 ring-white shadow-lg overflow-hidden bg-white">
                {form.logoUrl ? (
                  <img src={form.logoUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-orange-300">
                    <Building2 size={36} />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-white mt-4">
                {form.businessName || "Your Business"}
              </h2>
              {form.role && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mt-2">
                  <ShieldCheck size={12} />
                  {form.role}
                </span>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="px-8 pb-8 -mt-6 relative">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  <Building2 size={12} /> Business Name
                </label>
                <input
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  placeholder="Your business name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  <Mail size={12} /> Email
                </label>
                <input
                  value={form.email}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  <Phone size={12} /> Mobile
                </label>
                <input
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  placeholder="+91 00000 00000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  <MapPin size={12} /> Address
                </label>
                <input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Street, City, State"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  <ImageIcon size={12} /> Logo URL
                </label>
                <input
                  value={form.logoUrl}
                  onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              <hr className="border-slate-100 !my-5" />

              <button
                onClick={saveProfile}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl shadow transition-colors"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}