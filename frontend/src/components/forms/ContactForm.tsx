'use client';

import { useState } from 'react';
import { useSubmitContact, useAnalytics } from '@/lib/api';
import type { ContactType } from '@/lib/api';

interface ContactFormProps {
  theme?: 'light' | 'dark';
  showContactTypes?: boolean;
  defaultContactType?: ContactType;
}

export default function ContactForm({
  theme = 'light',
  showContactTypes = true,
  defaultContactType = 'general',
}: ContactFormProps) {
  const { mutate: submitContact, loading, error, data } = useSubmitContact();
  const { trackCtaClick } = useAnalytics();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    contact_type: defaultContactType as ContactType,
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await trackCtaClick('contact_form_submit');
      await submitContact(formData);
    } catch (err) {
      console.error('Failed to submit contact form:', err);
    }
  };

  // Theme-based styles
  const styles = {
    light: {
      container: 'bg-white border border-[#E5E7EB]',
      label: 'text-[#0F172A]',
      input:
        'bg-[#FAFAFA] border-[#E5E7EB] text-[#0F172A] placeholder-[#9CA3AF] focus:border-[#0F172A]',
      button: 'bg-[#0F172A] text-white hover:bg-[#1E293B]',
      error: 'bg-red-50 border-red-200 text-red-700',
    },
    dark: {
      container: 'bg-[#1F2937] border border-[#374151]',
      label: 'text-white',
      input:
        'bg-[#111827] border-[#4B5563] text-white placeholder-[#9CA3AF] focus:border-[#6B7280]',
      button: 'bg-white text-[#0F172A] hover:bg-[#E5E7EB]',
      error: 'bg-red-900/50 border-red-500 text-red-300',
    },
  };

  const s = styles[theme];

  // Show success message
  if (data?.success) {
    return (
      <div className={`${s.container} p-8 rounded-lg text-center`}>
        <div className="mb-4">
          <svg
            className="w-12 h-12 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${s.label}`}>
          Message Sent!
        </h3>
        <p className={theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#475569]'}>
          {data.message}
        </p>
      </div>
    );
  }

  return (
    <div className={`${s.container} p-8 rounded-lg`}>
      {error && (
        <div className={`mb-6 p-4 border rounded-md ${s.error}`}>
          <p className="text-sm">
            {error.message || 'Failed to submit. Please try again.'}
          </p>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${s.label}`}>
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${s.input}`}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${s.label}`}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${s.input}`}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${s.label}`}>
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${s.input}`}
              placeholder="Your company"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${s.label}`}>
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${s.input}`}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {showContactTypes && (
          <div>
            <label className={`block text-sm font-medium mb-2 ${s.label}`}>
              Inquiry Type *
            </label>
            <select
              name="contact_type"
              value={formData.contact_type}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${s.input}`}
            >
              <option value="general">General Inquiry</option>
              <option value="audit_request">Audit Request</option>
              <option value="partnership">Partnership</option>
              <option value="employment">Employment</option>
              <option value="press">Press/Media</option>
            </select>
          </div>
        )}

        <div>
          <label className={`block text-sm font-medium mb-2 ${s.label}`}>
            Subject *
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${s.input}`}
            placeholder="How can we help?"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${s.label}`}>
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            rows={4}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${s.input}`}
            placeholder="Tell us more about your project or inquiry..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-6 py-3 font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${s.button}`}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
