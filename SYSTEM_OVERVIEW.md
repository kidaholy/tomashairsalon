# Tomas Hair Salon - System Overview

## 🎯 Application Structure

Your hair salon management system now has a **professional sidebar navigation** with organized sections for all business operations.

---

## 📱 Navigation Layout

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────┐  ┌─────────────────────────────────────┐ │
│  │              │  │                                     │ │
│  │   TOMAS  [←] │  │  Page Content Area                  │ │
│  │              │  │                                     │ │
│  ├──────────────┤  │  - Dynamic content based on         │ │
│  │              │  │    selected menu item               │ │
│  │ INVENTORY    │  │  - Forms, tables, and interfaces    │ │
│  │ MANAGEMENT   │  │    for managing your business       │ │
│  │ 📁 Categories│  │                                     │ │
│  │ 📋 Menu Items│  │                                     │ │
│  │              │  │                                     │ │
│  ├──────────────┤  │                                     │ │
│  │              │  │                                     │ │
│  │ ORDER        │  │                                     │ │
│  │ MANAGEMENT   │  │                                     │ │
│  │ 🛒 New Order │  │                                     │ │
│  │ 📜 History   │  │                                     │ │
│  │              │  │                                     │ │
│  ├──────────────┤  │                                     │ │
│  │ 🏠 Website   │  │                                     │ │
│  └──────────────┘  └─────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Section 1: Inventory Management

### Categories (`/dashboard?tab=categories`)
**Purpose:** Organize your services and products into categories

**Features:**
- ✅ Add new categories (e.g., "Hair Cuts", "Coloring", "Treatments")
- ✅ Edit existing categories
- ✅ Delete unwanted categories
- ✅ View all categories in a card layout

**Example Categories:**
- Hair Cuts
- Coloring & Highlights
- Hair Treatments
- Styling
- Bridal Services

---

### Menu Items (`/dashboard?tab=menu`)
**Purpose:** Manage your services, products, and pricing

**Features:**
- ✅ Add new menu items/services
- ✅ Set prices for each item
- ✅ Assign items to categories
- ✅ Mark items as available/unavailable
- ✅ Edit and delete items
- ✅ View all items in a table format

**Example Menu Items:**
| Name | Category | Price | Available |
|------|----------|-------|-----------|
| Men's Haircut | Hair Cuts | $35 | Yes |
| Women's Cut & Style | Hair Cuts | $55 | Yes |
| Balayage | Coloring | $150 | Yes |
| Keratin Treatment | Treatments | $250 | Yes |

---

## 🛒 Section 2: Order Management

### New Order (`/orders?tab=new`)
**Purpose:** Create new orders for walk-in customers

**Workflow:**
1. Enter cashier name
2. Browse available items (filter by category)
3. Click items to add to cart
4. Adjust quantities (+/- buttons)
5. Remove items if needed
6. Click "Checkout"
7. Select payment method (Cash/Card/Other)
8. Complete order
9. Print receipt (80mm thermal printer)

**Features:**
- ✅ Real-time cart updates
- ✅ Automatic tax calculation (10%)
- ✅ Subtotal, tax, and total display
- ✅ Category filtering
- ✅ Payment method selection
- ✅ Instant receipt generation

**Cart Example:**
```
┌─────────────────────────────┐
│ Current Order               │
├─────────────────────────────┤
│ Men's Haircut          $35  │
│ Qty: [ - ] 1 [ + ]         │
├─────────────────────────────┤
│ Balayage              $150  │
│ Qty: [ - ] 1 [ + ]         │
├─────────────────────────────┤
│ Subtotal:            $185   │
│ Tax (10%):           $18.50 │
│ ─────────────────────────── │
│ TOTAL:              $203.50 │
│                             │
│ [    Checkout    ]          │
└─────────────────────────────┘
```

---

### Order History (`/orders?tab=history`)
**Purpose:** View and track all past orders

**Features:**
- ✅ Complete list of all orders
- ✅ Sort by most recent
- ✅ View order details:
  - Order number
  - Date and time
  - Cashier name
  - Number of items
  - Total amount
  - Payment method
  - Order status

**Table View:**
| Order # | Date | Cashier | Items | Total | Payment | Status |
|---------|------|---------|-------|-------|---------|--------|
| ORD-123 | 04/18 | John | 2 | $203.50 | Cash | Completed |
| ORD-124 | 04/18 | Sarah | 1 | $55.00 | Card | Completed |

---

## 🖨️ Thermal Receipt (80mm)

After completing an order, a receipt is generated and ready to print:

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
│ Men's Cut    1    35.00 │
│ Balayage     1   150.00 │
├─────────────────────────┤
│ Subtotal:       185.00  │
│ Tax (10%):     18.50   │
│ TOTAL:        203.50   │
├─────────────────────────┤
│ Payment: cash           │
│ Status: completed       │
├─────────────────────────┤
│  Thank you for visiting!│
│   Please come again     │
└─────────────────────────┘
```

---

## 🔄 Typical Workflow

### For Cashiers (Order Processing):
```
Customer arrives
    ↓
Go to "New Order" in sidebar
    ↓
Enter your name
    ↓
Select services requested
    ↓
Review cart & quantities
    ↓
Click Checkout
    ↓
Select payment method
    ↓
Complete order
    ↓
Print receipt
    ↓
Give receipt to customer
```

### For Managers (Inventory Updates):
```
Add new service
    ↓
Go to "Categories" (if needed)
    ↓
Create/update category
    ↓
Go to "Menu Items"
    ↓
Add new service with price
    ↓
Assign to category
    ↓
Mark as available
    ↓
Service now appears in orders
```

---

## 🎨 UI Features

### Sidebar:
- **Collapsible** - Click arrow to expand/collapse
- **Active State** - Current page highlighted in primary color
- **Icons** - Visual indicators for each menu item
- **Sections** - Clear grouping of related features

### Pages:
- **Clean Design** - Modern, professional interface
- **Responsive** - Works on different screen sizes
- **Real-time Updates** - Changes reflect immediately
- **User-Friendly** - Intuitive navigation and forms

---

## 📊 Data Storage

All data is stored in `data/salon-data.json`:

```json
{
  "categories": [...],
  "menuItems": [...],
  "orders": [...]
}
```

**Benefits:**
- ✅ Easy to backup
- ✅ Version control friendly
- ✅ No database setup required
- ✅ Fast and simple

---

## 🚀 Quick Start

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Access the application:**
   - Open browser to `http://localhost:3000`

3. **Navigate using sidebar:**
   - Click menu items to switch between sections
   - Collapse sidebar for more workspace

4. **Start managing:**
   - Add categories and menu items first
   - Then start processing orders

---

## 💡 Tips & Best Practices

### For Daily Operations:
1. **Always enter cashier name** before creating orders
2. **Double-check quantities** before checkout
3. **Print receipts** for all completed orders
4. **Review order history** at end of day

### For Inventory Management:
1. **Create categories first**, then add menu items
2. **Keep items updated** - mark unavailable items
3. **Use clear names** for easy identification
4. **Regular backup** of `data/salon-data.json`

### For Thermal Printing:
1. **Set printer to 80mm** paper size
2. **Use minimum margins** in print settings
3. **Disable headers/footers** in browser print
4. **Test print** before busy periods

---

## 📞 Support

For issues or questions:
- Check `ORDER_MANAGEMENT.md` for detailed documentation
- Review data in `data/salon-data.json`
- Check browser console for errors

---

**Your complete salon management system is ready!** 🎉

Access it at: `http://localhost:3000`
