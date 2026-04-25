import React from "react";
import { Skeleton } from "../components/ui/skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT - Images */}
        <div className="lg:col-span-4 space-y-3">
          <Skeleton className="w-full h-[350px] rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="w-16 h-16 rounded-md" />
            <Skeleton className="w-16 h-16 rounded-md" />
            <Skeleton className="w-16 h-16 rounded-md" />
          </div>
        </div>

        {/* CENTER - Details */}
        <div className="lg:col-span-5 bg-white p-6 rounded-lg shadow space-y-4">
          <Skeleton className="h-6 w-[70%]" />
          <Skeleton className="h-5 w-[40%]" />

          <div className="flex gap-3">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-12" />
          </div>

          <Skeleton className="h-4 w-[30%]" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>

        {/* RIGHT - Actions */}
        <div className="lg:col-span-3 bg-white p-6 shadow space-y-4">
          <Skeleton className="h-7 w-24" />

          <div className="flex gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-10 w-10" />
          </div>

          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>

      {/* Description */}
      <div className="max-w-7xl mx-auto mt-6 bg-white p-6 rounded-lg shadow space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>

      {/* Reviews */}
      <div className="max-w-7xl mx-auto mt-6 bg-white p-6 rounded-lg shadow space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;