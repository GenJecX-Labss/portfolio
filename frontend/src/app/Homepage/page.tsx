import HeroSection from '@/components/home/HeroSection';
import CredibilityStrip from '@/components/home/Credibility';
import WhatWeDo from '@/components/home/WhatWeDo';
import PhilosophyBlock from '@/components/home/PhilosophyBlock';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Credibility Strip */} 
      <CredibilityStrip />

      {/* What We Do */}
      <WhatWeDo />

      {/* Philosophy Block */}
      <PhilosophyBlock />
    </div>
  );
}