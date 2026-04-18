# JSON Data Management System

## Overview

Your hair salon website now has a **fully functional CRUD (Create, Read, Update, Delete) system** for managing **Categories** and **Menu Items** using JSON files. No database required!

## ✅ Features

- ✅ **Add** new categories and menu items
- ✅ **Edit** existing data
- ✅ **Delete** unwanted items
- ✅ **View** all data in an organized dashboard
- ✅ **Real-time updates** - Changes are immediately reflected on the website
- ✅ **Persistent storage** - All data saved to `data/salon-data.json`

## 📁 File Structure

```
lib/
└── json-data.ts              # CRUD functions for JSON file

app/
└── api/
    └── json/
        ├── categories/route.ts   # Categories API
        └── menu/route.ts         # Menu Items API

app/
└── dashboard/
    └── page.tsx              # CRUD dashboard UI

data/
└── salon-data.json           # Your data storage
```

## 🚀 How to Use

### 1. Access the Dashboard

Open your browser and go to:
```
http://localhost:3000/dashboard
```

### 2. Navigate Tabs

The dashboard has 2 tabs:
- **Categories** - Manage categories (for organizing menu items)
- **Menu Items** - Manage menu/pricing items

### 3. Add New Items

1. Click the **"Add [Item Type]"** button
2. Fill in the form fields
3. Click **"Create"**
4. Item is saved and appears immediately

### 4. Edit Existing Items

1. Click **"Edit"** button on any item
2. Modify the fields
3. Click **"Update"**
4. Changes are saved

### 5. Delete Items

1. Click **"Delete"** button on any item
2. Confirm the deletion
3. Item is removed

## 🔌 API Endpoints

All endpoints are under `/api/json/`

### Services
```
GET    /api/json/services          # Get all services
POST   /api/json/services          # Create service
PUT    /api/json/services          # Update service (body: { id, ...updates })
DELETE /api/json/services?id=xxx   # Delete service
```

### Team Members
```
GET    /api/json/team              # Get all team members
POST   /api/json/team              # Create team member
PUT    /api/json/team              # Update team member
DELETE /api/json/team?id=xxx       # Delete team member
```

### Testimonials
```
GET    /api/json/testimonials      # Get all testimonials
POST   /api/json/testimonials      # Create testimonial
PUT    /api/json/testimonials      # Update testimonial
DELETE /api/json/testimonials?id=x # Delete testimonial
```

### Gallery
```
GET    /api/json/gallery           # Get all gallery items
POST   /api/json/gallery           # Create gallery item
PUT    /api/json/gallery           # Update gallery item
DELETE /api/json/gallery?id=xxx    # Delete gallery item
```

### Categories
```
GET    /api/json/categories        # Get all categories
POST   /api/json/categories        # Create category
PUT    /api/json/categories        # Update category
DELETE /api/json/categories?id=xxx # Delete category
```

### Menu Items
```
GET    /api/json/menu              # Get all menu items
POST   /api/json/menu              # Create menu item
PUT    /api/json/menu              # Update menu item
DELETE /api/json/menu?id=xxx       # Delete menu item
```

## 📝 Data Structure

### Service
```json
{
  "id": "haircut",
  "name": "Haircuts & Styling",
  "description": "Expert cuts and styling",
  "price": 50,
  "icon": "✂️",
  "duration": "45-60 min"
}
```

### Team Member
```json
{
  "id": 1,
  "name": "Sarah Johnson",
  "role": "Senior Stylist",
  "bio": "15+ years experience",
  "specialties": ["Haircuts", "Coloring"],
  "image": "/images/team/sarah.jpg"
}
```

### Testimonial
```json
{
  "id": 1,
  "name": "Jessica M.",
  "rating": 5,
  "text": "Amazing experience!",
  "service": "Color & Highlights"
}
```

### Gallery Item
```json
{
  "id": 1,
  "title": "Balayage Transformation",
  "category": "Color",
  "image": "/images/gallery/1.jpg"
}
```

### Category
```json
{
  "id": "1",
  "name": "Haircuts",
  "description": "Professional cutting services"
}
```

### Menu Item
```json
{
  "id": "1",
  "name": "Men's Haircut",
  "description": "Classic cut with styling",
  "price": 35,
  "categoryId": "1",
  "available": true
}
```

## 💡 Tips

1. **Always provide unique IDs** - When creating new items, use unique identifiers
2. **Backup your data** - Copy `data/salon-data.json` before making bulk changes
3. **Use emojis for service icons** - They display beautifully in the UI
4. **Images** - Store images in `public/images/` and reference with paths like `/images/gallery/1.jpg`
5. **Categories first** - Create categories before adding menu items that reference them

## 🔒 Security Note

Currently, the dashboard is publicly accessible. For production:
- Add authentication/login
- Restrict access to authorized users only
- Consider rate limiting API endpoints

## 🎯 Example: Add a New Service

**Via Dashboard:**
1. Go to `/dashboard`
2. Click "Services" tab
3. Click "Add Service"
4. Fill in:
   - ID: `keratin`
   - Name: `Keratin Treatment`
   - Description: `Smooth, frizz-free hair`
   - Price: `250`
   - Icon: `✨`
   - Duration: `2-3 hours`
5. Click "Create"

**Via API:**
```bash
curl -X POST http://localhost:3000/api/json/services \
  -H "Content-Type: application/json" \
  -d '{
    "id": "keratin",
    "name": "Keratin Treatment",
    "description": "Smooth, frizz-free hair",
    "price": 250,
    "icon": "✨",
    "duration": "2-3 hours"
  }'
```

## 🔄 How It Works

1. **Dashboard UI** makes HTTP requests to API endpoints
2. **API Routes** call functions in `lib/json-data.ts`
3. **CRUD Functions** read/write to `data/salon-data.json`
4. **Changes persist** immediately to the file
5. **Website reflects** changes on next page load

## 🎉 Benefits

- **No database setup required**
- **Easy to backup** (just copy one file)
- **Version control friendly** (JSON diffs in Git)
- **Fast development** (no DB migrations)
- **Perfect for small-medium sites**

---

**Your fully manageable system is ready! Visit http://localhost:3000/dashboard** 🚀
