export function ProductSkeleton() {
  return (
    <div className="border rounded shadow p-2 animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded"></div>
      <div className="mt-2 space-y-2">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
