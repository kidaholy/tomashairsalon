import { NextRequest, NextResponse } from 'next/server';
import { 
  getOrders, 
  createOrder, 
  updateOrder, 
  deleteOrder,
  getOrderById
} from '@/lib/database-orders';
import { Order } from '@/types/salon';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const order = getOrderById(id);
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json(order);
    }

    const orders = getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: Order = await request.json();
    
    if (!body.id || !body.orderNumber || !body.items || !body.total) {
      return NextResponse.json(
        { error: 'Missing required fields: id, orderNumber, items, total' },
        { status: 400 }
      );
    }

    createOrder(body);
    return NextResponse.json({ message: 'Order created successfully', order: body }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    updateOrder(id, updates);
    return NextResponse.json({ message: 'Order updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    deleteOrder(id);
    return NextResponse.json({ message: 'Order deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
