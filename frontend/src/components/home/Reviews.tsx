'use client';

import { useState, useEffect } from 'react';

interface Review {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  rating: number;
  is_featured?: boolean;
  created_at?: string;
}

interface ReviewFormData {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  email: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    email: '',
  });

  // Fetch reviews from API
  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/reviews/featured?limit=10`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data || []);
      }
    } catch (error) {
      console.log('Error fetching reviews');
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch(`${API_URL}/api/v1/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage({
          type: 'success',
          text: 'Thank you for your review! It is now visible.',
        });
        setFormData({
          name: '',
          role: '',
          company: '',
          content: '',
          rating: 5,
          email: '',
        });
        // Refresh reviews to show the new one
        await fetchReviews();
        setTimeout(() => {
          setShowForm(false);
          setSubmitMessage(null);
        }, 3000);
      } else {
        throw new Error('Failed to submit review');
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Failed to submit review. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-[#0F172A]">What Clients Say</h2>
            <p className="text-lg text-[#475569] mt-4 max-w-2xl">
              Trusted by teams building serious AI infrastructure.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-[#334155] text-white rounded-lg hover:bg-[#1E293B] transition-colors w-fit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Review
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="mb-12 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-8">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-6">Share Your Experience</h3>
            
            {submitMessage && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitMessage.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    minLength={2}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#334155] focus:border-transparent bg-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#334155] focus:border-transparent bg-white"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Role/Position
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#334155] focus:border-transparent bg-white"
                    placeholder="CTO"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#334155] focus:border-transparent bg-white"
                    placeholder="Acme Inc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="focus:outline-none"
                    >
                      <svg
                        className={`w-8 h-8 ${
                          star <= formData.rating ? 'text-[#334155]' : 'text-[#E5E7EB]'
                        } transition-colors`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F172A] mb-2">
                  Your Review *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  minLength={10}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#334155] focus:border-transparent resize-none bg-white"
                  placeholder="Share your experience working with GenJecX..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-[#334155] text-white rounded-lg hover:bg-[#1E293B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 border border-[#E5E7EB] text-[#475569] rounded-lg hover:bg-[#F9FAFB] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-8 md:p-12 text-center">
            <p className="text-[#475569]">Loading reviews...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && reviews.length === 0 && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-8 md:p-12 text-center">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-2">No Reviews Yet</h3>
            <p className="text-[#475569] mb-6">Be the first to share your experience working with GenJecX.</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-[#334155] text-white rounded-lg hover:bg-[#1E293B] transition-colors"
            >
              Add Review
            </button>
          </div>
        )}

        {/* Reviews Carousel */}
        {!isLoading && reviews.length > 0 && (
        <>
        <div className="relative">
          {/* Main Review Card */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-8 md:p-12">
            {/* Rating Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(reviews[activeIndex]?.rating || 5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-[#334155]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-[#0F172A] leading-relaxed mb-8 font-medium break-words overflow-hidden">
              "{reviews[activeIndex]?.content}"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-[#0F172A]">
                  {reviews[activeIndex]?.name}
                </p>
                <p className="text-[#475569]">
                  {reviews[activeIndex]?.role}
                  {reviews[activeIndex]?.role && reviews[activeIndex]?.company && ', '}
                  {reviews[activeIndex]?.company}
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={prevReview}
                  className="w-10 h-10 flex items-center justify-center border border-[#E5E7EB] rounded-full hover:bg-[#F9FAFB] transition-colors"
                  aria-label="Previous review"
                >
                  <svg
                    className="w-5 h-5 text-[#334155]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextReview}
                  className="w-10 h-10 flex items-center justify-center border border-[#E5E7EB] rounded-full hover:bg-[#F9FAFB] transition-colors"
                  aria-label="Next review"
                >
                  <svg
                    className="w-5 h-5 text-[#334155]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === activeIndex ? 'bg-[#334155]' : 'bg-[#E5E7EB]'
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mini Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {reviews
            .filter((_, idx) => idx !== activeIndex)
            .slice(0, 3)
            .map((review) => (
              <div
                key={review.id}
                onClick={() => setActiveIndex(reviews.findIndex((r) => r.id === review.id))}
                className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-6 cursor-pointer hover:border-[#334155] transition-colors"
              >
                <p className="text-[#475569] text-sm line-clamp-3 mb-4">
                  "{review.content}"
                </p>
                <p className="text-sm font-semibold text-[#0F172A]">{review.name}</p>
                <p className="text-xs text-[#475569]">{review.company}</p>
              </div>
            ))}
        </div>
        </>
        )}
      </div>
    </section>
  );
}
