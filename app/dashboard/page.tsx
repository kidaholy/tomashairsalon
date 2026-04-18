'use client';

import { useState, useEffect } from 'react';
import SidebarLayout from '@/app/components/SidebarLayout';
import { Order } from '@/types/salon';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    categories: 0,
    menuItems: 0,
    orders: 0,
    revenue: 0
  });
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
              <div className="text-4xl">📁</div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Menu Items</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.menuItems}</p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.orders}</p>
              </div>
              <div className="text-4xl">🛒</div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600 mt-2">${stats.revenue.toFixed(2)}</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/inventory"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition-all"
            >
              <span className="text-2xl">📦</span>
              <div>
                <p className="font-semibold text-gray-800">Manage Inventory</p>
                <p className="text-sm text-gray-600">Add or edit products</p>
              </div>
            </a>
            <a
              href="/orders"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition-all"
            >
              <span className="text-2xl">🛒</span>
              <div>
                <p className="font-semibold text-gray-800">New Order</p>
                <p className="text-sm text-gray-600">Create customer order</p>
              </div>
            </a>
            <a
              href="/orders?tab=history"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition-all"
            >
              <span className="text-2xl">📜</span>
              <div>
                <p className="font-semibold text-gray-800">Order History</p>
                <p className="text-sm text-gray-600">View past orders</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
