// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useAuth } from "./UserContext";
import { api } from "@/utils/axios-interceptor";

const CartContext = createContext();


// ✅ Format backend cart → frontend
const formatCart = (cartData) => {
  if (!cartData?.items) return [];

  return cartData.items.map((item) => {
    const product = item.product;

    return {
      _id: product?._id || item.product, // fallback if not populated
      title: product?.name || "",
      price: item.price || item.product.price,
      quantity: item.quantity,
      salesPrice:item.salesPrice || item.product.salesPrice,
      image: product?.imageUrls?.[0] || "",
    };
  });
};


// ✅ API CALLS
const initializeCart = async (userId) => {
  try {
    const res = await api.get(`/cart/${userId}`);
    return res?.data?.success ? res.data.result : null;
  } catch (err) {
    console.log("Initialize Cart Error", err);
    return null;
  }
};

const addToCartApi = async (payload) => {
  try {
    const res = await api.post(`/cart/add`, payload);
    return res?.data?.success ? res.data.result : null;
  } catch (err) {
    console.log("Add Cart Error", err);
    return null;
  }
};

const updateCartApi = async (payload) => {
  try {
    const res = await api.patch(`/cart/update`, payload);
    return res?.data?.success ? res.data.result : null;
  } catch (err) {
    console.log("Update Cart Error", err);
    return null;
  }
};

const removeCartItemApi = async (payload) => {
  try {
    const res = await api.delete(`/cart/remove`, {
      data: payload,
    });
    return res?.data?.success ? res.data.result : null;
  } catch (err) {
    console.log("Remove Cart Error", err);
    return null;
  }
};

const clearCartApi = async (userId) => {
  try {
    const res = await api.delete(`/cart/clear/${userId}`);
    return res?.data?.success ? res.data.result : null;
  } catch (err) {
    console.log("Clear Cart Error", err);
    return null;
  }
};


// ✅ CONTEXT
export function CartProvider({ children }) {
  const { user } = useAuth();

  const [cart, setCart] = useState([]);

  // ✅ Sync localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Load cart on login
  useEffect(() => {
    if (!user?.id) return;

    const loadCart = async () => {
      const backendCart = await initializeCart(user.id);
      console.log("Backend Cart",backendCart)

      setCart(formatCart(backendCart));
    };

    loadCart();
  }, [user]);


  // ➕ ADD ITEM
  const addItem = async (product) => {
    console.log("Add To Cart",product)
    if (!user?.id) return;

    const updated = await addToCartApi({
      userId: user.id,
      productId: product._id,
      quantity: 1,
    });

    if (updated) {
      setCart(formatCart(updated));
    }
  };


  // ➖ DECREASE ITEM
  const decreaseItem = async (product) => {
    console.log()
    if (!user?.id) return;

    const existing = cart.find((i) => i._id === product._id);
    if (!existing) return;

    const updated = await updateCartApi({
      userId: user.id,
      productId: product._id,
      quantity: existing.quantity - 1,
    });

    if (updated) {
      setCart(formatCart(updated));
    }
  };


  // ❌ REMOVE ITEM
  const removeItem = async (productId) => {
    if (!user?.id) return;

    const updated = await removeCartItemApi({
      userId: user.id,
      productId,
    });

    if (updated) {
      setCart(formatCart(updated));
    }
  };


  // 🧹 CLEAR CART
  const clearCart = async () => {
    if (!user?.id) return;

    await clearCartApi(user.id);
    setCart([]);
  };


  // ✅ TOTALS
const totalQuantity = cart.reduce((a, i) => a + i.quantity, 0);
const totalAmount = cart.reduce((s, i) => s + i.price * i.quantity, 0);

// ✅ CART MAP (add here)
const cartMap = useMemo(
  () => new Map(cart.map((item) => [item._id, item])),
  [cart]
);


  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        cartMap,
        decreaseItem,
        clearCart,
        totalQuantity,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


// ✅ HOOK
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};