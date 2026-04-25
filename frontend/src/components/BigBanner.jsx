import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE from "../config";
import Banner4 from "../assets/hero-banner-4.png"
// import Banner5 from "../assets/hero-banner-5.png"

const BigBanner = () => {
  const navigate = useNavigate();
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch banners from backend
  const fetchBanner = async () => {
    try {
      const res = await fetch(`${BASE.BASE_URL}/banner/getAllBanner`);
      const data = await res.json();

      if (res.ok && data.result.length > 0) {
        // 👉 Choose FIRST banner (or you can choose filtered banner type)
        const b = data.result[0];

        setBanner({
          id: b._id,
          title: b.title,
          linkUrl: b.linkUrl,
          img: encodeURI(b.image),
        });
      }
    } catch (error) {
      console.log("Banner fetch error:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  if (loading) return null; // or loading skeleton

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-[1440px] px-4">

        <div
          onClick={() => banner?.linkUrl && navigate(banner.linkUrl)}
          className="block w-full overflow-hidden cursor-pointer 
                     transition-all duration-300 hover:scale-[1.02] active:scale-95"
        >
          <div
            className="relative w-full rounded-xl shadow"
            style={{ paddingTop: "56.25%" }}
          >
            <img
              src={Banner4 || banner?.img}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-banner.png"; // fallback
              }}
              alt={banner?.title}
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default BigBanner;
