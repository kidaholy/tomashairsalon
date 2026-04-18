# MongoDB Setup for Tomas Hair Salon

## Database Connection

Your MongoDB Atlas connection has been configured with the following database:
- **Database Name:** `tomashair`
- **Connection String:** Stored securely in `.env.local`

## Collections Structure

The database contains the following collections:
- `salon` - Salon information (name, tagline, description)
- `navigation` - Navigation menu items
- `hero` - Hero section content
- `about` - About section content and stats
- `services` - Array of services offered
- `team` - Team members information
- `testimonials` - Customer testimonials
- `gallery` - Gallery items
- `contact` - Contact information
- `footer` - Footer content

## Initial Setup

### 1. Seed the Database

To populate MongoDB with your existing data from `salon-data.json`:

```bash
npm run seed
```

This will:
- Read data from `data/salon-data.json`
- Connect to MongoDB Atlas
- Create all collections
- Insert the data

### 2. Verify Connection

After seeding, you can test the API endpoints:

```bash
# Start the development server
npm run dev

# Test the API in your browser
http://localhost:3000/api/salon-data
```

## API Endpoints

### Get All Salon Data
```
GET /api/salon-data
```

### Services
```
GET /api/services          - Get all services
POST /api/services         - Create a new service
PUT /api/services          - Update a service (body: { id, ...data })
DELETE /api/services?id=xx - Delete a service
```

### Team Members
```
GET /api/team              - Get all team members
```

### Testimonials
```
GET /api/testimonials      - Get all testimonials
```

### Gallery
```
GET /api/gallery           - Get all gallery items
```

## Database Management

### View Data in MongoDB Atlas
1. Login to your MongoDB Atlas account
2. Navigate to your cluster
3. Click "Browse Collections"
4. Select the `tomashair` database

### Update Data
You can:
1. Use the dashboard UI (when implemented)
2. Use MongoDB Compass
3. Use the MongoDB Atlas web interface
4. Call the API endpoints

## Environment Variables

The `.env.local` file contains:
```
MONGODB_URI=mongodb+srv://kidayos2014:holyunion@cluster0.ingwuuj.mongodb.net/tomashair?retryWrites=true&w=majority
```

**Important:** Never commit `.env.local` to version control!

## File Structure

```
lib/
├── mongodb.ts      - MongoDB client connection
├── database.ts     - Database operations and CRUD functions
└── data.ts         - Data fetching (now uses MongoDB)

app/api/
├── salon-data/     - Get all salon data
├── services/       - Services CRUD
├── team/           - Team members
├── testimonials/   - Testimonials
└── gallery/        - Gallery items

scripts/
└── seed.ts         - Database seeding script
```

## Next Steps

1. ✅ MongoDB connection established
2. ✅ Database models created
3. ✅ API endpoints created
4. ✅ Seed script ready
5. ⏳ Update dashboard to use MongoDB
6. ⏳ Add authentication
7. ⏳ Add CRUD operations in dashboard UI

## Troubleshooting

### Connection Issues
- Verify your IP is whitelisted in MongoDB Atlas
- Check that the connection string in `.env.local` is correct
- Ensure MongoDB Atlas cluster is running

### Seed Script Fails
- Make sure `.env.local` exists with correct MONGODB_URI
- Check that `data/salon-data.json` exists and is valid JSON
- Run `npm run seed` from the project root

### Type Errors
- Run `npm install` to ensure all dependencies are installed
- TypeScript types are properly configured in the database functions
