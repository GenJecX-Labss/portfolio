'use client';

import Link from 'next/link';
import { useAnalytics } from '@/lib/api';

export default function HeroSection() {
  const { trackCtaClick } = useAnalytics();

  const handleExploreClick = () => {
    trackCtaClick('hero_explore_neural_studio');
  };

  const handleAuditClick = () => {
    trackCtaClick('hero_request_audit');
  };

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
          We design, train, and deploy custom intelligence systems - not API wrappers.
        </h1>

        {/* Subheading */}
        <p className="text-xl text-[#475569] mb-12 leading-relaxed max-w-2xl">
          GenJecX builds proprietary AI systems grounded in research, custom neural models, and enterprise-grade architecture for organizations requiring intelligence beyond off-the-shelf solutions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="/NeuralStudio"
            onClick={handleExploreClick}
            className="inline-flex items-center justify-center px-6 py-3 bg-[#0F172A] text-white font-medium rounded-md hover:bg-[#1E293B] transition-colors"
          >
            Explore Neural Studio
          </Link>
          <Link
            href="/ArchitectureAudit"
            onClick={handleAuditClick}
            className="inline-flex items-center justify-center px-6 py-3 border border-[#334155] text-[#334155] font-medium rounded-md hover:bg-[#F9FAFB] transition-colors"
          >
            Request Architecture Audit
          </Link>
        </div>
      </div>
    </section>
  );
}