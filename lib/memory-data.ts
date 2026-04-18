import { Category, MenuItem, Order } from '@/types/salon';

// In-memory storage (works on cloud platforms)
let categories: Category[] = [];
let menuItems: MenuItem[] = [];
let orders: Order[] = [];

// Initialize with default data if empty
function initializeData() {
  if (categories.length === 0) {
    categories = [
      { id: '1', name: 'hair cut', description: 'the hair cut styles' }
    ];
  }
  
  if (menuItems.length === 0) {
    menuItems = [
      { id: '1', name: 'snap', description: 'hair line thick', price: 350, categoryId: '1', available: true }
    ];
  }
  
  // Orders stay empty initially
}

// Initialize on module load
initializeData();

// ========== CATEGORIES CRUD ==========

export function getCategories(): Category[] {
  return categories;
}

export function createCategory(category: Category): void {
  categories.push(category);
}

export function updateCategory(id: string, updatedCategory: Partial<Category>): void {
  const index = categories.findIndex(c => c.id === id);
  if (index !== -1) {
    categories[index] = { ...categories[index], ...updatedCategory };
  }
}

export function deleteCategory(id: string): void {
  categories = categories.filter(c => c.id !== id);
}

// ========== MENU ITEMS CRUD ==========

export function getMenuItems(): MenuItem[] {
  return menuItems;
}

export function createMenuItem(item: MenuItem): void {
  menuItems.push(item);
}

export function updateMenuItem(id: string, updatedItem: Partial<MenuItem>): void {
  const index = menuItems.findIndex(item => item.id === id);
  if (index !== -1) {
    menuItems[index] = { ...menuItems[index], ...updatedItem };
  }
}

export function deleteMenuItem(id: string): void {
  menuItems = menuItems.filter(item => item.id !== id);
}

// ========== ORDERS CRUD ==========

export function getOrders(): Order[] {
  return orders;
}

export function createOrder(order: Order): void {
  orders.push(order);
}

export function updateOrder(id: string, updatedOrder: Partial<Order>): void {
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updatedOrder };
  }
}

export function deleteOrder(id: string): void {
  orders = orders.filter(o => o.id !== id);
}

export function getOrderById(id: string): Order | null {
  const order = orders.find(o => o.id === id);
  return order || null;
}
