'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Category, MenuItem, Order, OrderItem } from '@/types/salon';
import SidebarLayout from '@/app/components/SidebarLayout';

function OrdersPageInner() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') as 'new' | 'history' || 'new';
  const [activeTab, setActiveTab] = useState<'new' | 'history'>(initialTab);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Update activeTab when URL changes
  useEffect(() => {
    const tab = searchParams.get('tab') as 'new' | 'history' || 'new';
    setActiveTab(tab);
  }, [searchParams]);
  
  // Cart state
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cashierName, setCashierName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'other'>('cash');
  
  // Modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  
  // Date filter state
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month' | 'custom'>('all');
  const [selectedDate, setSelectedDate] = useState<string>('');

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

      // Ensure we always have arrays
      setCategories(Array.isArray(categoriesRes) ? categoriesRes : []);
      setMenuItems(Array.isArray(menuRes) ? menuRes : []);
      setOrders(Array.isArray(ordersRes) ? ordersRes.sort((a: Order, b: Order) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ) : []);
    } catch (error) {
      console.error('Error loading data:', error);
      // Set empty arrays on error
      setCategories([]);
      setMenuItems([]);
      setOrders([]);
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
  const total = subtotal;

  const generateOrderNumber = () => {
    const nextOrderNumber = orders.length + 1;
    return `#${nextOrderNumber}`;
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    completeOrder();
  };

  const completeOrder = async () => {
    const orderNumber = generateOrderNumber();
    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber,
      items: cart,
      subtotal,
      tax: 0,
      total,
      status: 'completed',
      paymentMethod: 'cash',
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
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const receiptContent = document.querySelector('.receipt-container');
      if (receiptContent) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Receipt</title>
              <style>
                @page {
                  size: 80mm auto;
                  margin: 0;
                }
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                body { 
                  font-family: 'Courier New', monospace; 
                  font-size: 11px; 
                  width: 80mm; 
                  margin: 0;
                  padding: 3mm 5mm;
                  line-height: 1.3;
                }
                .receipt-container { 
                  width: 100%;
                  max-width: 80mm;
                }
                .text-center { 
                  text-align: center; 
                }
                .text-left { 
                  text-align: left; 
                }
                .text-right { 
                  text-align: right; 
                }
                .font-bold { 
                  font-weight: bold; 
                }
                .text-lg { 
                  font-size: 13px; 
                }
                .text-xs { 
                  font-size: 9px; 
                }
                .text-sm {
                  font-size: 10px;
                }
                .mb-2 { 
                  margin-bottom: 6px; 
                }
                .mb-4 { 
                  margin-bottom: 10px; 
                }
                .mt-2 { 
                  margin-top: 6px; 
                }
                .mt-4 { 
                  margin-top: 10px; 
                }
                .py-1 { 
                  padding: 2px 0; 
                }
                .py-2 { 
                  padding: 4px 0; 
                }
                .pt-2 { 
                  padding-top: 4px; 
                }
                .pt-4 { 
                  padding-top: 8px; 
                }
                .border-t { 
                  border-top: 1px dashed #000; 
                }
                .border-b { 
                  border-bottom: 1px dashed #000; 
                }
                table { 
                  width: 100%; 
                  border-collapse: collapse;
                  font-size: 10px;
                }
                th {
                  text-align: left;
                  padding: 2px 0;
                  border-bottom: 1px dashed #000;
                }
                th:last-child {
                  text-align: right;
                }
                td {
                  padding: 3px 0;
                }
                td:last-child {
                  text-align: right;
                }
                td:nth-child(2) {
                  text-align: center;
                }
                .flex { 
                  display: flex; 
                }
                .justify-between { 
                  justify-content: space-between; 
                }
                .w-full { 
                  width: 100%; 
                }
                .internal-msg {
                  background-color: #fff;
                  border: 1px dashed #000;
                  padding: 4px;
                  margin: 6px 0;
                  text-align: center;
                  font-size: 9px;
                  font-weight: bold;
                }
                @media print {
                  @page {
                    size: 80mm auto;
                    margin: 0;
                  }
                  body { 
                    width: 80mm;
                    margin: 0;
                    padding: 3mm 5mm;
                  }
                }
              </style>
            </head>
            <body>
              ${receiptContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      }
    }
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

  const deleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      const res = await fetch(`/api/json/orders?id=${orderId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        loadData();
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order');
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
    <SidebarLayout>
      <div className="p-8 print:hidden">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {activeTab === 'new' ? 'New Order' : 'Order History'}
          </h2>
          <p className="text-gray-600 mt-2">
            {activeTab === 'new' ? 'Create a new order for your customer' : 'View and manage all past orders'}
          </p>
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
                        <span className="text-xl font-bold text-primary">{item.price} ETB</span>
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
                              <p className="text-sm text-gray-600">{item.price} ETB each</p>
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
                            <span className="ml-auto font-bold">{(item.price * item.quantity).toFixed(2)} ETB</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                        <p className="text-sm text-yellow-800 font-medium text-center">It is only for internal operation</p>
                      </div>
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total:</span>
                        <span>{total.toFixed(2)} ETB</span>
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
          <div>
            {/* Date Filter Buttons */}
            <div className="mb-6">
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setDateFilter('all')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    dateFilter === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  All Orders
                </button>
                <button
                  onClick={() => setDateFilter('today')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    dateFilter === 'today'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setDateFilter('week')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    dateFilter === 'week'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setDateFilter('month')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    dateFilter === 'month'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  This Month
                </button>
                <button
                  onClick={() => setDateFilter('custom')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    dateFilter === 'custom'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  Custom Date
                </button>
              </div>

              {/* Custom Date Picker */}
              {dateFilter === 'custom' && (
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Select Date:</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  {selectedDate && (
                    <button
                      onClick={() => setSelectedDate('')}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Orders Table */}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders
                    .filter(order => {
                      const orderDate = new Date(order.createdAt);
                      const now = new Date();
                      
                      if (dateFilter === 'today') {
                        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                        return orderDate >= todayStart;
                      }
                      
                      if (dateFilter === 'week') {
                        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                        const weekStart = new Date(todayStart);
                        weekStart.setDate(weekStart.getDate() - todayStart.getDay());
                        return orderDate >= weekStart;
                      }
                      
                      if (dateFilter === 'month') {
                        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                        return orderDate >= monthStart;
                      }
                      
                      if (dateFilter === 'custom' && selectedDate) {
                        const selected = new Date(selectedDate);
                        const selectedStart = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate());
                        const selectedEnd = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate(), 23, 59, 59, 999);
                        return orderDate >= selectedStart && orderDate <= selectedEnd;
                      }
                      
                      return true; // 'all'
                    })
                    .map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold">{order.orderNumber}</td>
                        <td className="px-6 py-4">
                          {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4">{order.cashierName || '-'}</td>
                        <td className="px-6 py-4">{order.items.length} items</td>
                        <td className="px-6 py-4 font-bold">{order.total.toFixed(2)} ETB</td>
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
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors text-sm font-medium"
                            title="Delete Order"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  {orders.filter(order => {
                    const orderDate = new Date(order.createdAt);
                    const now = new Date();
                    
                    if (dateFilter === 'today') {
                      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                      return orderDate >= todayStart;
                    }
                    
                    if (dateFilter === 'week') {
                      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                      const weekStart = new Date(todayStart);
                      weekStart.setDate(weekStart.getDate() - todayStart.getDay());
                      return orderDate >= weekStart;
                    }
                    
                    if (dateFilter === 'month') {
                      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                      return orderDate >= monthStart;
                    }
                    
                    if (dateFilter === 'custom' && selectedDate) {
                      const selected = new Date(selectedDate);
                      const selectedStart = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate());
                      const selectedEnd = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate(), 23, 59, 59, 999);
                      return orderDate >= selectedStart && orderDate <= selectedEnd;
                    }
                    
                    return true;
                  }).length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                        No orders found for this period
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>



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
    </SidebarLayout>
  );
}

// Receipt Component for Thermal Printer (80mm)
function Receipt({ order }: { order: Order }) {
  return (
    <div className="receipt-container font-mono text-sm">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">TOMAS</h2>
        <p className="text-xs">Premium Hair Care & Styling</p>
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
                <td className="text-right py-1">{(item.price * item.quantity).toFixed(2)} ETB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-400 pt-2 mb-2">
        <div className="internal-msg">
          <p>It is only for internal operation</p>
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-gray-400 pt-2 mt-2">
          <span>TOTAL:</span>
          <span>{order.total.toFixed(2)} ETB</span>
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

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <OrdersPageInner />
    </Suspense>
  );
}
