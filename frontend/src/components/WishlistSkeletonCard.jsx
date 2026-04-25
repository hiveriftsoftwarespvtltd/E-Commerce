import React from "react";

export default function WishlistSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="h-6 w-40 bg-gray-300 rounded mb-6 animate-pulse" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-3 rounded-2xl animate-pulse space-y-3"
          >
            <div className="h-[200px] bg-gray-300 rounded-xl" />
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
            <div className="h-10 bg-gray-300 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}