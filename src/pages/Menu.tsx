import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/common/Layout';
import MenuPreview from '../components/home/MenuPreview';

const Menu: React.FC = () => {
  return (
    <Layout>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Complete <span className="text-emerald-600">Menu</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our full range of organic, nutrient-rich bowls and beverages crafted with love and the finest ingredients.
              </p>
            </motion.div>
          </div>
        </section>
        
        <MenuPreview />
      </div>
    </Layout>
  );
};

export default Menu;