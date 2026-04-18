import clientPromise from './mongodb';
import { Category, MenuItem, Order } from '@/types/salon';

const DB_NAME = 'tomashair';
const COLLECTIONS = {
  categories: 'categories',
  menuItems: 'menuItems',
  orders: 'orders',
};

// ========== CATEGORIES CRUD ==========

export async function getCategories(): Promise<Category[]> {
  try {
    const client = await clientPromise;
    if (!client) return [];
    const db = client.db(DB_NAME);
    return (await db.collection(COLLECTIONS.categories).find({}).toArray()) as unknown as Category[];
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
}

export async function createCategory(category: Category): Promise<void> {
  const client = await clientPromise;
  if (!client) throw new Error('MongoDB not configured');
  const db = client.db(DB_NAME);
  await db.collection(COLLECTIONS.categories).insertOne(category as any);
}

export async function updateCategory(id: string, updatedCategory: Partial<Category>): Promise<void> {
  const client = await clientPromise;
  if (!client) throw new Error('MongoDB not configured');
  const db = client.db(DB_NAME);
  await db.collection(COLLECTIONS.categories).updateOne({ id }, { $set: updatedCategory as any });
}

export async function deleteCategory(id: string): Promise<void> {
  const client = await clientPromise;
  if (!client) throw new Error('MongoDB not configured');
  const db = client.db(DB_NAME);
  await db.collection(COLLECTIONS.categories).deleteOne({ id });
}

// ========== MENU ITEMS CRUD ==========

export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const client = await clientPromise;
    if (!client) return [];
    const db = client.db(DB_NAME);
    return (await db.collection(COLLECTIONS.menuItems).find({}).toArray()) as unknown as MenuItem[];
  } catch (error) {
    console.error('Error getting menu items:', error);
    return [];
  }
}

export async function createMenuItem(item: MenuItem): Promise<void> {
  const client = await clientPromise;
  if (!client) throw new Error('MongoDB not configured');
  const db = client.db(DB_NAME);
  await db.collection(COLLECTIONS.menuItems).insertOne(item as any);
}

export async function updateMenuItem(id: string, updatedItem: Partial<MenuItem>): Promise<void> {
  const client = await clientPromise;
  if (!client) throw new Error('MongoDB not configured');
  const db = client.db(DB_NAME);
  await db.collection(COLLECTIONS.menuItems).updateOne({ id }, { $set: updatedItem as any });
}

export async function deleteMenuItem(id: string): Promise<void> {
  const client = await clientPromise;
  if (!client) throw new Error('MongoDB not configured');
  const db = client.db(DB_NAME);
  await db.collection(COLLECTIONS.menuItems).deleteOne({ id });
}

// ========== ORDERS CRUD ==========

export async function getOrders(): Promise<Order[]> {
  try {
    const client = await clientPromise;
    if (!client) return [];
    const db = client.db(DB_NAME);
    return (await db.collection(COLLECTIONS.orders).find({}).toArray()) as unknown as Order[];
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
}

export async function createOrder(order: Order): Promise<void> {
  const client = await clientPromise;
  if (!client) throw new Error('MongoDB not configured');
  const db = client.db(DB_NAME);
  await db.collection(COLLECTIONS.orders).insertOne(order as any);
}

export async function updateOrder(id: string, updatedOrder: Partial<Order>): Promise<void> {
  const client = await clientPromise;
  if (!client) throw new Error('MongoDB not configured');
  const db = client.db(DB_NAME);
  await db.collection(COLLECTIONS.orders).updateOne({ id }, { $set: updatedOrder as any });
}

export async function deleteOrder(id: string): Promise<void> {
  const client = await clientPromise;
  if (!client) throw new Error('MongoDB not configured');
  const db = client.db(DB_NAME);
  await db.collection(COLLECTIONS.orders).deleteOne({ id });
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const client = await clientPromise;
    if (!client) return null;
    const db = client.db(DB_NAME);
    return (await db.collection(COLLECTIONS.orders).findOne({ id })) as unknown as Order | null;
  } catch (error) {
    console.error('Error getting order:', error);
    return null;
  }
}
