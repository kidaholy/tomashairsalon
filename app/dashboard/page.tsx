'use client';

import { useState, useEffect } from 'react';
import { Category, MenuItem } from '@/types/salon';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'categories' | 'menu'>('categories');
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [categoriesRes, menuRes] = await Promise.all([
        fetch('/api/json/categories').then(r => r.json()),
        fetch('/api/json/menu').then(r => r.json()),
      ]);

      setCategories(categoriesRes);
      setMenuItems(menuRes);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (endpoint: string, data: any) => {
    try {
      const res = await fetch(`/api/json/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        loadData();
        setShowModal(false);
        setFormData({});
      }
    } catch (error) {
      console.error('Error creating:', error);
    }
  };

  const handleUpdate = async (endpoint: string, data: any) => {
    try {
      const res = await fetch(`/api/json/${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        loadData();
        setShowModal(false);
        setEditingItem(null);
        setFormData({});
      }
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  const handleDelete = async (endpoint: string, id: string | number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const res = await fetch(`/api/json/${endpoint}?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) loadData();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData(getDefaultFormData());
    setShowModal(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const getDefaultFormData = () => {
    switch (activeTab) {
      case 'categories':
        return { id: '', name: '', description: '' };
      case 'menu':
        return { id: '', name: '', description: '', price: 0, categoryId: categories[0]?.id || '', available: true };
      default:
        return {};
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = activeTab;
    
    if (editingItem) {
      handleUpdate(endpoint, formData);
    } else {
      handleCreate(endpoint, formData);
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Unknown';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-5 py-4 flex justify-between items-center">
          <h1 className="font-serif text-3xl font-bold text-primary">Tomas - Dashboard</h1>
          <a href="/" className="text-gray-600 hover:text-primary transition-colors">
            View Site
          </a>
        </div>
      </header>

      <main className="container mx-auto px-5 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'categories'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Categories ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'menu'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Menu Items ({menuItems.length})
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab === 'menu' ? 'Menu Items' : 'Categories'}</h2>
          <button
            onClick={openCreateModal}
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Add {activeTab === 'menu' ? 'Menu Item' : 'Category'}
          </button>
        </div>

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(cat => (
              <div key={cat.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{cat.name}</h3>
                <p className="text-gray-600 mb-4">{cat.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(cat)} className="text-blue-500 hover:text-blue-700 font-medium">Edit</button>
                  <button onClick={() => handleDelete('categories', cat.id)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Menu Items Tab */}
        {activeTab === 'menu' && (
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
                {menuItems.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{getCategoryName(item.categoryId)}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">${item.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.available ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEditModal(item)} className="text-blue-500 hover:text-blue-700 font-medium">Edit</button>
                        <button onClick={() => handleDelete('menu', item.id)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">
              {editingItem ? 'Edit' : 'Add'} {activeTab === 'menu' ? 'Menu Item' : 'Category'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.keys(formData).map(key => {
                if (key === 'categoryId') {
                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  );
                }
                if (key === 'available') {
                  return (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                        className="mr-2"
                      />
                      <label className="text-sm font-medium text-gray-700">Available</label>
                    </div>
                  );
                }
                if (key === 'price') {
                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                  );
                }
                if (key === 'id' && editingItem) {
                  return null;
                }
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{key}</label>
                    {key === 'description' ? (
                      <textarea
                        value={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        rows={3}
                      />
                    ) : (
                      <input
                        type={typeof formData[key] === 'number' ? 'number' : 'text'}
                        value={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: typeof formData[key] === 'number' ? parseFloat(e.target.value) : e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      />
                    )}
                  </div>
                );
              })}
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90">
                  {editingItem ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setFormData({}); setEditingItem(null); }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
