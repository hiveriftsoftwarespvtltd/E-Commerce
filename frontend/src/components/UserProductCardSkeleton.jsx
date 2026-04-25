import React from "react";
import { Skeleton } from "./ui/skeleton";


const UserProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border p-3">
      
      {/* Image */}
      <Skeleton className="w-full h-[200px] rounded-xl" />

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3">
        <Skeleton className="w-10 h-10 rounded-md" />
        <Skeleton className="w-10 h-10 rounded-md" />
        <Skeleton className="w-10 h-10 rounded-md" />
      </div>

      {/* Title */}
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[60%]" />
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mt-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-10" />
      </div>

      {/* Button */}
      <Skeleton className="mt-4 h-10 w-full rounded-lg" />
    </div>
  );
};

export default UserProductCardSkeleton;