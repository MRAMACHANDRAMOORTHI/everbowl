import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Layout } from '../components/common/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalAmount } = useCart();
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

  // ✅ Checkout: Save order to Firestore and redirect
  const handleCheckout = async () => {
    if (!currentUser || !userProfile) {
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        userId: currentUser.uid,
        userName: userProfile.name || 'Guest',
        userAddress: userProfile.address || 'Not provided',
        items: cartItems.map(item => ({
          menuItemId: item.menuItem.id,
          name: item.menuItem.name,
          price: item.menuItem.price,
          quantity: item.quantity
        })),
        totalAmount,
        status: 'pending',
        createdAt: new Date()
      };

      await addDoc(collection(db, 'orders'), orderData);
      clearCart();
      navigate('/dashboard');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  // ✅ Empty cart view
  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="pt-16">
          <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-yellow-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
                <p className="text-xl text-gray-600 mb-8">
                  Looks like you haven't added any delicious items to your cart yet.
                </p>
                <Button variant="primary" size="lg">
                  <Link to="/menu" className="flex items-center space-x-2">
                    <span>Explore Menu</span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-16">
        {/* ✅ Cart Header */}
        <section className="py-12 bg-gradient-to-br from-emerald-50 via-white to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4"
            >
              <Link
                to="/menu"
                className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Continue Shopping</span>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
            </motion.div>
          </div>
        </section>

        {/* ✅ Cart Content */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* ✅ Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.menuItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.menuItem.imageUrl || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'}
                          alt={item.menuItem.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{item.menuItem.name}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2">{item.menuItem.description}</p>
                          <p className="text-emerald-600 font-semibold mt-1">₹{item.menuItem.price}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold text-gray-900 w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.menuItem.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* ✅ Order Summary */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="p-6 sticky top-24">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.menuItem.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.menuItem.name} × {item.quantity}
                        </span>
                        <span className="font-medium">₹{item.menuItem.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-emerald-600">₹{totalAmount}</span>
                    </div>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    {currentUser ? 'Place Order' : 'Login to Order'}
                  </Button>

                  {userProfile && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Delivery Address:</p>
                      <p className="text-sm font-medium text-gray-900">{userProfile.address}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Cart;
