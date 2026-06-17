"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

export default function AdminGuard({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }

    setLoading(false);
  }, [role, router]);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}