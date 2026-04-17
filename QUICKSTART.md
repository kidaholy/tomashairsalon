# QUICK START GUIDE

## Step 1: Install Dependencies
Double-click: install.bat
Or run in terminal: "C:\Program Files\nodejs\npm.cmd" install

## Step 2: Start Development Server
Double-click: dev.bat
Or run in terminal: "C:\Program Files\nodejs\npm.cmd" run dev

## Step 3: View Your Website
Open browser: http://localhost:3000

## Step 4: Edit Content
Open file: data/salon-data.json
- Change text, prices, services, team members, etc.
- Save the file
- The website updates automatically!

## Common Edits:

### Change Salon Name
In data/salon-data.json, find:
"name": "LUXE"
Change to your salon name

### Change Services
In data/salon-data.json, edit the "services" array:
- name: Service name
- price: Price in dollars
- description: Service description

### Change Colors
In tailwind.config.js:
- primary: Your main brand color
- secondary: Dark text color
- accent: Light accent color

## Need Help?
Check README.md for detailed documentation
