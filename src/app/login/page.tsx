"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
const router = useRouter();

const [form, setForm] =
useState({
email: "",
password: "",
});

const [loading, setLoading] =
useState(false);

const [error, setError] =
useState("");

async function submit(
e: React.FormEvent
) {
e.preventDefault();


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
            mutation Login($input: LoginInput!) {
              login(input: $input) {
                accessToken
                refreshToken

                user {
                  id
                  businessName
                  email
                  role
                }
              }
            }
          `,
          variables: {
            input: form,
          },
        }),
      }
    );

  const result =
    await response.json();

  if (
    result.errors
  ) {
    throw new Error(
      result.errors[0].message
    );
  }

  const loginData =
    result.data.login;

  document.cookie =
    `accessToken=${loginData.accessToken}; path=/`;

  if (
    loginData.user.role ===
    "ADMIN"
  ) {
    router.push(
      "/admin/dashboard"
    );
  } else {
    router.push(
      "/user/dashboard"
    );
  }
} catch (error) {
  if (
    error instanceof Error
  ) {
    setError(
      error.message
    );
  }
} finally {
  setLoading(false);
}


}

return ( <div className="min-h-screen flex items-center justify-center bg-slate-100"> <form
     onSubmit={submit}
     className="bg-white shadow-lg rounded-xl p-8 w-[400px] space-y-4"
   > <h1 className="text-3xl font-bold text-center">
Login </h1>


    <input
      type="email"
      placeholder="Email"
      className="border p-3 w-full rounded"
      value={form.email}
      onChange={(e) =>
        setForm({
          ...form,
          email:
            e.target.value,
        })
      }
    />

    <input
      type="password"
      placeholder="Password"
      className="border p-3 w-full rounded"
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

    {error && (
      <p className="text-red-500 text-sm">
        {error}
      </p>
    )}

    <button
      type="submit"
      disabled={loading}
      className="bg-black text-white p-3 w-full rounded"
    >
      {loading
        ? "Logging in..."
        : "Login"}
    </button>
  </form>
</div>

);
}
