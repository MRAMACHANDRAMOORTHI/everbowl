import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from "lucide-react";
import { storage } from "../../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { MenuItem } from "../../types";

const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "smoothie-bowls" as MenuItem["category"],
    price: 0,
    imageUrl: "",
    description: "",
    isAvailable: true,
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const menuRef = collection(db, "menu_items");
      const snapshot = await getDocs(menuRef);
      const items = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as MenuItem)
      );
      setMenuItems(items);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        imageUrl: base64, // store the base64 string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingItem) {
        await updateDoc(doc(db, "menu_items", editingItem.id), formData);
      } else {
        await addDoc(collection(db, "menu_items"), formData);
      }
      await fetchMenuItems();
      resetForm();
    } catch (error) {
      console.error("Error saving menu item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, "menu_items", itemId));
        await fetchMenuItems();
      } catch (error) {
        console.error("Error deleting menu item:", error);
      }
    }
  };

  const toggleAvailability = async (item: MenuItem) => {
    try {
      await updateDoc(doc(db, "menu_items", item.id), {
        isAvailable: !item.isAvailable,
      });
      await fetchMenuItems();
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "smoothie-bowls",
      price: 0,
      imageUrl: "",
      description: "",
      isAvailable: true,
    });
    setShowAddForm(false);
    setEditingItem(null);
  };

  const startEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      imageUrl: item.imageUrl,
      description: item.description,
      isAvailable: item.isAvailable,
    });
    setShowAddForm(true);
  };

  const categories = [
    { value: "classic-fruit-bowls", label: "Classic Fruit Bowls" },
    { value: "assorted-fruit-bowls", label: "Assorted Fruit Bowls" },
    { value: "smoothie-bowls", label: "Smoothie Bowls" },
    { value: "sorbets", label: "Sorbets" },
    { value: "cold-press-juices", label: "Cold Pressed Juices" },
    { value: "fruit-shakes", label: "Fruit Shakes" },
    { value: "wellness-shots", label: "Wellness Shots" },
    { value: "smoothies", label: "Smoothies" },
  ];

  if (loading && menuItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(true)}
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Item</span>
        </motion.button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter item name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as MenuItem["category"],
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-gray-300 rounded-lg p-2"
              />

              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="mt-2 w-40 h-40 object-cover rounded-lg shadow"
                />
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter item description"
              />
            </div>

            <div className="md:col-span-2 flex items-center space-x-3">
              <input
                type="checkbox"
                id="isAvailable"
                checked={formData.isAvailable}
                onChange={(e) =>
                  setFormData({ ...formData, isAvailable: e.target.checked })
                }
              />
              <label
                htmlFor="isAvailable"
                className="text-sm font-medium text-gray-700"
              >
                Available for order
              </label>
            </div>

            <div className="md:col-span-2 flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600"
              >
                <Save className="w-5 h-5" />
                <span>{editingItem ? "Update Item" : "Add Item"}</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md hover:shadow-lg"
          >
            <div className="relative">
              <img
                src={
                  item.imageUrl ||
                  "https://dummyimage.com/400x300/cccccc/000000&text=No+Image"
                }
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => toggleAvailability(item)}
                  className={`p-2 rounded-full ${
                    item.isAvailable ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {item.isAvailable ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <span className="text-xl font-bold text-emerald-600">
                  ₹{item.price}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.isAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.isAvailable ? "Available" : "Unavailable"}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {menuItems.length === 0 && !loading && (
        <div className="text-center py-12">
          <Plus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No menu items yet</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-4 bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600"
          >
            Add Your First Item
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
