export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 space-y-8 px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Placeholder */}
      <div className="h-16 w-1/3 bg-gray-200 rounded-lg animate-pulse"></div>
      
      {/* Stats Cards Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
      
      {/* Module Cards Placeholder */}
      <div>
        <div className="h-10 w-1/4 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
