// src/pages/MyOrdersPage.tsx
import React, { useEffect, useState } from "react";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import { Layout } from "../components/common/Layout";
import { Card } from "../components/ui/Card";

const MyOrdersPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "ready":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "preparing":
        return <AlertCircle className="w-4 h-4" />;
      case "ready":
        return <Eye className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <div className="pt-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 m-5 mb-10 text-center">
          My Orders
        </h1>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-5 md:p-6 flex flex-col space-y-3 transition-all duration-300 transform hover:scale-[1.015] hover:shadow-xl hover:bg-emerald-50/20 cursor-pointer">
                  {/* Order Header */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <ShoppingBag className="w-6 h-6 text-emerald-500" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        Order #{order.id.slice(-6)}
                      </h3>
                    </div>

                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </div>

                  {/* Order Info */}
                  <div className="text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p>
                        <span className="font-medium text-gray-700">
                          Items:
                        </span>{" "}
                        {order.items?.length || 0}
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">
                          Total:
                        </span>{" "}
                        ₹{order.totalAmount}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-medium text-gray-700">Date:</span>{" "}
                        {order.createdAt?.seconds
                          ? new Date(
                              order.createdAt.seconds * 1000
                            ).toLocaleString()
                          : "Processing..."}
                      </p>
                      {order.userAddress && (
                        <p>
                          <span className="font-medium text-gray-700">
                            Address:
                          </span>{" "}
                          {order.userAddress}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600">
              Start your healthy journey by placing your first order!
            </p>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default MyOrdersPage;
