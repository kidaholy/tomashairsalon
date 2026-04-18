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
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const [categoriesRes, menuRes, ordersRes] = await Promise.all([
        fetch('/api/json/categories').then(r => r.json()),
        fetch('/api/json/menu').then(r => r.json()),
        fetch('/api/json/orders').then(r => r.json()),
      ]);

      const totalRevenue = ordersRes.reduce((sum: number, order: Order) => sum + order.total, 0);

      setStats({
        categories: categoriesRes.length,
        menuItems: menuRes.length,
        orders: ordersRes.length,
        revenue: totalRevenue
      });
      
      setRecentOrders(ordersRes.slice(0, 7));
      setMenuItems(menuRes);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
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
                <p className="text-3xl font-bold text-green-600 mt-2">${stats.revenue.toFixed(2)}</p>
              </div>
              <div className="text-4xl text-yellow-500"><FiDollarSign /></div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Orders Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Orders Overview</h3>
            <Bar
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                  label: 'Orders',
                  data: recentOrders.length > 0 ? 
                    [3, 5, 2, 8, 6, 4, recentOrders.length] : 
                    [0, 0, 0, 0, 0, 0, 0],
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
            <h3 className="text-xl font-bold text-gray-800 mb-4">Revenue Breakdown</h3>
            <Doughnut
              data={{
                labels: ['Today', 'This Week', 'This Month'],
                datasets: [{
                  data: [
                    stats.revenue * 0.15,
                    stats.revenue * 0.35,
                    stats.revenue * 0.5
                  ],
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
          <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Menu Items</h3>
          <Bar
            data={{
              labels: menuItems.slice(0, 5).map(item => item.name),
              datasets: [{
                label: 'Price ($)',
                data: menuItems.slice(0, 5).map(item => item.price),
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
        </div>
      </div>
    </SidebarLayout>
  );
}
