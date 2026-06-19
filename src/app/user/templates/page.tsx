"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Template {
  id: string;
  title: string;
  thumbnailImage: string;
  category: {
    id: string;
    name: string;
  };
}

export default function UserTemplatesPage() {
  const [templates, setTemplates] =
    useState<Template[]>([]);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const response =
        await fetch("/api/graphql", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                categories {
                  id
                  name
                }

                templates {
                  id
                  title
                  thumbnailImage

                  category {
                    id
                    name
                  }
                }
              }
            `,
          }),
        });

      const result =
        await response.json();

      setCategories(
        result.data?.categories || []
      );

      setTemplates(
        result.data?.templates || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredTemplates =
    templates.filter((template) => {
      const categoryMatch =
        selectedCategory === ""
          ? true
          : template.category.id ===
            selectedCategory;

      const searchMatch =
        template.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        categoryMatch &&
        searchMatch
      );
    });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Festival Templates
          </h1>

          <p className="text-slate-500 mt-2">
            Choose a template and
            generate your poster
            instantly.
          </p>
        </div>

        {/* Filters */}

        <div className="bg-white rounded-2xl border p-4 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search template..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl pl-10 pr-4 py-3"
              />
            </div>

            <div className="relative">
              <Filter
                size={18}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <select
                value={
                  selectedCategory
                }
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl pl-10 pr-4 py-3"
              >
                <option value="">
                  All Categories
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={
                        category.id
                      }
                      value={
                        category.id
                      }
                    >
                      {
                        category.name
                      }
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Loading */}

        {loading && (
          <div className="grid md:grid-cols-4 gap-6">
            {[...Array(8)].map(
              (_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl h-80 animate-pulse"
                />
              )
            )}
          </div>
        )}

        {/* Empty State */}

        {!loading &&
          filteredTemplates.length ===
            0 && (
            <div className="bg-white rounded-2xl border p-10 text-center">
              <h2 className="text-xl font-semibold">
                No Templates Found
              </h2>

              <p className="text-slate-500 mt-2">
                Try another search
                or category.
              </p>
            </div>
          )}

        {/* Templates Grid */}

        {!loading &&
          filteredTemplates.length >
            0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map(
                (template) => (
                  <div
                    key={
                      template.id
                    }
                    className="bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition"
                  >
                    <div className="aspect-[4/5] bg-slate-100 overflow-hidden">
                      <img
                        src={
                          template.thumbnailImage
                        }
                        alt={
                          template.title
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                        {
                          template
                            .category
                            .name
                        }
                      </span>

                      <h3 className="font-semibold text-lg mt-3">
                        {
                          template.title
                        }
                      </h3>

                      <Link
                        href={`/user/templates/${template.id}`}
                        className="mt-4 block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl"
                      >
                        Generate Poster
                      </Link>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
      </div>
    </div>
  );
}