import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Calendar, DollarSign, Package, Users, BarChart3 } from 'lucide-react'
import { Layout } from '../components/common/Layout'
import { Card } from '../components/ui/Card'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

interface AnalyticsData {
  dailyRevenue: { date: string; revenue: number; orders: number }[]
  monthlyRevenue: { month: string; revenue: number; orders: number }[]
  yearlyRevenue: { year: string; revenue: number; orders: number }[]
  topItems: { name: string; orders: number; revenue: number }[]
  recentStats: {
    todayRevenue: number
    todayOrders: number
    weekRevenue: number
    weekOrders: number
    monthRevenue: number
    monthOrders: number
  }
}

export const Analytics: React.FC = () => {
  const { user, isAdmin } = useAuth()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'daily' | 'monthly' | 'yearly'>('daily')

  useEffect(() => {
    if (isAdmin) {
      fetchAnalytics()
    }
  }, [isAdmin])

  const fetchAnalytics = async () => {
    try {
      // Fetch orders data
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Process analytics data
      const processedData = processAnalyticsData(orders || [])
      setAnalytics(processedData)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const processAnalyticsData = (orders: any[]): AnalyticsData => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Calculate recent stats
    const todayOrders = orders.filter(order => new Date(order.created_at) >= today)
    const weekOrders = orders.filter(order => new Date(order.created_at) >= weekAgo)
    const monthOrders = orders.filter(order => new Date(order.created_at) >= monthAgo)

    const recentStats = {
      todayRevenue: todayOrders.reduce((sum, order) => sum + order.total_amount, 0),
      todayOrders: todayOrders.length,
      weekRevenue: weekOrders.reduce((sum, order) => sum + order.total_amount, 0),
      weekOrders: weekOrders.length,
      monthRevenue: monthOrders.reduce((sum, order) => sum + order.total_amount, 0),
      monthOrders: monthOrders.length
    }

    // Generate daily revenue for last 30 days
    const dailyRevenue = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.created_at)
        return orderDate.toDateString() === date.toDateString()
      })
      
      dailyRevenue.push({
        date: date.toLocaleDateString(),
        revenue: dayOrders.reduce((sum, order) => sum + order.total_amount, 0),
        orders: dayOrders.length
      })
    }

    // Generate monthly revenue for last 12 months
    const monthlyRevenue = []
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthOrders = orders.filter(order => {
        const orderDate = new Date(order.created_at)
        return orderDate.getMonth() === date.getMonth() && 
               orderDate.getFullYear() === date.getFullYear()
      })
      
      monthlyRevenue.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        revenue: monthOrders.reduce((sum, order) => sum + order.total_amount, 0),
        orders: monthOrders.length
      })
    }

    // Generate yearly revenue
    const yearlyRevenue = []
    const currentYear = now.getFullYear()
    for (let year = currentYear - 2; year <= currentYear; year++) {
      const yearOrders = orders.filter(order => {
        const orderDate = new Date(order.created_at)
        return orderDate.getFullYear() === year
      })
      
      yearlyRevenue.push({
        year: year.toString(),
        revenue: yearOrders.reduce((sum, order) => sum + order.total_amount, 0),
        orders: yearOrders.length
      })
    }

    // Mock top items data (would need to join with menu_items in real implementation)
    const topItems = [
      { name: 'Tropical Paradise Bowl', orders: 45, revenue: 13455 },
      { name: 'Green Detox Juice', orders: 38, revenue: 7562 },
      { name: 'Acai Power Bowl', orders: 32, revenue: 11168 },
      { name: 'Mediterranean Wrap', orders: 28, revenue: 9772 }
    ]

    return {
      dailyRevenue,
      monthlyRevenue,
      yearlyRevenue,
      topItems,
      recentStats
    }
  }

  if (!user || !isAdmin) {
    return (
      <Layout>
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (loading || !analytics) {
    return (
      <Layout>
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </Layout>
    )
  }

  const getCurrentData = () => {
    switch (timeRange) {
      case 'monthly':
        return analytics.monthlyRevenue
      case 'yearly':
        return analytics.yearlyRevenue
      default:
        return analytics.dailyRevenue
    }
  }

  return (
    <Layout>
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your business performance and growth</p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Today's Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{analytics.recentStats.todayRevenue}</p>
                  <p className="text-sm text-gray-500">{analytics.recentStats.todayOrders} orders</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">₹{analytics.recentStats.weekRevenue}</p>
                  <p className="text-sm text-gray-500">{analytics.recentStats.weekOrders} orders</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">₹{analytics.recentStats.monthRevenue}</p>
                  <p className="text-sm text-gray-500">{analytics.recentStats.monthOrders} orders</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
              <div className="flex space-x-2">
                {(['daily', 'monthly', 'yearly'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                      timeRange === range
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="h-64 flex items-end space-x-2">
              {getCurrentData().slice(-10).map((item, index) => {
                const maxRevenue = Math.max(...getCurrentData().map(d => d.revenue))
                const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 200 : 0
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-emerald-500 rounded-t-lg transition-all duration-300 hover:bg-emerald-600"
                      style={{ height: `${height}px` }}
                      title={`Revenue: ₹${item.revenue}, Orders: ${item.orders}`}
                    />
                    <p className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                      {timeRange === 'daily' ? item.date.split('/').slice(0, 2).join('/') :
                       timeRange === 'monthly' ? item.month :
                       item.year}
                    </p>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Top Items */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Items</h3>
            <div className="space-y-4">
              {analytics.topItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-emerald-600">#{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{item.revenue}</p>
                    <p className="text-sm text-gray-500">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}