'use client';

import { useState, useEffect } from 'react';
import SidebarLayout from '@/app/components/SidebarLayout';
import { Order, MenuItem } from '@/types/salon';
import { FiTrendingUp, FiPackage, FiShoppingBag, FiDollarSign } from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardPage() {
  const [stats, setStats] = useState({
    categories: 0,
    menuItems: 0,
    orders: 0,
    revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const [categoriesRes, menuRes, ordersRes] = await Promise.all([
        fetch('/api/json/categories').then(r => r.json()),
        fetch('/api/json/menu').then(r => r.json()),
        fetch('/api/json/orders').then(r => r.json()),
      ]);

      // Ensure we always have arrays
      const categories = Array.isArray(categoriesRes) ? categoriesRes : [];
      const menu = Array.isArray(menuRes) ? menuRes : [];
      const orders = Array.isArray(ordersRes) ? ordersRes : [];

      const totalRevenue = orders.reduce((sum: number, order: Order) => sum + order.total, 0);

      setStats({
        categories: categories.length,
        menuItems: menu.length,
        orders: orders.length,
        revenue: totalRevenue
      });
      
      // Sort orders by date (newest first)
      const sortedOrders = orders.sort((a: Order, b: Order) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      setRecentOrders(sortedOrders);
      setMenuItems(menu);
    } catch (error) {
      console.error('Error loading stats:', error);
      // Set defaults on error
      setStats({
        categories: 0,
        menuItems: 0,
        orders: 0,
        revenue: 0
      });
      setRecentOrders([]);
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get orders by day of week
  const getOrdersByDay = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const ordersByDay = [0, 0, 0, 0, 0, 0, 0];
    
    recentOrders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const dayIndex = orderDate.getDay();
      ordersByDay[dayIndex]++;
    });
    
    return {
      labels: days,
      data: ordersByDay
    };
  };

  // Helper to calculate revenue by time period
  const getRevenueByPeriod = () => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - todayStart.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    let todayRevenue = 0;
    let weekRevenue = 0;
    let monthRevenue = 0;
    
    recentOrders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      if (orderDate >= todayStart) {
        todayRevenue += order.total;
      }
      if (orderDate >= weekStart) {
        weekRevenue += order.total;
      }
      if (orderDate >= monthStart) {
        monthRevenue += order.total;
      }
    });
    
    return {
      labels: ['Today', 'This Week', 'This Month'],
      data: [todayRevenue, weekRevenue, monthRevenue]
    };
  };

  // Helper to get top menu items by usage
  const getTopMenuItems = () => {
    const itemCounts: Record<string, { name: string; count: number; price: number }> = {};
    
    recentOrders.forEach(order => {
      order.items.forEach(item => {
        if (itemCounts[item.menuItemId]) {
          itemCounts[item.menuItemId].count += item.quantity;
        } else {
          itemCounts[item.menuItemId] = {
            name: item.name,
            count: item.quantity,
            price: item.price
          };
        }
      });
    });
    
    const sortedItems = Object.values(itemCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    return {
      labels: sortedItems.map(item => item.name),
      data: sortedItems.map(item => item.count)
    };
  };

  if (loading) {
    return (
      <SidebarLayout>
        <div className="p-8 flex items-center justify-center h-screen">
          <div className="text-2xl font-semibold">Loading...</div>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-600 mt-2">Overview of your salon business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Categories */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Categories</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.categories}</p>
              </div>
              <div className="text-4xl text-blue-500"><FiPackage /></div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Menu Items</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.menuItems}</p>
              </div>
              <div className="text-4xl text-purple-500"><FiShoppingBag /></div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.orders}</p>
              </div>
              <div className="text-4xl text-green-500"><FiTrendingUp /></div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.revenue.toFixed(2)} ETB</p>
              </div>
              <div className="text-4xl text-yellow-500"><FiDollarSign /></div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Orders Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Orders by Day of Week</h3>
            <Bar
              data={{
                labels: getOrdersByDay().labels,
                datasets: [{
                  label: 'Number of Orders',
                  data: getOrdersByDay().data,
                  backgroundColor: 'rgba(59, 130, 246, 0.5)',
                  borderColor: 'rgba(59, 130, 246, 1)',
                  borderWidth: 2,
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }}
            />
          </div>

          {/* Revenue Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Revenue by Period</h3>
            <Doughnut
              data={{
                labels: getRevenueByPeriod().labels,
                datasets: [{
                  data: getRevenueByPeriod().data,
                  backgroundColor: [
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(168, 85, 247, 0.7)',
                  ],
                  borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(168, 85, 247, 1)',
                  ],
                  borderWidth: 2,
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Popular Items Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Most Ordered Items</h3>
          {getTopMenuItems().labels.length > 0 ? (
            <Bar
              data={{
                labels: getTopMenuItems().labels,
                datasets: [{
                  label: 'Times Ordered',
                  data: getTopMenuItems().data,
                  backgroundColor: 'rgba(245, 158, 11, 0.5)',
                  borderColor: 'rgba(245, 158, 11, 1)',
                  borderWidth: 2,
                }]
              }}
              options={{
                indexAxis: 'y' as const,
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }}
            />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No orders yet</p>
              <p className="text-sm mt-2">Charts will update automatically as orders are created</p>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}
