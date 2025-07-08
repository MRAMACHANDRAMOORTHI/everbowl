import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { supabase } from '../../lib/supabase'
import { MenuItem } from '../../lib/types'

export const MenuPreview: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Smoothie Bowls', 'Cold Press Juices', 'Vegan Wraps', 'Energy Shots']

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('isavailable', true)
        .limit(8)

      if (error) throw error
      setMenuItems(data || [])
    } catch (error) {
      console.error('Error fetching menu items:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => {
        const categoryMap: { [key: string]: string } = {
          'Smoothie Bowls': 'smoothie-bowls',
          'Cold Press Juices': 'cold-press-juices',
          'Vegan Wraps': 'vegan-wraps',
          'Energy Shots': 'energy-shots'
        }
        return item.category === categoryMap[selectedCategory]
      })

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading delicious menu items...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Taste What <span className="text-emerald-600">Nature</span> Intended
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our signature collection of organic bowls, fresh juices, and energy-packed treats.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                category === selectedCategory
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="overflow-hidden h-full">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-sm text-emerald-600 font-medium capitalize">
                        {item.category.replace('-', ' ')}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-emerald-600">₹{item.price}</span>
                      <Button variant="outline" size="sm" className="group">
                        Add to Cart
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found in this category.</p>
            <p className="text-gray-400 mt-2">Check back soon for new additions!</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Button variant="primary" size="lg" className="group">
            View Full Menu
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}