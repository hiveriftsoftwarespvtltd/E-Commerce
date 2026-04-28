import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Suggestions = ({ items = [] }) => {
  const scrollRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = 300;
    

    
    if (!current) return;

    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // ✅ Auto Scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 250,
          behavior: "smooth",
        });
      }
    }, 2500); // speed

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      

    >
      {/* Header */}
      <h2 className="text-xl font-semibold mb-3 px-2">Suggestions</h2>

      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:scale-110 transition"
      >
        <ChevronLeft className="cursor-pointer text-accent" />
      </button>

      {/* Slider */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-8"
      >
        {items.map((item) => (
          <div
            key={item.id}
            onClick={()=>navigate(`/products/${item._id}`)}
            className="min-w-[220px] max-w-[220px] bg-white border border-accent rounded-lg p-3 flex-shrink-0 transition duration-300 hover:shadow-lg  cursor-pointer"
          >
            
            <div className="relative overflow-hidden rounded-md ">
              <img
                src={item.imageUrls?.[0]}
                alt={item.name}
                className="w-full h-40 object-cover transition duration-300 hover:scale-110"
              />

              {/* Favourite */}
              {/* {item.isFavourite && (
                <Heart
                  size={18}
                  className="absolute top-2 right-2 text-accent fill-accent"
                />
              )} */}

              {/* Discount */}
              {/* <span className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-1 rounded">
                {item.discount}
              </span> */}
            </div>

            {/* Content */}
            <div className="mt-2">
              <h3 className="text-sm font-medium line-clamp-2">
                {item.name}
              </h3>

              <p className="text-xs text-gray-500 line-clamp-2">
                {item.description}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-base font-semibold">
                  ₹{item.salesPrice}
                </span>
                <span className="text-sm line-through text-gray-400">
                  ₹{item.price}
                </span>
              </div>

              {/* Delivery */}
              <p className="text-xs text-accent mt-1">
                Delivery in {item.estimatedDeliveryDays  || "7 Days"} days
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:scale-110 transition"
      >
        <ChevronRight className="cursor-pointer text-accent"/>
      </button>
    </div>
  );
};

export default Suggestions;