import React, { useState, useEffect } from "react";
import { X, Plus, Upload } from "lucide-react";
import BASE from "../../config";
import fallbackImage from "../../assets/cupsets.png";

const CREATE_URL = `${BASE.PRODUCT_BASE}/product-detail/AddProduct`;
const GET_ALL_URL = `${BASE.PRODUCT_BASE}/product-detail`;
const UPDATE_URL = `${BASE.PRODUCT_BASE}/product-detail`;
const DELETE_URL = `${BASE.PRODUCT_BASE}/product-detail`;

export default function Products() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===========================================
  // FETCH CATEGORY & SUBCATEGORY
  // ===========================================
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const searchProducts = () => {
    if (!searchName.trim()) {
      loadProducts();
      return;
    }

    // name ko lowercase karo for flexible search
    const text = searchName.toLowerCase();

    // client-side search (perfect)
    const filtered = products.filter((p) =>
      p.Name.toLowerCase().includes(text)
    );

    setProducts(filtered);
  };

  useEffect(() => {
    fetch(`${BASE.PRODUCT_BASE}/category/getAllCategory`)
      .then((res) => res.json())
      .then((data) => setCategories(data.result || []));
  }, []);

  useEffect(() => {
    fetch(`${BASE.PRODUCT_BASE}/subcategory/getAllSubCategory`)
      .then((res) => res.json())
      .then((data) => setSubcategories(data.result || []));
  }, []);

  // ===========================================
  // LOAD ALL PRODUCTS
  // ===========================================
  const loadProducts = () => {
    fetch(GET_ALL_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("GET RESPONSE,,,,,,,,,,,:", data);
        if (Array.isArray(data.data)) {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // FORM STATES
  const [form, setForm] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    salesPrice: "",
    stock: "",
    categoryId: "",
    // subcategoryId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===========================================
  // IMAGE UPLOAD
  // ===========================================
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...fileURLs]);
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // ===========================================
  // CREATE PRODUCT
  // ===========================================
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", form.name);
    formData.append("sku", form.sku);
    formData.append("description", form.description);
    formData.append("price", Number(form.price));
    formData.append("salesPrice", Number(form.salesPrice));
    formData.append("stock", Number(form.stock));
    formData.append("categoryId", form.categoryId);
    // formData.append("subcategoryId", form.subcategoryId);

    images.forEach((img) => {
      formData.append("images", img.file);
    });

    const res = await fetch(CREATE_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.message === "Product created successfully") {
      alert("Product created successfully!");
      setShowAddModal(false);
      loadProducts();
    } else {
      alert("Failed to create product");
    }
  };

  // ===========================================
  // DELETE PRODUCT
  // ===========================================
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await fetch(`${DELETE_URL}/${id}`, {
      method: "DELETE",
    });

    loadProducts();
  };

  // ===========================================
  // VIEW PRODUCT
  // ===========================================
  const handleViewProduct = (p) => setViewProduct(p);

  // ===========================================
  // EDIT PRODUCT
  // ===========================================
  const handleEditProduct = (p) => {
    setEditProduct(p);

    setForm({
      name: p.name,
      sku: p.sku,
      description: p.description,
      price: p.price,
      salesPrice: p.salesPrice,
      stock: p.stock,
      categoryId: p.categoryId, // ⭐ Add this
      // subcategoryId: p.subcategoryId, // ⭐ Add this
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      sku: form.sku,
      description: form.description,
      price: Number(form.price),
      salesPrice: Number(form.salesPrice),
      stock: Number(form.stock),
    };

    const res = await fetch(`${UPDATE_URL}/${editProduct._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.message === "Product updated successfully") {
      alert("Product Updated!");
      setEditProduct(null);
      loadProducts();
    } else {
      alert("Update Failed!");
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Products</h1>
          <button
            onClick={() => {
              setImages([]);
              setShowAddModal(true);
            }}
            className="bg-black text-white rounded-md px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>

        {/* PRODUCT TABLE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow">
          {/* SEARCH BAR */}
          <div className="bg-white p-4 rounded-xl shadow border flex gap-3 w-full">
            <input
              type="text"
              placeholder="Search Product Name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchProducts()}
              className="border px-3 py-2 rounded-md w-full"
            />

            <button
              onClick={searchProducts}
              className="bg-black text-white px-4 py-2 rounded-md"
            >
              Search
            </button>

            <button
              onClick={() => {
                setSearchName("");
                loadProducts(); // reset
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
            >
              Reset
            </button>
          </div>

          <div className="px-6 pb-6 overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-100">
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 px-4 text-center">Stock</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 align-middle w-28">
                        {p.imageUrls?.length > 0 ? (
                          <img
                            src={p.imageUrls[0] || fallbackImage}
                            onError={(e) => (e.target.src = fallbackImage)}
                            className="w-14 h-14 object-cover rounded shadow"
                            alt={p.Name}
                          />
                        ) : (
                          <span className="text-sm text-gray-500">No Image</span>
                        )}
                      </td>

                      <td className="py-3 px-4 align-middle text-left">
                        <div className="text-sm font-medium text-gray-800">{p.name}</div>
                      </td>

                      <td className="py-3 px-4 align-middle text-right">₹{p.price}</td>

                      <td className="py-3 px-4 align-middle text-center">{p.stock}</td>

                      <td className="py-3 px-4 align-middle text-center">
                        <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded">
                          {p.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 align-middle">
                        <div className="flex gap-3 justify-center items-center">
                          <button
                            className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                            onClick={() => handleViewProduct(p)}
                          >
                            View
                          </button>

                          <button
                            className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm"
                            onClick={() => handleEditProduct(p)}
                          >
                            Edit
                          </button>

                          <button
                            className="px-3 py-1 bg-red-600 text-white rounded-md text-sm"
                            onClick={() => deleteProduct(p._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ADD PRODUCT MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full p-6 relative">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-3 right-3"
              >
                <X />
              </button>

              <h2 className="text-lg font-semibold mb-4">Add New Product</h2>

              <form
                onSubmit={handleCreateProduct}
                className="grid grid-cols-3 gap-6"
              >
                <div className="col-span-2 space-y-4">
                  <input
                    name="name"
                    placeholder="Product Name"
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full"
                  />

                  <input
                    name="sku"
                    placeholder="SKU"
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full"
                  />

                  <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full"
                  />

                  {/* ⭐ CATEGORY DROPDOWN */}
                  <select
                    name="categoryId"
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full"
                    required
                  >
                    <option value="">Select Category</option>

                    
                    {/* <option value="Household">Household</option>
                    <option value="Gadgets">Gadgets</option>
                    <option value="Gifts">Gifts</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Car Interior">Car Interior</option>
                    <option value="Car Exterior">Car Exterior</option>
                    <option value="Accessories">Accessories</option> */}
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  {/* ⭐ SUBCATEGORY DROPDOWN */}
                  {/* <select
                    name="subcategoryId"
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-all"
                    required
                  >
                    <option value="sub">Select Subcategory</option>
                    {subcategories
                      .filter((sc) => sc.categoryId === form.categoryId)
                      .map((sc) => (
                        <option key={sc._id} value={sc._id}>
                          {sc.name}
                        </option>
                      ))}
                  </select> */}

                  {/* IMAGE UPLOAD */}
                  <label
                    htmlFor="productImages"
                    className="border-2 border-dashed rounded-md p-6 flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="w-8 h-8 text-gray-500" />
                    <p>Upload Images</p>
                  </label>

                  <input
                    id="productImages"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />

                  {/* IMAGE PREVIEW */}
                  <div className="grid grid-cols-5 gap-3 mt-3">
                    {images.map((img) => (
                      <div key={img.id} className="relative">
                        <img
                          src={img.preview}
                          onError={(e) => (e.target.src = fallbackImage)}
                          className="w-28 h-28 object-cover rounded"
                        />

                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-black text-white p-1 rounded"
                          onClick={() => removeImage(img.id)}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-4">
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full"
                  />

                  <input
                    type="number"
                    name="salesPrice"
                    placeholder="Sale Price"
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full"
                  />

                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full"
                  />

                  <button className="bg-black text-white w-full py-2 rounded-md">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ⭐ EDIT PRODUCT MODAL (Correct Position) */}
      {editProduct && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

    <div className="bg-white rounded-xl w-full max-w-md h-[90vh] flex flex-col relative">

      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Edit Product</h2>
        <button onClick={() => setEditProduct(null)}>
          <X />
        </button>
      </div>

      {/* BODY → Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        <form onSubmit={handleUpdateProduct} className="space-y-4">

          <div>
            <label className="text-sm font-medium">Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium">SKU</label>
            <input
              name="sku"
              value={form.sku}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            >
              <option value="">Select Category</option>
              {/* <option value="Household">Household</option>
                    <option value="Gadgets">Gadgets</option>
                    <option value="Gifts">Gifts</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Car Interior">Car Interior</option>
                    <option value="Car Exterior">Car Exterior</option>
                    <option value="Accessories">Accessories</option> */}
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* <div>
            <label className="text-sm font-medium">Subcategory</label>
            <select
              name="subcategoryId"
              value={form.subcategoryId}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            >
              <option value="">Select Subcategory</option>
              {subcategories
                .filter((sc) => sc.categoryId === form.categoryId)
                .map((sc) => (
                  <option key={sc._id} value={sc._id}>
                    {sc.name}
                  </option>
                ))}
            </select>
          </div> */}

          <div>
            <label className="text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Sales Price</label>
            <input
              type="number"
              name="salesPrice"
              value={form.salesPrice}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>

        </form>
      </div>

      {/* FOOTER BUTTON */}
      <div className="p-4 border-t">
        <button
          onClick={handleUpdateProduct}
          className="bg-yellow-600 text-white w-full py-2 rounded-md"
        >
          Update Product
        </button>
      </div>

    </div>
  </div>
)}


        {/* VIEW PRODUCT MODAL */}
        {viewProduct && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-5 relative">
              <button
                onClick={() => setViewProduct(null)}
                className="absolute top-3 right-3"
              >
                <X />
              </button>

              <h2 className="text-lg font-semibold mb-3">Product Details</h2>

              <div className="flex flex-col gap-2">
                {/* IMAGE */}
                <div className="flex justify-center mb-2">
                  {viewProduct.imageUrls?.length > 0 ? (
                    <img
                      src={viewProduct.imageUrls[0]}
                      className="w-28 h-28 object-cover rounded"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </div>

                <div className="text-sm space-y-1">
                  <p>
                    <strong>Name:</strong> {viewProduct.name}
                  </p>
                  <p>
                    <strong>SKU:</strong> {viewProduct.sku}
                  </p>
                  <p>
                    <strong>Description:</strong> {viewProduct.description}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{viewProduct.price}
                  </p>
                  <p>
                    <strong>Sale Price:</strong> ₹{viewProduct.salesPrice}
                  </p>
                  <p>
                    <strong>Stock:</strong> {viewProduct.stock}
                  </p>
                  <p>
                    <strong>Status:</strong> {viewProduct.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
