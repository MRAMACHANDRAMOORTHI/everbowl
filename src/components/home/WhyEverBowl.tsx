import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Leaf, Heart, Shield, Zap, Award, Users } from 'lucide-react'
import { Card } from '../ui/Card'

const features = [
  {
    icon: Leaf,
    title: '100% Organic',
    description: 'Sourced directly from certified organic farms with no harmful chemicals or pesticides.',
    color: 'bg-emerald-100 text-emerald-600'
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Each bowl is hand-crafted with care and attention to bring you the best nutrition.',
    color: 'bg-red-100 text-red-600'
  },
  {
    icon: Shield,
    title: 'No Preservatives',
    description: 'Fresh ingredients with no artificial preservatives, colors, or flavors added.',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Zap,
    title: 'Energy Boost',
    description: 'Packed with natural vitamins and minerals to fuel your active lifestyle.',
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Award-winning recipes created by nutrition experts and top chefs.',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Supporting local farmers and building a healthier community together.',
    color: 'bg-indigo-100 text-indigo-600'
  }
]

export const WhyEverBowl: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-emerald-600">Ever Bowl</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe in the power of nature to nourish your body and soul. Here's what makes us different.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="p-8 h-full">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${feature.color}`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Health?
            </h3>
            <p className="text-emerald-100 mb-6 text-lg max-w-2xl mx-auto">
              Join thousands of health-conscious individuals who have made the switch to organic, natural nutrition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu">
                <button className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200">
                Try Your First Bowl
                </button>
              </Link>
              <Link to="/about">
                <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition-colors duration-200">
                Learn More
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}