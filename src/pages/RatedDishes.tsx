// src/pages/RatedDishes.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { Layout } from "../components/common/Layout";
import { Card } from "../components/ui/Card";
import { Star } from "lucide-react";

const RatedDishes: React.FC = () => {
  const { userProfile } = useAuth();
  const [favItems, setFavItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userProfile?.favoriteItems?.length) {
        setFavItems([]);
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "menu_items"),
          where("__name__", "in", userProfile.favoriteItems)
        );

        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavItems(items);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userProfile]);

  return (
    <Layout>
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Your Rated Dishes ❤️
          </h2>
          <p className="text-gray-500 mt-2">
            Favorites you've marked for extra love.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto" />
            <p className="text-gray-500 mt-4">Loading your favorites...</p>
          </div>
        ) : favItems.length === 0 ? (
          <div className="text-center py-24">
            <Star className="w-10 h-10 text-emerald-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              No favorites yet
            </h3>
            <p className="text-gray-500 mt-2">
              Explore our menu and tap the ❤️ to add dishes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-14">
            {favItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={
                      item.imageUrl ||
                      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
                    }
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-600 font-bold text-lg">
                      ₹{item.price}
                    </span>
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RatedDishes;
