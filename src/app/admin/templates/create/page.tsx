import { Suspense } from "react";
import CreateTemplateContent from "./CreateTemplateContent";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-100 px-6 py-8 text-sm text-gray-500">
          Loading...
        </div>
      }
    >
      <CreateTemplateContent />
    </Suspense>
  );
}
