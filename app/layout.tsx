import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LUXE Hair Salon | Premium Hair Care & Styling',
  description: 'Experience luxury hair care with our expert stylists. Professional haircuts, coloring, treatments, and bridal services.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
