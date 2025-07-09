import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  Leaf,
  Heart,
  Star,
  CheckCircle,
  Award,
  Sparkles,
  Clock,
  Truck,
  Users,
  Shield,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
const Button = ({
  variant = "primary",
  size = "lg",
  className = "",
  children,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl focus:ring-emerald-300",
    outline:
      "bg-white/90 backdrop-blur-sm border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white shadow-md hover:shadow-lg focus:ring-emerald-300",
    secondary:
      "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 shadow-lg hover:shadow-xl focus:ring-yellow-300",
  };

  const sizes = {
    lg: "px-8 py-4 text-lg rounded-2xl gap-3",
    md: "px-6 py-3 text-base rounded-xl gap-2",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const dynamicStats = [
  {
    label: "Happy Customers",
    value: "15K+",
    icon: Users,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    description: "Trust us daily",
  },
  {
    label: "Daily Fresh Bowls",
    value: "500+",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
    description: "Made with love",
  },
  {
    label: "Organic Guarantee",
    value: "100%",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Farm verified",
  },
];

const featuredProducts = [
  {
    emoji: "🍓",
    name: "Berry Boost Bowl",
    description: "Strawberry, blueberry & chia",
    detail: "Rich in antioxidants & fiber",
    color: "from-pink-400 to-purple-400",
    bgColor: "bg-gradient-to-br from-pink-50 to-purple-50",
  },
  {
    emoji: "🥭",
    name: "Mango Madness Smoothie",
    description: "Mango, banana & coconut milk",
    detail: "Great source of Vitamin A & C",
    color: "from-yellow-400 to-orange-400",
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
  },
  {
    emoji: "🥑",
    name: "Avocado Protein Bowl",
    description: "Avocado, quinoa & boiled egg",
    detail: "Loaded with healthy fats & protein",
    color: "from-green-400 to-lime-400",
    bgColor: "bg-gradient-to-br from-green-50 to-lime-50",
  },
  {
    emoji: "🍌",
    name: "Banana Peanut Smoothie",
    description: "Banana, peanut butter & oats",
    detail: "Natural energy booster",
    color: "from-yellow-400 to-amber-400",
    bgColor: "bg-gradient-to-br from-yellow-50 to-amber-50",
  },
  {
    emoji: "🍇",
    name: "Purple Grape Detox Bowl",
    description: "Grapes, beetroot & flax seeds",
    detail: "Great for skin & liver detox",
    color: "from-purple-400 to-indigo-400",
    bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
  },
  {
    emoji: "🍍",
    name: "Tropical Immunity Bowl",
    description: "Pineapple, kiwi & mint",
    detail: "Boosts immunity & digestion",
    color: "from-amber-400 to-lime-400",
    bgColor: "bg-gradient-to-br from-amber-50 to-lime-50",
  },
  {
    emoji: "🥬",
    name: "Green Detox Smoothie",
    description: "Spinach, cucumber & apple",
    detail: "Cleansing & alkalizing",
    color: "from-green-400 to-emerald-400",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
  },
  {
    emoji: "🥥",
    name: "Coconut Chia Bowl",
    description: "Coconut milk, chia & granola",
    detail: "Healthy omega-3 & fiber",
    color: "from-cyan-400 to-teal-400",
    bgColor: "bg-gradient-to-br from-cyan-50 to-teal-50",
  },
  {
    emoji: "🍫",
    name: "Choco Nut Energy Bowl",
    description: "Dark chocolate, dates & nuts",
    detail: "Natural pre/post workout fuel",
    color: "from-zinc-600 to-amber-500",
    bgColor: "bg-gradient-to-br from-zinc-50 to-amber-50",
  },
  {
    emoji: "🍎",
    name: "Classic Apple Cinnamon Bowl",
    description: "Apple, cinnamon & oats",
    detail: "Heart healthy & filling",
    color: "from-rose-400 to-red-400",
    bgColor: "bg-gradient-to-br from-rose-50 to-red-50",
  },
];

const trustBadges = [
  {
    label: "No Preservatives",
    icon: Shield,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Real Taste",
    icon: Star,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    label: "Real Energy",
    icon: Zap,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function HeroSection() {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({
      y: [0, -8, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls]);

  const currentItem = featuredProducts[currentProduct];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_#10b981_1px,_transparent_0)] bg-[size:30px_30px]" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 -right-10 w-72 h-72 bg-gradient-to-br from-emerald-200 to-green-300 rounded-full opacity-25 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 -left-10 w-80 h-80 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-25 blur-3xl"
        />
      </div>

      {/* Floating Organic Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
            className={`absolute w-1 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-60`}
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + i * 8}%`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
          {/* Enhanced Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-100 to-green-200 text-emerald-700 px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-emerald-200"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>100% Organic & Farm Fresh</span>
              <Leaf className="w-5 h-5 text-emerald-600" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-400 bg-clip-text text-transparent">
                Nourish Naturally.
              </span>
              <br />
              <span className="text-gray-900">Live</span>{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Vibrantly.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-600 leading-relaxed max-w-2xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <span className="font-semibold text-emerald-700">Ever Bowl</span>{" "}
              delivers hand-crafted organic bowls, smoothies, and juices
              straight from nature to your doorstep.
              <span className="text-emerald-600 font-semibold">
                {" "}
                Grown with care, made with love
              </span>
              , designed to energize your every day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 text-sm"
            >
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center space-x-2 ${badge.bg} px-4 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-white/50`}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <badge.icon className={`w-4 h-4 ${badge.color}`} />
                  <span className={`font-semibold ${badge.color}`}>
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link to="/menu">
                <Button
                  variant="primary"
                  size="lg"
                  className="group relative overflow-hidden font-bold"
                >
                  <span className="relative z-10">Explore Menu</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
                </Button>
              </Link>

              <Link to="/orders">
                <Button
                  variant="outline"
                  size="lg"
                  className="group relative overflow-hidden font-bold"
                >
                  <Clock className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Order Now</span>
                </Button>
              </Link>

              <Link to="/about">
                <Button
                  variant="secondary"
                  size="lg"
                  className="group relative overflow-hidden font-bold"
                >
                  <Leaf className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Meet Our Ingredients</span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
            >
              {dynamicStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`text-center p-6 rounded-2xl ${stat.bgColor} hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/50`}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-700 font-semibold mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Product Showcase - Like Your Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className={`relative ${currentItem.bgColor} rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-white/30`}
              animate={controls}
              whileHover={{ scale: 1.02 }}
            >
              {/* Premium gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />

              <div className="aspect-[5/3] flex items-center justify-center relative p-8">
                <div className="text-center space-y-6 relative z-10">
                  {/* Enhanced Product Icon */}
                  <motion.div
                    className="w-32 h-32 sm:w-40 sm:h-40 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center mx-auto relative overflow-hidden border-4 border-white/50"
                    animate={{
                      rotate: isHovered ? [0, 5, -5, 0] : 0,
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <motion.div
                      className="text-5xl sm:text-6xl"
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {currentItem.emoji}
                    </motion.div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${currentItem.color} opacity-10 rounded-full`}
                    />
                  </motion.div>

                  {/* Enhanced Product Info */}
                  <motion.div
                    key={currentProduct}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-3"
                  >
                    <h3
                      className="text-2xl sm:text-3xl font-bold text-gray-800"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {currentItem.name}
                    </h3>
                    <p
                      className="text-gray-600 text-lg font-medium"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {currentItem.description}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      {currentItem.detail}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Floating Badges */}
              <motion.div
                className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/30"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-bold text-gray-800">
                    Certified Organic
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/30"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-bold text-gray-800">
                    4.9 Rating
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full px-4 py-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4" />
                  <span className="text-sm font-bold">Farm to Table</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 right-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full px-4 py-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-bold">Premium</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-3">
              {featuredProducts.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                    index === currentProduct
                      ? "bg-emerald-600 border-emerald-600 shadow-lg"
                      : "bg-white border-gray-300 hover:border-emerald-400"
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentProduct(index)}
                />
              ))}
            </div>

            {/* Contact Info Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/30">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-gray-800">
                  Open: 8 AM – 11:59 PM (All Days)
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Wave Bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full h-24 fill-white">
          <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,90.7C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>
    </section>
  );
}
