export default function UserDashboard() {
return ( <div className="min-h-screen bg-slate-100"> <div className="p-8"> <h1 className="text-3xl font-bold">
User Dashboard </h1>


    <p className="mt-4 text-gray-600">
      Welcome to Festival Poster
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg">
          Business Profile
        </h2>

        <p className="text-gray-500 mt-2">
          Manage your business details
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg">
          Festival Posts
        </h2>

        <p className="text-gray-500 mt-2">
          Create festival posts
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg">
          Downloads
        </h2>

        <p className="text-gray-500 mt-2">
          Download generated posts
        </p>
      </div>
    </div>
  </div>
</div>


);
}
