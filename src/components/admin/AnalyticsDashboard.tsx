import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#6366F1",
  "#F97316",
  "#14B8A6",
  "#E11D48",
  "#7C3AED",
  "#FACC15",
  "#06B6D4",
  "#A855F7",
  "#F43F5E",
  "#84CC16",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from({ length: 8 }, (_, i) => 2023 + i); // [2023, ..., 2030]
const currentYear = new Date().getFullYear();

// Select Component
const Select = ({ label, value, onChange, children, ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        {...props}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
      >
        {children}
      </select>
    </div>
  );
};

const AnalyticsDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        const usersSnapshot = await getDocs(collection(db, "users"));

        setOrders(
          ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setUsers(
          usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getOrderDate = (order) => {
    if (!order.createdAt) return null;

    // Handle Firebase Timestamp
    if (order.createdAt.seconds) {
      return new Date(order.createdAt.seconds * 1000);
    }

    // Handle regular date string or Date object
    return new Date(order.createdAt);
  };

  const filterOrdersByDate = (orders) => {
    return orders.filter((order) => {
      const orderDate = getOrderDate(order);
      if (!orderDate || isNaN(orderDate.getTime())) return false;

      const matchYear = orderDate.getFullYear() === selectedYear;
      const matchMonth =
        selectedMonth === "All" ||
        months[orderDate.getMonth()] === selectedMonth;

      return matchYear && matchMonth;
    });
  };

  const filteredOrders = filterOrdersByDate(orders);
  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  // Calculate top items from filtered orders
  const topItemsMap = {};
  filteredOrders.forEach((order) => {
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach((item) => {
        if (item.name) {
          if (!topItemsMap[item.name]) topItemsMap[item.name] = 0;
          topItemsMap[item.name] += item.quantity || 1;
        }
      });
    }
  });

  const topItems = Object.entries(topItemsMap)
    .map(([name, quantity]) => ({ name, value: quantity }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8); // Show top 8 items

  // Calculate monthly revenue for the selected year
  const revenueData = months.map((month, monthIndex) => {
    const monthlyOrders = orders.filter((order) => {
      const orderDate = getOrderDate(order);
      if (!orderDate || isNaN(orderDate.getTime())) return false;

      return (
        orderDate.getFullYear() === selectedYear &&
        orderDate.getMonth() === monthIndex
      );
    });

    const revenue = monthlyOrders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );

    return {
      name: month.substring(0, 3), // Short month names for better display
      revenue: revenue,
      orders: monthlyOrders.length,
    };
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-gray-500 text-sm font-medium">
                  Total Users
                </h4>
                <p className="text-3xl font-bold text-gray-800">
                  {users.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-gray-500 text-sm font-medium">
                  Total Orders
                </h4>
                <p className="text-3xl font-bold text-gray-800">
                  {filteredOrders.length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-gray-500 text-sm font-medium">
                  Total Revenue
                </h4>
                <p className="text-3xl font-bold text-emerald-600">
                  ₹{totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-gray-500 text-sm font-medium">
                  Avg Order Value
                </h4>
                <p className="text-3xl font-bold text-gray-800">
                  ₹
                  {filteredOrders.length > 0
                    ? (totalRevenue / filteredOrders.length).toFixed(0)
                    : 0}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-wrap gap-8">
            <Select
              label="Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
            <Select
              label="Month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="All">All Months</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Top Selling Items Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Top Selling Items
            </h3>
            {topItems.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={topItems}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(1)}%)`
                    }
                  >
                    {topItems.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, "Quantity"]} />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-350 flex items-center justify-center text-gray-500">
                <p>No items data available for the selected period</p>
              </div>
            )}
            <p className="text-sm text-center text-gray-500 mt-2">
              Showing top selling items by quantity for{" "}
              {selectedMonth === "All" ? "all months" : selectedMonth}{" "}
              {selectedYear}
            </p>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Monthly Revenue Overview ({selectedYear})
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(value, name) => [
                    `₹${value.toLocaleString()}`,
                    name === "revenue" ? "Revenue" : name,
                  ]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#10B981", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-4 text-sm text-gray-500">
              Monthly revenue breakdown for {selectedYear}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Period Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Selected Period</p>
              <p className="text-lg font-semibold text-gray-800">
                {selectedMonth === "All" ? "All Months" : selectedMonth}{" "}
                {selectedYear}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Orders in Period</p>
              <p className="text-lg font-semibold text-gray-800">
                {filteredOrders.length}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Revenue in Period</p>
              <p className="text-lg font-semibold text-emerald-600">
                ₹{totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
