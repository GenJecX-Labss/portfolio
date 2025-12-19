'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Neural Studio', href: '/NeuralStudio' },
    { label: 'Research & Models', href: '/Research&Models' },
    { label: 'Case Studies', href: '/CaseStudies' },
    { label: 'Process & Pricing', href: '/Procees&Pricing' },
    { label: 'Founders', href: '/Founders' },
    { label: 'Architecture Audit', href: '/ArchitectureAudit' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-[#FAFAFA] border-b border-[#E5E7EB] z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-[#0F172A]">GenJecX</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#475569] hover:text-[#0F172A] text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <div
            className={`w-6 h-0.5 bg-[#0F172A] transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-[#0F172A] transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-[#0F172A] transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#FAFAFA] border-b border-[#E5E7EB]">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#475569] hover:text-[#0F172A] text-sm font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}