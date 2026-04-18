# Order & Inventory Management System

## Overview
The Tomas Hair Salon now has a complete **Management System** with a professional sidebar navigation, including inventory management, order processing, and thermal printer receipt support (80mm).

## Navigation Structure

The application uses a **sidebar menu** with two main sections:

### 📦 Inventory Management
- **Categories** - Manage product/service categories
- **Menu Items** - Manage services, products, and pricing

### 🛒 Order Management
- **New Order** - Create new orders for customers
- **Order History** - View and manage all past orders

## Features
✅ **Professional Sidebar Navigation** - Collapsible sidebar with clear menu structure
✅ **New Order Creation** - Cashiers can select items and create orders
✅ **Shopping Cart** - Add/remove items with quantity control
✅ **Order History** - View all past orders with details
✅ **Payment Processing** - Support for cash, card, and other payment methods
✅ **Thermal Receipt** - 80mm formatted receipt for thermal printers
✅ **Tax Calculation** - Automatic 10% tax calculation
✅ **Order Tracking** - Track order status (pending, completed, cancelled)
✅ **Category Management** - Organize items into categories
✅ **Menu Management** - Add, edit, and delete services/products

## How to Access

### Main Pages
- **Dashboard (Inventory)**: `http://localhost:3000/dashboard`
  - Categories management
  - Menu items management
- **Orders**: `http://localhost:3000/orders`
  - New order creation
  - Order history
- **Login**: `http://localhost:3000/login` (redirects to orders page)

### Using the Sidebar

The sidebar is always visible and provides quick navigation:

1. **Inventory Management Section**
   - Click "Categories" to manage product/service categories
   - Click "Menu Items" to manage your services and pricing

2. **Order Management Section**
   - Click "New Order" to create a new customer order
   - Click "Order History" to view all past orders

3. **Sidebar Controls**
   - Click the arrow (←/→) to collapse/expand the sidebar
   - Click "View Website" to see the customer-facing site

## Using the Order System

### Creating a New Order

1. **Enter Cashier Name**
   - Required field at the top of the page
   - Identifies who processed the order

2. **Select Items**
   - Browse all available menu items
   - Filter by category using the category buttons
   - Click on any item to add it to cart
   - Or click the "Add" button

3. **Manage Cart**
   - View all selected items in the cart (right side)
   - Adjust quantities using + and - buttons
   - Remove items by clicking the ✕ button
   - View subtotal, tax (10%), and total

4. **Checkout**
   - Click the "Checkout" button
   - Select payment method: Cash, Card, or Other
   - Review order summary
   - Click "Complete Order"

5. **Print Receipt**
   - After completing the order, a receipt modal appears
   - Click "Print Receipt" to print on 80mm thermal printer
   - Click "Close" to return to creating new orders

### Viewing Order History

1. Click the "Order History" tab
2. View all orders with:
   - Order number
   - Date and time
   - Cashier name
   - Number of items
   - Total amount
   - Payment method
   - Order status

## Receipt Format (80mm Thermal Printer)

The receipt is optimized for 80mm thermal printers and includes:

```
┌─────────────────────────┐
│        TOMAS            │
│ Premium Hair Care       │
│ 123 Beauty Street       │
│ New York, NY 10001      │
│ Tel: +1 (555) 123-4567  │
├─────────────────────────┤
│ Order #: ORD-123456     │
│ Date: 04/18/2026        │
│ Time: 2:30:45 PM        │
│ Cashier: John           │
├─────────────────────────┤
│ Item        Qty   Price │
│ Haircut      1    35.00 │
│ Styling      1    25.00 │
├─────────────────────────┤
│ Subtotal:        60.00  │
│ Tax (10%):      6.00   │
│ TOTAL:         66.00   │
├─────────────────────────┤
│ Payment: cash           │
│ Status: completed       │
├─────────────────────────┤
│  Thank you for visiting!│
│   Please come again     │
└─────────────────────────┘
```

## Data Storage

All orders are stored in: `data/salon-data.json`

### Order Structure
```json
{
  "id": "1234567890",
  "orderNumber": "ORD-123456",
  "items": [
    {
      "menuItemId": "1",
      "name": "Haircut",
      "price": 35,
      "quantity": 1
    }
  ],
  "subtotal": 35,
  "tax": 3.5,
  "total": 38.5,
  "status": "completed",
  "paymentMethod": "cash",
  "createdAt": "2026-04-18T14:30:45.000Z",
  "cashierName": "John"
}
```

## API Endpoints

### Orders
```
GET    /api/json/orders           # Get all orders
GET    /api/json/orders?id=xxx    # Get specific order
POST   /api/json/orders           # Create new order
PUT    /api/json/orders           # Update order
DELETE /api/json/orders?id=xxx    # Delete order
```

## Printing Tips

### For Best Results:
1. Use a thermal printer that supports 80mm paper
2. Set printer to use plain paper (not labels)
3. Ensure printer driver is installed correctly
4. Test print before processing real orders

### Browser Print Settings:
- Paper size: 80mm (or 3.15 inches)
- Margins: None/Minimum
- Headers/Footers: Disabled
- Scale: 100%

## Navigation

- **Home Page**: `http://localhost:3000/`
- **Login**: `http://localhost:3000/login` → Redirects to Orders
- **Dashboard/Inventory**: `http://localhost:3000/dashboard` → Categories & Menu Items
- **Orders**: `http://localhost:3000/orders` → New Order & Order History

### Sidebar Menu Structure

```
┌─────────────────────────┐
│    Tomas           [←]  │
├─────────────────────────┤
│                         │
│ INVENTORY MANAGEMENT    │
│ 📁 Categories          │
│ 📋 Menu Items          │
│                         │
│ ORDER MANAGEMENT        │
│ 🛒 New Order           │
│ 📜 Order History       │
│                         │
├─────────────────────────┤
│ 🏠 View Website        │
└─────────────────────────┘
```

## Workflow

```
Customer Request
      ↓
Cashier creates order at /orders
      ↓
Select items from menu
      ↓
Add to cart & adjust quantities
      ↓
Checkout & select payment method
      ↓
Complete order
      ↓
Print receipt (80mm thermal printer)
      ↓
Order saved to history
```

## Tips for Cashiers

1. **Always enter your name** before creating orders
2. **Double-check quantities** before checkout
3. **Verify payment method** matches what customer paid
4. **Print receipt** immediately after completing order
5. **Check order history** to review past transactions
6. **Use category filters** to find items quickly

## Troubleshooting

### Receipt not printing correctly?
- Check printer paper size (should be 80mm)
- Verify printer is set as default
- Try printing from different browser
- Check print preview before printing

### Orders not saving?
- Check `data/salon-data.json` file permissions
- Ensure app has write access to data folder
- Check browser console for errors

### Items not showing?
- Verify items are marked as "available" in dashboard
- Check if category filter is applied
- Refresh the page to reload data

---

**Your order management system is ready! Visit http://localhost:3000/orders** 🚀
