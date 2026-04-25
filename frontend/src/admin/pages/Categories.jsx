// src/admin/pages/Categories.jsx
import React, { useEffect, useState } from "react";
import { Plus, X, Pencil, Trash2, Upload } from "lucide-react";
import BASE from "../../config";
import placeholderImage from "../../assets/accessories.png";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [currentEdit, setCurrentEdit] = useState(null);
  const [search, setSearch] = useState("");

  const initialForm = {
    name: "",
    description: "",
    offer: "",
    slug: "",
    meta_title: "",
    meta_description: "",
    is_published: true,
    categoryType: "groceries",
    web_image: null,
    app_image: null,
  };

  const [form, setForm] = useState(initialForm);
  const [webPreview, setWebPreview] = useState(null);
  const [appPreview, setAppPreview] = useState(null);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE.PRODUCT_BASE}/category/getAllCategory`);
      const data = await res.json();
      console.log("CATEGORY API RESPONSE:", data.result[0]);
      if (res.ok && data.result) {
        const formatted = data.result.map((c) => {
          const webImg = Array.isArray(c.web_image)
            ? c.web_image[0]
            : c.web_image;

          const appImg = Array.isArray(c.app_image)
            ? c.app_image[0]
            : c.app_image;

          return {
            id: c._id,
            name: c.name,
            offer: c.offer,
            img: webImg || appImg || PLACEHOLDER,
            raw: c,
          };
        });

        setCategories(formatted);
      }
    } catch (err) {
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const generateSlug = (name) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleNameChange = (e) => {
    const value = e.target.value;
    const name = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    setForm((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
      meta_title: prev.meta_title,
    }));
  };

  // ADD CATEGORY
  const handleAdd = async () => {
    if (!form.name.trim()) return setError("Category name is required!");

    setSaving(true);
    const formData = new FormData();
    formData.append("name", form.name.trim().toUpperCase());

    formData.append("description", form.description || "");
    formData.append("offer", form.offer);
    formData.append("slug", form.slug);
    formData.append("meta_title", form.meta_title || form.name);
    formData.append("meta_description", form.meta_description);
    formData.append("is_published", form.is_published);
    formData.append("categoryType", form.categoryType);
    if (form.web_image) formData.append("web_image", form.web_image);
    if (form.app_image) formData.append("app_image", form.app_image);

    try {
      const res = await fetch(`${BASE.PRODUCT_BASE}/category/addCategory`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        resetForm();
        setAddOpen(false);
        await fetchCategories();
        alert("Category added successfully!");
      } else {
        const json = await res.json();
        setError(json.message || "Failed to add category");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  // EDIT CATEGORY - FULLY WORKING
  const handleEdit = async () => {
    if (!form.name.trim()) return setError("Category name is required!");

    setSaving(true);
    setError("");

    const formData = new FormData();
    formData.append("name", form.name.trim().toUpperCase());

    formData.append("description", form.description || "");
    formData.append("offer", form.offer || "");
    formData.append("slug", form.slug || generateSlug(form.name));
    formData.append("meta_title", form.meta_title || form.name);
    formData.append("meta_description", form.meta_description || "");
    formData.append("is_published", form.is_published);
    formData.append("categoryType", form.categoryType);

    if (form.web_image && typeof form.web_image !== "string") {
      formData.append("web_image", form.web_image);
    }
    if (form.app_image && typeof form.app_image !== "string") {
      formData.append("app_image", form.app_image);
    }

    try {
      const res = await fetch(
        `${BASE.PRODUCT_BASE}/category/editCategory/${currentEdit.id}`,
        {
          method: "PUT", // agar backend PATCH use kare to "PATCH" kar dena
          body: formData,
        },
      );

      const json = await res.json();

      if (res.ok && json.statusCode === 200) {
        resetForm();
        setEditOpen(false);
        await fetchCategories();
        alert("Category updated successfully!");
      } else {
        setError(json.message || "Failed to update");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  // DELETE CATEGORY - API CALL
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category permanently?")) return;

    try {
      const res = await fetch(
        `${BASE.PRODUCT_BASE}/category/deleteCategory/${id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        alert("Category deleted!");
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  // OPEN EDIT MODAL
  const openEdit = (cat) => {
    setCurrentEdit(cat);

    const raw = cat.raw;
    setForm({
      name: (raw.name || "").split("\t")[0].trim(),
      description: raw.description || "",
      offer: (raw.offer || "").split("\t")[0].trim(),
      slug: raw.slug || "",
      meta_title: (raw.meta_title || "").split("\t")[0].trim(),
      meta_description: raw.meta_description || "",
      is_published: raw.is_published ?? true,
      categoryType: (raw.categoryType || "groceries").split("\t")[0].trim(),
      web_image: null,
      app_image: null,
    });

    setWebPreview(raw.web_image?.[0] || PLACEHOLDER);
    setAppPreview(raw.app_image?.[0] || raw.web_image?.[0] || PLACEHOLDER);
    setEditOpen(true);
  };

  const resetForm = () => {
    setForm(initialForm);
    setWebPreview(null);
    setAppPreview(null);
    setError("");
    setCurrentEdit(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-xl text-gray-600">Loading categories...</div>
      </div>
    );
  }

  return (
    <main className="p-4 md:p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm border border-gray-300 rounded-xl px-5 py-3 mb-6 outline-none focus:ring-4 focus:ring-black/10"
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Categories
            </h1>

            <p className="text-gray-600 mt-1">Manage your product categories</p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setAddOpen(true);
            }}
            className="bg-black text-white px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition font-semibold text-lg shadow-lg"
          >
            <Plus size={24} /> Add Category
          </button>
        </div>

        {/* ⭐ FILTER LOGIC HERE */}
        {(() => {
          const filteredCategories = categories.filter((cat) =>
            cat.name?.toLowerCase().includes(search.toLowerCase()),
          );

          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200 flex flex-col"
                >
                  <div className="p-6 pb-4 flex justify-center">
                    <img
                      src={cat.img}
                      onError={(e) => (e.target.src = placeholderImage)}
                    />
                  </div>

                  <div className="px-6 pb-6 flex-1 flex flex-col justify-between">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                        {cat.name}
                      </h3>
                      <p className="text-gray-500 mt-1">0 Products</p>

                      {cat.offer && (
                        <span className="inline-block mt-3 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold px-5 py-2 rounded-full">
                          {cat.offer}
                        </span>
                      )}
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-3">
                      <button
                        onClick={() => openEdit(cat)}
                        className="bg-gray-100 hover:bg-black hover:text-white text-gray-800 font-medium py-3 px-6 rounded-xl transition flex items-center gap-2 w-auto"
                      >
                        <Pencil size={18} /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="bg-red-100 hover:bg-red-600 text-red-600 hover:text-white font-medium py-3 px-6 rounded-xl transition flex items-center gap-2 w-auto"
                      >
                        <Trash2 size={18} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* MODAL */}
      {(addOpen || editOpen) && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setAddOpen(false);
            setEditOpen(false);
            resetForm();
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b px-6 py-5 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editOpen ? "Edit Category" : "Add New Category"}
              </h2>
              <button
                onClick={() => {
                  setAddOpen(false);
                  setEditOpen(false);
                  resetForm();
                }}
                className="p-3 hover:bg-gray-100 rounded-full"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-5">
                <input
                  value={form.name}
                  onChange={handleNameChange}
                  placeholder="Category Name *"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 text-lg outline-none focus:ring-4 focus:ring-black/10"
                />
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Description"
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 resize-none outline-none focus:ring-4 focus:ring-black/10"
                />
                <input
                  value={form.offer}
                  onChange={(e) => setForm({ ...form, offer: e.target.value })}
                  placeholder="Offer (e.g. 10% off)"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-4 focus:ring-black/10"
                />
                <input
                  value={form.slug}
                  readOnly
                  placeholder="Slug (auto-generated)"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-5 py-4 cursor-not-allowed"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    value={form.meta_title}
                    onChange={(e) =>
                      setForm({ ...form, meta_title: e.target.value })
                    }
                    placeholder="Meta Title"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-4 focus:ring-black/10"
                  />
                  <input
                    value={form.meta_description}
                    onChange={(e) =>
                      setForm({ ...form, meta_description: e.target.value })
                    }
                    placeholder="Meta Description"
                    className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-4 focus:ring-black/10"
                  />
                </div>

                {/* <select
                  value={form.categoryType}
                  onChange={(e) => setForm({ ...form, categoryType: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-4 focus:ring-black/10"
                >
                  <option value="groceries">Groceries</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Living</option>
                </select> */}

                <label className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={form.is_published}
                    onChange={(e) =>
                      setForm({ ...form, is_published: e.target.checked })
                    }
                    className="w-6 h-6 rounded text-black"
                  />
                  <span className="text-lg font-medium">
                    Publish immediately
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-bold text-lg mb-3">
                    Web Image
                  </label>
                  <label className="block border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer hover:border-black">
                    {webPreview ? (
                      <img
                        src={webPreview}
                        alt="web"
                        className="mx-auto max-h-64 rounded-lg"
                      />
                    ) : (
                      <div className="space-y-3">
                        <Upload size={50} className="mx-auto text-gray-400" />
                        <p>Upload Web Image</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setForm({ ...form, web_image: file });
                          setWebPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                </div>

                <div>
                  <label className="block font-bold text-lg mb-3">
                    App Image (Optional)
                  </label>
                  <label className="block border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer hover:border-black">
                    {appPreview ? (
                      <img
                        src={appPreview}
                        alt="app"
                        className="mx-auto max-h-64 rounded-lg"
                      />
                    ) : (
                      <div className="space-y-3">
                        <Upload size={50} className="mx-auto text-gray-400" />
                        <p>Upload App Image</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setForm({ ...form, app_image: file });
                          setAppPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {error && (
                <p className="text-red-600 text-center font-bold bg-red-50 py-3 rounded-lg">
                  {error}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={() => {
                    setAddOpen(false);
                    setEditOpen(false);
                    resetForm();
                  }}
                  className="px-10 py-5 border-2 border-gray-300 rounded-xl text-lg font-bold hover:bg-gray-50"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={addOpen ? handleAdd : handleEdit}
                  disabled={saving}
                  className="px-12 py-5 bg-black text-white rounded-xl text-lg font-bold hover:bg-gray-800 disabled:opacity-60 shadow-lg"
                >
                  {saving
                    ? "Saving..."
                    : editOpen
                      ? "Update Category"
                      : "Create Category"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
