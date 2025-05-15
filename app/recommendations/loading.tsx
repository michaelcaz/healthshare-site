export default function RecommendationsLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-32 md:pt-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-6"></div>
      <p className="text-lg text-gray-700 font-medium">Loading your recommendations…</p>
    </div>
  );
} 