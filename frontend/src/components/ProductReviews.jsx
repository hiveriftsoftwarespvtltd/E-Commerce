// components/ProductReviews.jsx
import React from "react";

export default function ProductReviews({ reviews = [] }) {
  if (!reviews.length) {
    return <p className="text-gray-500">No reviews yet</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((rev, i) => (
        <div key={i} className="border-b pb-4">
          
          {/* Header */}
          <div className="flex justify-between items-center">
            <p className="font-semibold">{rev.userName}</p>
            <span className="text-sm text-gray-500">{rev.date}</span>
          </div>

          {/* Rating */}
          <div className="text-yellow-500 text-sm">
            {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
          </div>

          {/* Review Text */}
          <p className="text-gray-700 text-sm mt-1">{rev.review}</p>

          {/* Images */}
          {rev.images?.length > 0 && (
            <div className="flex gap-2 mt-2">
              {rev.images.slice(0, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  className="w-14 h-14 object-cover rounded"
                  alt="review"
                />
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="text-xs text-gray-500 mt-2 flex gap-3">
            {rev.verified && <span className="text-green-600">✔ Verified</span>}
            <span>👍 {rev.likes}</span>
          </div>
        </div>
      ))}
    </div>
  );
}