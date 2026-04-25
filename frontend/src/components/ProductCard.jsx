import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();  

  return (
    <div className="p-4 border rounded">
      <img src={product.image} />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>

      <button
        onClick={() => addItem(product)}
        className="mt-2 p-2 bg-black text-white rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
