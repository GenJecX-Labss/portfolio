'use client';

import { useState } from 'react';
import { useSubmitAuditRequest, useAnalytics } from '@/lib/api';
import type { AuditType } from '@/lib/api';

export default function AuditCTA() {
  const { mutate: submitAudit, loading, error, data } = useSubmitAuditRequest();
  const { trackCtaClick } = useAnalytics();
  
  const [formData, setFormData] = useState({
    contact_name: '',
    company_name: '',
    contact_email: '',
    contact_phone: '',
    company_website: '',
    audit_type: 'architecture_review' as AuditType,
    project_description: '',
    current_challenges: '',
    preferred_timeline: '',
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
      await trackCtaClick('audit_request_submit');
      await submitAudit(formData);
    } catch (err) {
      console.error('Failed to submit audit request:', err);
    }
  };

  // Show success message after submission
  if (data?.success) {
    return (
      <section className="px-6 py-20 md:py-28 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-green-400"
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
            <h2 className="text-3xl font-bold text-white mb-4">
              Request Submitted Successfully
            </h2>
            <p className="text-lg text-[#E5E7EB] max-w-xl mx-auto">
              {data.message}
            </p>
            {data.request_id && (
              <p className="mt-4 text-sm text-[#9CA3AF]">
                Reference ID: #{data.request_id}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-20 md:py-28 bg-[#0F172A]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Request an Architecture Audit
          </h2>
          <p className="text-lg text-[#E5E7EB]">
            Tell us about your systems. We will schedule a call to understand scope
            and timeline.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-[#1F2937] p-8 rounded-lg border border-[#374151]">
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-md">
              <p className="text-red-300 text-sm">
                {error.message || 'Failed to submit request. Please try again.'}
              </p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#111827] border border-[#4B5563] rounded-md text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#334155]"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#111827] border border-[#4B5563] rounded-md text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#334155]"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#111827] border border-[#4B5563] rounded-md text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#334155]"
                  placeholder="email@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#111827] border border-[#4B5563] rounded-md text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#334155]"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Company Website
                </label>
                <input
                  type="url"
                  name="company_website"
                  value={formData.company_website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#111827] border border-[#4B5563] rounded-md text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#334155]"
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Audit Type *
                </label>
                <select
                  name="audit_type"
                  value={formData.audit_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#111827] border border-[#4B5563] rounded-md text-white focus:outline-none focus:border-[#334155]"
                >
                  <option value="architecture_review">Architecture Review</option>
                  <option value="ml_model_review">ML Model Review</option>
                  <option value="code_review">Code Review</option>
                  <option value="performance_audit">Performance Audit</option>
                  <option value="security_audit">Security Audit</option>
                  <option value="custom">Custom Audit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tell us about your systems *
              </label>
              <textarea
                name="project_description"
                value={formData.project_description}
                onChange={handleChange}
                required
                minLength={50}
                rows={4}
                className="w-full px-4 py-2 bg-[#111827] border border-[#4B5563] rounded-md text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#334155]"
                placeholder="What AI systems are you running? What technologies are involved? (min 50 characters)"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Current Challenges
              </label>
              <textarea
                name="current_challenges"
                value={formData.current_challenges}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 bg-[#111827] border border-[#4B5563] rounded-md text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#334155]"
                placeholder="What issues or concerns do you have with your current systems?"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Preferred Timeline
              </label>
              <input
                type="text"
                name="preferred_timeline"
                value={formData.preferred_timeline}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#111827] border border-[#4B5563] rounded-md text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#334155]"
                placeholder="e.g., Within 2 weeks, Q1 2024, ASAP"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-white text-[#0F172A] font-semibold rounded-md hover:bg-[#E5E7EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Request Audit'}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#E5E7EB] text-sm">
            Or email us directly at{' '}
            <a
              href="mailto:genjecx@gmail.com"
              className="text-white font-medium hover:underline"
            >
              genjecx@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}