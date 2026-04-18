import fs from 'fs';
import path from 'path';
import { SalonData, Category, MenuItem, Order } from '@/types/salon';

const dataFilePath = path.join(process.cwd(), 'data', 'salon-data.json');

// Helper: Read JSON file
function readData(): SalonData {
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
}

// Helper: Write JSON file
function writeData(data: SalonData): void {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// ========== SALON DATA ==========

export function getSalonData(): SalonData {
  return readData();
}

// ========== CATEGORIES CRUD ==========

export function getCategories(): Category[] {
  const data = readData();
  return (data as any).categories || [];
}

export function createCategory(category: Category): void {
  const data = readData();
  if (!(data as any).categories) {
    (data as any).categories = [];
  }
  (data as any).categories.push(category);
  writeData(data);
}

export function updateCategory(id: string, updatedCategory: Partial<Category>): void {
  const data = readData();
  if (!(data as any).categories) return;
  const index = (data as any).categories.findIndex((c: Category) => c.id === id);
  if (index !== -1) {
    (data as any).categories[index] = { ...(data as any).categories[index], ...updatedCategory };
    writeData(data);
  }
}

export function deleteCategory(id: string): void {
  const data = readData();
  if (!(data as any).categories) return;
  (data as any).categories = (data as any).categories.filter((c: Category) => c.id !== id);
  writeData(data);
}

// ========== MENU ITEMS CRUD ==========

export function getMenuItems(): MenuItem[] {
  const data = readData();
  return (data as any).menuItems || [];
}

export function createMenuItem(item: MenuItem): void {
  const data = readData();
  if (!(data as any).menuItems) {
    (data as any).menuItems = [];
  }
  (data as any).menuItems.push(item);
  writeData(data);
}

export function updateMenuItem(id: string, updatedItem: Partial<MenuItem>): void {
  const data = readData();
  if (!(data as any).menuItems) return;
  const index = (data as any).menuItems.findIndex((item: MenuItem) => item.id === id);
  if (index !== -1) {
    (data as any).menuItems[index] = { ...(data as any).menuItems[index], ...updatedItem };
    writeData(data);
  }
}

export function deleteMenuItem(id: string): void {
  const data = readData();
  if (!(data as any).menuItems) return;
  (data as any).menuItems = (data as any).menuItems.filter((item: MenuItem) => item.id !== id);
  writeData(data);
}

// ========== ORDERS CRUD ==========

export function getOrders(): Order[] {
  const data = readData();
  return (data as any).orders || [];
}

export function createOrder(order: Order): void {
  const data = readData();
  if (!(data as any).orders) {
    (data as any).orders = [];
  }
  (data as any).orders.push(order);
  writeData(data);
}

export function updateOrder(id: string, updatedOrder: Partial<Order>): void {
  const data = readData();
  if (!(data as any).orders) return;
  const index = (data as any).orders.findIndex((o: Order) => o.id === id);
  if (index !== -1) {
    (data as any).orders[index] = { ...(data as any).orders[index], ...updatedOrder };
    writeData(data);
  }
}

export function deleteOrder(id: string): void {
  const data = readData();
  if (!(data as any).orders) return;
  (data as any).orders = (data as any).orders.filter((o: Order) => o.id !== id);
  writeData(data);
}

export function getOrderById(id: string): Order | null {
  const data = readData();
  if (!(data as any).orders) return null;
  const order = (data as any).orders.find((o: Order) => o.id === id);
  return order || null;
}
