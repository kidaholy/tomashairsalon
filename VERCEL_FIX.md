# Vercel Deployment Fix - MongoDB Setup

## Problem
Your app was using JSON file storage (`fs` module) which doesn't work on Vercel because:
- Vercel uses serverless functions
- Serverless functions can't write to the file system
- File changes don't persist between requests

## Solution
I've converted your app to use MongoDB instead of JSON files. MongoDB works perfectly on Vercel.

## What Changed

### New Files Created:
- `lib/database-orders.ts` - MongoDB CRUD operations for categories, menu items, and orders

### Files Updated:
- `app/api/json/orders/route.ts` - Now uses MongoDB
- `app/api/json/categories/route.ts` - Now uses MongoDB  
- `app/api/json/menu/route.ts` - Now uses MongoDB

## Setup Steps

### 1. Get MongoDB Connection String
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (or use existing one)
3. Click "Connect" → "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

### 2. Add Environment Variable to Vercel
1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `MONGODB_URL`
   - **Value**: Your MongoDB connection string
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**

### 3. Redeploy on Vercel
1. Push your changes to Git:
   ```bash
   git add .
   git commit -m "Switch to MongoDB for data persistence"
   git push
   ```
2. Vercel will automatically redeploy
3. Wait for deployment to complete

### 4. Initialize Database (First Time Only)
After deployment, you need to add your initial data:

**Option A: Using the UI**
1. Go to your deployed app
2. Navigate to Inventory page
3. Add your categories
4. Add your menu items
5. Start creating orders!

**Option B: Using Seed Script** (if you have initial data)
1. Update your `data/salon-data.json` with initial data
2. Run the seed script locally:
   ```bash
   node scripts/seed.js
   ```

## Local Development

For local development, you also need the `MONGODB_URL` environment variable:

1. Create a `.env.local` file in your project root:
   ```
   MONGODB_URL=your_mongodb_connection_string_here
   ```

2. Run your dev server:
   ```bash
   npm run dev
   ```

## Testing

### Test Locally:
```bash
npm run dev
```
- Go to Inventory page
- Add a category
- Add a menu item
- Create an order
- Everything should work!

### Test on Vercel:
1. Visit your deployed app URL
2. Try creating an order
3. Check order history
4. It should work perfectly now!

## Troubleshooting

### Error: "MongoDB not configured"
- Make sure `MONGODB_URL` environment variable is set in Vercel
- Check that the connection string is correct
- Verify MongoDB Atlas allows connections from all IPs (0.0.0.0/0)

### Error: "Failed to create order"
- Check Vercel logs for detailed error messages
- Verify MongoDB connection is working
- Make sure collections exist (they'll be created automatically)

### Data Not Persisting
- MongoDB should persist data automatically
- Check if `MONGODB_URL` is correctly set
- Verify MongoDB Atlas cluster is running

## Benefits of MongoDB on Vercel

✅ Data persists between requests
✅ Works with serverless functions
✅ Scalable and reliable
✅ Free tier available (512MB)
✅ Automatic backups
✅ Works in all environments

## Migration from JSON to MongoDB

If you have existing data in `data/salon-data.json`:

1. The app will start with empty MongoDB collections
2. You'll need to re-add your data through the UI
3. OR use the seed script to import existing data
4. JSON file is no longer used for production

## Next Steps

1. ✅ Get MongoDB connection string
2. ✅ Add `MONGODB_URL` to Vercel
3. ✅ Push code to Git
4. ✅ Wait for Vercel deployment
5. ✅ Test your app
6. ✅ Add your inventory data
7. ✅ Start taking orders!

---

**Need Help?**
- Check Vercel deployment logs
- Check MongoDB Atlas logs
- Verify environment variables are set correctly
