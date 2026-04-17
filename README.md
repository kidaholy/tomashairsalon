# LUXE Hair Salon - Next.js Landing Page

A modern, full-stack hair salon landing page built with Next.js, TypeScript, and Tailwind CSS, with data managed through JSON files.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-friendly
- ⚡ Server-side rendering with Next.js
- 📝 Data management via JSON files
- 🎯 TypeScript for type safety
- 💅 Tailwind CSS for styling
- ✨ Smooth animations and transitions
- 📅 Booking form with validation

## Project Structure

```
hair salon/
├── app/
│   ├── components/          # React components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── FooterSection.tsx
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main page
│   └── globals.css          # Global styles
├── data/
│   └── salon-data.json      # All salon data
├── lib/
│   └── data.ts              # Data fetching utilities
├── types/
│   └── salon.ts             # TypeScript interfaces
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install Dependencies**

   Double-click `install.bat` file or run:
   ```bash
   "C:\Program Files\nodejs\npm.cmd" install
   ```

2. **Run Development Server**

   Double-click `dev.bat` file or run:
   ```bash
   "C:\Program Files\nodejs\npm.cmd" run dev
   ```

3. **Open Browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Data Management

All content is managed through the JSON file at `data/salon-data.json`. You can easily update:

- Salon information
- Navigation menu
- Hero section content
- About section
- Services and pricing
- Team members
- Testimonials
- Gallery items
- Contact information
- Footer content

### Example: Updating Services

Edit `data/salon-data.json`:

```json
{
  "services": [
    {
      "id": "haircut",
      "name": "Haircuts & Styling",
      "description": "Expert cuts and styling",
      "price": 50,
      "icon": "✂️",
      "duration": "45-60 min"
    }
  ]
}
```

## Customization

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#d4a574',    // Main brand color
  secondary: '#2c2c2c',  // Dark text
  accent: '#f5e6d3',     // Light accent
}
```

### Fonts

The project uses Google Fonts:
- **Playfair Display** - Headings
- **Poppins** - Body text

Update in `app/globals.css`

## Building for Production

```bash
"C:\Program Files\nodejs\npm.cmd" run build
"C:\Program Files\nodejs\npm.cmd" start
```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data**: JSON files
- **Runtime**: Node.js

## Pages & Sections

1. **Hero** - Eye-catching landing section with CTA buttons
2. **About** - Company information and statistics
3. **Services** - Service cards with pricing
4. **Gallery** - Portfolio showcase
5. **Team** - Staff profiles
6. **Testimonials** - Customer reviews
7. **Contact** - Booking form and contact info
8. **Footer** - Links and social media

## API Routes (Future Enhancement)

You can add API routes in `app/api/` to:
- Handle form submissions
- Manage bookings
- Process payments
- Send emails

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions, please create an issue in the repository.
