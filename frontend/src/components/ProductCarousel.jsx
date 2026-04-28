import { useCart } from "../context/CartContext";
import { mockProducts } from "./mockData";
import productData from "../../products.json";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { useAuth } from "@/context/UserContext";
import AuthModal from "./AuthModal";

function ProductCard({ product }) {
const { cart, addItem, removeItem,decreaseItem,cartMap } = useCart();
const {user,isLoggedIn} = useAuth()
const [showAuthModal, setShowAuthModal] = useState(false);

const cartItem = cartMap.get(product._id);
const quantity = cartItem?.quantity || 0;
const navigate = useNavigate()


  const discount =
    product.price > product.salesPrice
      ? Math.round(
          ((product.price - product.salesPrice) / product.price) * 100
        )
      : 0;
    
  const handleAddToCart = async(product)=>{
    try {
      if(isLoggedIn){
         addItem(product)
         return
      }else{
        setShowAuthModal(true)
        return
      }
    } catch (error) {
      console.log("Handle Add To Cart Error",error)
    }
  }

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-bold-accent-1">
      {/* <a href={`/product/${product.id}`} className="block"> */}
        <div className="aspect-square relative overflow-hidden bg-gray-100 cursor-pointer" onClick={()=>navigate(`/products/${product._id}`)}>
          <img
            src={product?.imageUrls[0]}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "https://placehold.co/600x600?text=No+Image";
            }}
          />

          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
      {/* </a> */}

      <div className="p-4">
        <h3 className="text-sm font-medium  line-clamp-2 mb-2">
          <a href={`/products/${product.id}`} className="hover:text-blue-600">
            {product.title || product?.name}
          </a>
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold ">₹{product.salesPrice}</span>
            {product.salesPrice > product.price && (
              <span className="text-sm text-light-accent-1 line-through ml-2">
                ₹{product?.price}
              </span>
            )}
          </div>

          {/* ⭐ Flipkart style add / counter UI */}
          {quantity === 0 ? (
            <button
              onClick={() => handleAddToCart(product)}
              disabled={product.stock <= 0}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer ${
                product.stock > 0
                  ? "bg-bold-accent-1 text-white hover:bg-accent"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-bold-accent-1 text-white px-2 py-1 rounded">
              <button
                className="px-2 text-lg"
                onClick={() => decreaseItem(product)}
              >
                -
              </button>

              <span className="text-sm font-semibold">{quantity}</span>

              <button
                className="px-2 text-lg"
                onClick={() => addItem(product)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
      {showAuthModal && (
  <AuthModal onClose={() => setShowAuthModal(false)} />
)}
    </div>
  );
}

export default function ProductCarousel() {
  const [products,setProducts] = useState([])

  const {allWebsiteProducts} = useSearch()
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Best Sellers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allWebsiteProducts?.slice(0,12).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
