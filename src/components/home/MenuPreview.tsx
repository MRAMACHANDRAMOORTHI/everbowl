import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Star, Clock } from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { MenuItem } from "../../types";
import { useCart } from "../../contexts/CartContext";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { MENU_CATEGORIES } from "../../utils/constants";

const MenuPreview: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Fetch from Firestore
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const menuRef = collection(db, "menu_items");
        const q = query(menuRef, where("isAvailable", "==", true));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as MenuItem)
        );
        setMenuItems(items);
        setFilteredItems(items); // initially show all
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter on category change
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "all") {
      const filtered = menuItems.filter(
        (item) => item.category === selectedCategory
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(menuItems);
    }
  }, [selectedCategory, menuItems]);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({ menuItem: item, quantity: 1 });
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading delicious options...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Taste What Nature Intended
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our curated selection of organic, nutrient-rich bowls and
            beverages.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/* All */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <Card
              onClick={() => setSelectedCategory("all")}
              className={`cursor-pointer flex items-center space-x-2 px-6 py-3 hover:shadow-lg transition-shadow duration-300 ${
                selectedCategory === "all" ? "border-2 border-emerald-500" : ""
              }`}
            >
              <span className="text-2xl">🌟</span>
              <span className="font-medium text-gray-800">All</span>
            </Card>
          </motion.div>

          {/* Dynamic Categories */}
          {MENU_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                onClick={() => setSelectedCategory(category.id)}
                className={`cursor-pointer flex items-center space-x-2 px-6 py-3 hover:shadow-lg transition-shadow duration-300 ${
                  selectedCategory === category.id ? "border-2 border-emerald-500" : ""
                }`}
              >
                <span className="text-2xl">{category.emoji}</span>
                <span className="font-medium text-gray-800">{category.name}</span>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="group overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={item.imageUrl || `https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400`}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddToCart(item)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-emerald-500 hover:text-white"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">5–10 min</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-emerald-600">₹{item.price}</span>
                    <Button onClick={() => handleAddToCart(item)} variant="primary" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default MenuPreview;
