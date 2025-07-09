import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Zap, Leaf, Award, Users } from 'lucide-react';
import { Card } from '../ui/Card';

const WhyEverBowl: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: '100% Organic & Farm-Fresh',
      description: 'All ingredients sourced directly from certified organic farms',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Heart,
      title: 'No Preservatives or Fake Flavors',
      description: 'Pure, natural ingredients with no artificial additives',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: Zap,
      title: 'Real Taste. Real Energy.',
      description: 'Nutrient-dense meals that fuel your body and mind',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Leaf,
      title: 'Locally Sourced',
      description: 'Supporting local farmers and reducing carbon footprint',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Handcrafted with love and attention to detail',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Building a healthier community one bowl at a time',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Ever Bowl?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to bringing you the finest organic ingredients and exceptional quality in every bowl.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="group relative p-8 h-full">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-gray-300 transition-all duration-300" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyEverBowl;