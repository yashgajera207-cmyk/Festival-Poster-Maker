"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Template {
id: string;
title: string;
backgroundImage: string;
}

export default function ElementsPage() {
const [templates, setTemplates] =
useState<Template[]>([]);

useEffect(() => {
fetchTemplates();
}, []);

async function fetchTemplates() {
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
query: `               query {
                templates {
                  id
                  title
                  backgroundImage
                }
              }
            `,
}),
}
);


  const result =
    await response.json();

  setTemplates(
    result.data?.templates || []
  );
} catch (error) {
  console.error(error);
}


}

return ( <div className="space-y-6">


  <div>
    <h1 className="text-3xl font-bold">
      Template Elements
    </h1>

    <p className="text-slate-500">
      Select a template and edit its layout
    </p>
  </div>

  <div className="bg-white rounded-2xl border shadow overflow-hidden">

    <table className="w-full">

      <thead className="bg-slate-50 border-b">

        <tr>
          <th className="p-4 text-left">
            Preview
          </th>

          <th className="p-4 text-left">
            Template Name
          </th>

          <th className="p-4 text-center">
            Action
          </th>
        </tr>

      </thead>

      <tbody>

        {templates.map(
          (template) => (
            <tr
              key={template.id}
              className="border-b hover:bg-slate-50"
            >

              <td className="p-4">
                <img
                  src={
                    template.backgroundImage
                  }
                  alt=""
                  className="w-48 h-28 object-cover rounded-lg border"
                />
              </td>

              <td className="p-4 font-semibold text-lg">
                {template.title}
              </td>

              <td className="p-4 text-center">

                <Link
                  href={`/admin/elements/${template.id}`}
                  className="inline-flex px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                >
                  Open Editor
                </Link>

              </td>

            </tr>
          )
        )}

        {templates.length === 0 && (
          <tr>
            <td
              colSpan={3}
              className="text-center p-10"
            >
              No Templates Found
            </td>
          </tr>
        )}

      </tbody>

    </table>

  </div>

</div>


);
}
