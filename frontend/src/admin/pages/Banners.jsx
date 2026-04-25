import React, { useState, useEffect } from "react";
import { Plus, SquarePen, Trash2, X } from "lucide-react";
import BASE from "../../config";

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    type: "",
    linkUrl: "",
    status: "active",
    image: null,
    preview: null,
  });

  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    type: "",
    linkUrl: "",
    status: "active",
    image: null,
    oldImage: "",
  });

  const token = localStorage.getItem("token");

  // ------------------- GET ALL BANNERS -------------------
  const fetchBanners = async () => {
    try {
      const res = await fetch(`${BASE.BASE_URL}/banner/getAllBanner`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok && data.result) {
        const formatted = data.result.map((b) => ({
          id: b._id,
          title: b.title,
          type: b.type,
          linkUrl: b.linkUrl,
          status: b.status,
          img: b.image, // full URL already
        }));

        setBanners(formatted);
      } else {
        setBanners([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setBanners([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // ------------------- ADD BANNER -------------------
  const handleAdd = async () => {
    if (!form.title.trim()) return alert("Title required!");
    if (!form.image) return alert("Image required!");

    setSaving(true);

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("type", form.type);
    fd.append("linkUrl", form.linkUrl);
    fd.append("status", form.status);
    fd.append("image", form.image);

    try {
      const res = await fetch(`${BASE.BASE_URL}/banner/createBanner`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const result = await res.json();
      // console.log("CREATE RESULT,,,,,,,,,,,,,:", result);
      if (res.ok) {
        alert("Banner Created Successfully!");
        setShowAddModal(false);
        setForm({
          title: "",
          type: "",
          linkUrl: "",
          status: "active",
          image: null,
          preview: null,
        });
        fetchBanners();
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.log("Create error:", error);
    }

    setSaving(false);
  };

  // ------------------- OPEN EDIT -------------------
  const openEdit = (b) => {
    setEditForm({
      id: b.id,
      title: b.title,
      type: b.type,
      linkUrl: b.linkUrl,
      status: b.status,
      oldImage: b.img,
      image: null,
    });

    setShowEditModal(true);
  };

  // ------------------- UPDATE BANNER -------------------
  const handleUpdate = async () => {
    if (!editForm.title.trim()) return alert("Title required!");

    setSaving(true);

    const fd = new FormData();
    fd.append("title", editForm.title);
    fd.append("type", editForm.type);
    fd.append("linkUrl", editForm.linkUrl);
    fd.append("status", editForm.status);
    if (editForm.image) fd.append("image", editForm.image);

    try {
      const res = await fetch(
        `${BASE.BASE_URL}/banner/editBanner/${editForm.id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        }
      );

      const result = await res.json();

      if (res.ok) {
        alert("Banner Updated!");
        setShowEditModal(false);
        fetchBanners();
      } else {
        alert(result.message || "Update failed!");
      }
    } catch (error) {
      console.log("Update error:", error);
    }

    setSaving(false);
  };

  // ------------------- DELETE BANNER -------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this banner?")) return;

    setDeleting(true);

    try {
      const res = await fetch(`${BASE.BASE_URL}/banner/deleteBanner/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();

      if (res.ok) {
        alert("Banner Deleted!");
        fetchBanners();
      } else {
        alert(result.message || "Delete failed!");
      }
    } catch (error) {
      console.log("Delete error:", error);
    }

    setDeleting(false);
  };

  // ------------------- UI -------------------
  if (loading) return <p className="text-center p-10">Loading...</p>;

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Banners</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Banner
        </button>
      </div>

      {/* ------- Banner List ------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div key={b.id} className="border rounded-lg overflow-hidden">
            <img src={encodeURI(b.img)} className="w-full h-48 object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="font-bold">{b.title}</h3>
              <p className="text-sm text-gray-600">{b.type}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => openEdit(b)}
                  className="border px-3 py-2 w-full rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(b.id)}
                  className="border border-red-400 text-red-600 px-3 py-2 w-full rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setShowAddModal(false)}
          />

          <div className="fixed top-1/2 left-1/2 bg-white p-6 rounded w-full max-w-lg -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-lg font-semibold mb-4">Add Banner</h2>

            <input
              placeholder="Title"
              className="w-full border p-2 mb-3"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              placeholder="Type"
              className="w-full border p-2 mb-3"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />

            <input
              placeholder="Link URL"
              className="w-full border p-2 mb-3"
              value={form.linkUrl}
              onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
            />

            <select
              className="w-full border p-2 mb-3"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* FILE INPUT WITH PREVIEW */}
            <input
              type="file"
              className="w-full border p-2 mb-3"
              onChange={(e) => {
                const file = e.target.files[0];
                setForm({
                  ...form,
                  image: file,
                  preview: URL.createObjectURL(file),
                });
              }}
            />

            {form.preview && (
              <img
                src={form.preview}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="border px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="bg-black text-white px-4 py-2"
              >
                {saving ? "Saving..." : "Create"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setShowEditModal(false)}
          />

          <div className="fixed top-1/2 left-1/2 bg-white p-6 rounded w-full max-w-lg -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-lg font-semibold mb-4">Edit Banner</h2>

            <input
              className="w-full border p-2 mb-3"
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-3"
              value={editForm.type}
              onChange={(e) =>
                setEditForm({ ...editForm, type: e.target.value })
              }
            />

            <input
              className="w-full border p-2 mb-3"
              value={editForm.linkUrl}
              onChange={(e) =>
                setEditForm({ ...editForm, linkUrl: e.target.value })
              }
            />

            <select
              className="w-full border p-2 mb-3"
              value={editForm.status}
              onChange={(e) =>
                setEditForm({ ...editForm, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <img
              src={
                editForm.image
                  ? URL.createObjectURL(editForm.image)
                  : encodeURI(editForm.oldImage)
              }
              className="w-full h-40 object-cover rounded mb-3"
            />

            <input
              type="file"
              className="w-full border p-2 mb-3"
              onChange={(e) =>
                setEditForm({ ...editForm, image: e.target.files[0] })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="border px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-black text-white px-4 py-2"
              >
                {saving ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
