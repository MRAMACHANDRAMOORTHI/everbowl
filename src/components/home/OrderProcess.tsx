import React from 'react'
import { motion } from 'framer-motion'
import { Search, Heart, ShoppingCart, Truck } from 'lucide-react'
import { Card } from '../ui/Card'

const steps = [
  {
    icon: Search,
    title: 'Browse & Choose',
    description: 'Explore our organic menu and find your perfect bowl or juice',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Heart,
    title: 'Customize Your Bowl',
    description: 'Add your favorite toppings and create your personalized healthy meal',
    color: 'bg-red-100 text-red-600'
  },
  {
    icon: ShoppingCart,
    title: 'Secure Checkout',
    description: 'Quick and safe payment process with multiple payment options',
    color: 'bg-emerald-100 text-emerald-600'
  },
  {
    icon: Truck,
    title: 'Fresh Delivery',
    description: 'Get your organic goodness delivered fresh to your doorstep',
    color: 'bg-purple-100 text-purple-600'
  }
]

export const OrderProcess: React.FC = () => {
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
            How It <span className="text-emerald-600">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From selection to delivery, we've made it simple to get fresh, organic nutrition right to your door.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 transform -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <Card hover className="p-8 text-center h-full bg-white">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${step.color}`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Start Your Healthy Journey?
              </h3>
              <p className="text-emerald-100 mb-6 text-lg max-w-2xl mx-auto">
                Experience the difference of truly organic, fresh nutrition. Your body will thank you!
              </p>
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                Start Ordering Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}