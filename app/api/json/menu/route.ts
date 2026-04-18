import { NextRequest, NextResponse } from 'next/server';
import { 
  getMenuItems, 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem 
} from '@/lib/json-data';
import { MenuItem } from '@/types/salon';

export async function GET() {
  try {
    const menuItems = getMenuItems();
    return NextResponse.json(menuItems);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: MenuItem = await request.json();
    
    if (!body.id || !body.name || !body.price || !body.categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields: id, name, price, categoryId' },
        { status: 400 }
      );
    }

    createMenuItem(body);
    return NextResponse.json({ message: 'Menu item created successfully', item: body }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Menu item ID is required' }, { status: 400 });
    }

    updateMenuItem(id, updates);
    return NextResponse.json({ message: 'Menu item updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Menu item ID is required' }, { status: 400 });
    }

    deleteMenuItem(id);
    return NextResponse.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
  }
}
