import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Star, Plus } from 'lucide-react'
import { Layout } from '../components/common/Layout'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { supabase } from '../lib/supabase'
import { MenuItem } from '../lib/types'

export const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const categories = [
    { value: 'all', label: 'All Items' },
    { value: 'smoothie-bowls', label: 'Smoothie Bowls' },
    { value: 'cold-press-juices', label: 'Cold Press Juices' },
    { value: 'vegan-wraps', label: 'Vegan Wraps' },
    { value: 'energy-shots', label: 'Energy Shots' }
  ]

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('isavailable', true)
        .order('name')

      if (error) throw error
      setMenuItems(data || [])
    } catch (error) {
      console.error('Error fetching menu items:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = menuItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

  if (loading) {
    return (
      <Layout>
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading our delicious menu...</p>
          </div>
        </div>
      </Layout>
    )
  }

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
                Our <span className="text-emerald-600">Menu</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our complete collection of organic bowls, fresh juices, and healthy wraps.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </section>

        {/* Menu Items */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredItems.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
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
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                        
                        {/* Ingredients */}
                        {item.ingredients && item.ingredients.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-1">Ingredients:</p>
                            <div className="flex flex-wrap gap-1">
                              {item.ingredients.slice(0, 3).map((ingredient, i) => (
                                <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                                  {ingredient}
                                </span>
                              ))}
                              {item.ingredients.length > 3 && (
                                <span className="text-xs text-gray-500">+{item.ingredients.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-emerald-600">₹{item.price}</span>
                          <Button variant="primary" size="sm" className="group">
                            <Plus className="w-4 h-4" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
                <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}