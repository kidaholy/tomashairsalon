'use client';

import { useState } from 'react';
import { Contact, Service } from '@/types/salon';

interface ContactSectionProps {
  contact: Contact;
  services: Service[];
}

export default function ContactSection({ contact, services }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your booking request! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', service: '', date: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-5">
        <h2 className="section-title text-center">{contact.title}</h2>
        <p className="section-subtitle text-center">{contact.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-3">📍 Location</h3>
              <p className="text-gray-600">
                {contact.location.address}
                <br />
                {contact.location.city}
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold mb-3">📞 Phone</h3>
              <p className="text-gray-600">{contact.phone}</p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold mb-3">📧 Email</h3>
              <p className="text-gray-600">{contact.email}</p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold mb-3">🕒 Hours</h3>
              <p className="text-gray-600">
                {contact.hours.weekdays}
                <br />
                {contact.hours.saturday}
                <br />
                {contact.hours.sunday}
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - ${service.price}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              name="message"
              placeholder="Special Requests"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
            <button type="submit" className="btn-primary w-full">
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
