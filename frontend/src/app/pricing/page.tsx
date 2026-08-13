import { PricingExperience } from '@/components/marketing/MarketingSections';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Engagements', description: 'Explore Genjecx advisory, intelligent systems, infrastructure and custom R&D engagement models.', alternates: { canonical: '/pricing' } };
export default function PricingPage() { return <PricingExperience />; }
