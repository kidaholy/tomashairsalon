'use client';

import { useState } from 'react';
import { Category, MenuItem } from '@/types/salon';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'categories' | 'menu'>('categories');
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Haircuts', description: 'Professional cutting services' },
    { id: '2', name: 'Coloring', description: 'Hair coloring and highlights' },
    { id: '3', name: 'Treatments', description: 'Hair care treatments' },
  ]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: "Men's Haircut", description: 'Classic cut with styling', price: 35, categoryId: '1', available: true },
    { id: '2', name: "Women's Haircut", description: 'Cut with wash and style', price: 55, categoryId: '1', available: true },
    { id: '3', name: 'Full Color', description: 'All-over hair color', price: 120, categoryId: '2', available: true },
    { id: '4', name: 'Highlights', description: 'Partial or full highlights', price: 150, categoryId: '2', available: true },
  ]);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [newMenuItem, setNewMenuItem] = useState({ name: '', description: '', price: '', categoryId: categories[0]?.id || '' });

  const handleAddCategory = () => {
    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      description: newCategory.description,
    };
    setCategories([...categories, category]);
    setNewCategory({ name: '', description: '' });
    setShowCategoryModal(false);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleAddMenuItem = () => {
    const menuItem: MenuItem = {
      id: Date.now().toString(),
      name: newMenuItem.name,
      description: newMenuItem.description,
      price: parseFloat(newMenuItem.price),
      categoryId: newMenuItem.categoryId,
      available: true,
    };
    setMenuItems([...menuItems, menuItem]);
    setNewMenuItem({ name: '', description: '', price: '', categoryId: categories[0]?.id || '' });
    setShowMenuModal(false);
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-5 py-4 flex justify-between items-center">
          <h1 className="font-serif text-3xl font-bold text-primary">Tomas - Dashboard</h1>
          <a href="/" className="text-gray-600 hover:text-primary transition-colors">
            Logout
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-5 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'categories'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Category Management
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'menu'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Menu Management
          </button>
        </div>

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
              <button
                onClick={() => setShowCategoryModal(true)}
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Add Category
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <div key={category.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu Items Tab */}
        {activeTab === 'menu' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Menu Items</h2>
              <button
                onClick={() => setShowMenuModal(true)}
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Add Menu Item
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Available</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{getCategoryName(item.categoryId)}</td>
                      <td className="px-6 py-4 font-semibold text-gray-800">${item.price}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleAvailability(item.id)}
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            item.available
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.available ? 'Yes' : 'No'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteMenuItem(item.id)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6">Add New Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g., Haircuts"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  rows={3}
                  placeholder="Category description"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddCategory}
                  className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Menu Item Modal */}
      {showMenuModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6">Add New Menu Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                <input
                  type="text"
                  value={newMenuItem.name}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g., Men's Haircut"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newMenuItem.description}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  rows={2}
                  placeholder="Item description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                <input
                  type="number"
                  value={newMenuItem.price}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newMenuItem.categoryId}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, categoryId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddMenuItem}
                  className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowMenuModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
