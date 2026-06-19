"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  businessName: string;
  email: string;
  mobile: string;
  address: string;
  logoUrl: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `             query {
  users {
    id
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

      if (result.errors) {
        console.error(result.errors);
        return;
      }

      setUsers(result.data?.users || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
        mutation DeleteUser($id: ID!) {
          deleteUser(id: $id)
        }
      `,
          variables: {
            id,
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        alert(result.errors[0]?.message || "Failed to delete user");
        return;
      }

      setUsers((prev) => prev.filter((user) => user.id !== id));

      alert("User deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow border p-6">
      {" "}
      <div className="flex justify-between items-center mb-6">
        {" "}
        <h1 className="text-3xl font-bold">Users Management </h1>
        <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-semibold">
          Total Users: {users.length}
        </div>
      </div>
      {loading ? (
        <div className="text-center py-10">Loading Users...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3">Logo</th>

                <th className="border p-3">Business Name</th>

                <th className="border p-3">Email</th>

                <th className="border p-3">Mobile</th>

                <th className="border p-3">Address</th>

                <th className="border p-3">Role</th>

                <th className="border p-3">Created</th>

                <th className="border p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border p-3">
                    <img
                      src={user.logoUrl}
                      alt={user.businessName}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>

                  <td className="border p-3">{user.businessName}</td>

                  <td className="border p-3">{user.email}</td>

                  <td className="border p-3">{user.mobile}</td>

                  <td className="border p-3 max-w-xs">{user.address}</td>

                  <td className="border p-3">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                      {user.role}
                    </span>
                  </td>

                  <td className="border p-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="border p-3">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center p-8">
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
