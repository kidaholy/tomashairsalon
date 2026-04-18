'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, redirect to orders page
    window.location.href = '/orders';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-5">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-primary mb-2">Tomas</h1>
          <p className="text-gray-600">Sign in to manage orders</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="admin@tomas.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo: Use any email and password to login</p>
        </div>
      </div>
    </div>
  );
}
