export default function AdminDashboard() {
return ( <div className="min-h-screen bg-slate-100"> <div className="p-8"> <h1 className="text-3xl font-bold">
Admin Dashboard </h1>

```
    <p className="mt-2 text-gray-600">
      Welcome Admin
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold">
          Total Users
        </h2>

        <p className="text-3xl font-bold mt-3">
          0
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold">
          Festival Templates
        </h2>

        <p className="text-3xl font-bold mt-3">
          0
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold">
          Categories
        </h2>

        <p className="text-3xl font-bold mt-3">
          0
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold">
          Generated Posts
        </h2>

        <p className="text-3xl font-bold mt-3">
          0
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6 mt-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Festival Management
        </h2>

        <ul className="space-y-3">
          <li>
            Upload Festival Template
          </li>

          <li>
            Edit Festival Template
          </li>

          <li>
            Delete Festival Template
          </li>

          <li>
            Manage Categories
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          User Management
        </h2>

        <ul className="space-y-3">
          <li>
            View Users
          </li>

          <li>
            Activate User
          </li>

          <li>
            Block User
          </li>

          <li>
            Manage Subscription
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

);
}
