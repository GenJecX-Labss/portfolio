import Link from 'next/link';
import HeroSection from '@/components/home/HeroSection';
import CredibilityStrip from '@/components/home/Credibility';
import WhatWeDo from '@/components/home/WhatWeDo';
import PhilosophyBlock from '@/components/home/PhilosophyBlock';
import Reviews from '@/components/home/Reviews';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Credibility Strip */}
      <CredibilityStrip />

      {/* What We Do */}
      <WhatWeDo />

      {/* Client Reviews */}
      <Reviews />

      {/* Philosophy Block */}
      <PhilosophyBlock />
    </div>
  );
}