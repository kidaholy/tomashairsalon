'use client';

import { useState, useEffect } from 'react';
import { Category, MenuItem, Order, OrderItem } from '@/types/salon';
import Link from 'next/link';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Cart state
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cashierName, setCashierName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'other'>('cash');
  
  // Modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [categoriesRes, menuRes, ordersRes] = await Promise.all([
        fetch('/api/json/categories').then(r => r.json()),
        fetch('/api/json/menu').then(r => r.json()),
        fetch('/api/json/orders').then(r => r.json()),
      ]);

      setCategories(categoriesRes);
      setMenuItems(menuRes);
      setOrders(ordersRes.sort((a: Order, b: Order) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.categoryId === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.menuItemId === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.menuItemId === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { menuItemId: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setCart(prev => prev.filter(item => item.menuItemId !== menuItemId));
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.menuItemId === menuItemId ? { ...item, quantity } : item
      )
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const generateOrderNumber = () => {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    return `ORD-${timestamp}`;
  };

  const handleCheckout = () => {
    if (!cashierName.trim()) {
      alert('Please enter cashier name');
      return;
    }
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    setShowPaymentModal(true);
  };

  const completeOrder = async () => {
    const orderNumber = generateOrderNumber();
    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber,
      items: cart,
      subtotal,
      tax,
      total,
      status: 'completed',
      paymentMethod,
      createdAt: new Date().toISOString(),
      cashierName,
    };

    try {
      const res = await fetch('/api/json/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });

      if (res.ok) {
        setCurrentOrder(newOrder);
        setShowPaymentModal(false);
        setShowReceiptModal(true);
        setCart([]);
        loadData();
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order');
    }
  };

  const printReceipt = () => {
    window.print();
  };

  const updateOrderStatus = async (orderId: string, status: 'pending' | 'completed' | 'cancelled') => {
    try {
      const res = await fetch('/api/json/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status }),
      });

      if (res.ok) {
        loadData();
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
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
      <header className="bg-white shadow-md print:hidden">
        <div className="container mx-auto px-5 py-4 flex justify-between items-center">
          <h1 className="font-serif text-3xl font-bold text-primary">Tomas - Order Management</h1>
          <div className="flex gap-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
              View Site
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-5 py-8 print:hidden">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('new')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'new'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            New Order
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Order History ({orders.length})
          </button>
        </div>

        {/* New Order Tab */}
        {activeTab === 'new' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Menu Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Select Items</h2>
                
                {/* Cashier Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cashier Name *
                  </label>
                  <input
                    type="text"
                    value={cashierName}
                    onChange={(e) => setCashierName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                      selectedCategory === 'all'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Items
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredItems.filter(item => item.available).map(item => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => addToCart(item)}
                    >
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-primary">${item.price}</span>
                        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cart */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-2xl font-bold mb-4">Current Order</h2>
                
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.menuItemId} className="border-b pb-3">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-gray-600">${item.price} each</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.menuItemId)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                            >
                              +
                            </button>
                            <span className="ml-auto font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (10%):</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
                    >
                      Checkout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Order History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Order #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Cashier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{order.orderNumber}</td>
                    <td className="px-6 py-4">
                      {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4">{order.cashierName || '-'}</td>
                    <td className="px-6 py-4">{order.items.length} items</td>
                    <td className="px-6 py-4 font-bold">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 capitalize">{order.paymentMethod}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No orders yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 print:hidden">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6">Complete Payment</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['cash', 'card', 'other'] as const).map(method => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-3 rounded-lg font-semibold capitalize ${
                      paymentMethod === method
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={completeOrder}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700"
              >
                Complete Order
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceiptModal && currentOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 print:hidden">
          <div className="bg-white rounded-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">Order Complete!</h3>
            
            <Receipt order={currentOrder} />
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={printReceipt}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90"
              >
                Print Receipt
              </button>
              <button
                onClick={() => {
                  setShowReceiptModal(false);
                  setCurrentOrder(null);
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Receipt Component for Thermal Printer (80mm)
function Receipt({ order }: { order: Order }) {
  return (
    <div className="receipt-container font-mono text-sm">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">TOMAS</h2>
        <p className="text-xs">Premium Hair Care & Styling</p>
        <p className="text-xs">123 Beauty Street, Fashion District</p>
        <p className="text-xs">New York, NY 10001</p>
        <p className="text-xs">Tel: +1 (555) 123-4567</p>
      </div>

      <div className="border-t border-b border-gray-400 py-2 mb-2">
        <div className="flex justify-between">
          <span>Order #: {order.orderNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
          <span>Time: {new Date(order.createdAt).toLocaleTimeString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Cashier: {order.cashierName}</span>
        </div>
      </div>

      <div className="mb-2">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="text-left py-1">Item</th>
              <th className="text-center py-1">Qty</th>
              <th className="text-right py-1">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td className="py-1">{item.name}</td>
                <td className="text-center py-1">{item.quantity}</td>
                <td className="text-right py-1">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-400 pt-2 mb-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%):</span>
          <span>${order.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-gray-400 pt-2 mt-2">
          <span>TOTAL:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-gray-400 pt-2 mb-2">
        <div className="flex justify-between">
          <span>Payment Method:</span>
          <span className="capitalize">{order.paymentMethod}</span>
        </div>
        <div className="flex justify-between">
          <span>Status:</span>
          <span className="capitalize">{order.status}</span>
        </div>
      </div>

      <div className="text-center mt-4 pt-4 border-t border-gray-400">
        <p className="font-bold">Thank you for visiting!</p>
        <p className="text-xs mt-1">Please come again</p>
      </div>
    </div>
  );
}
