import { ResourceLanding } from '@/components/marketing/MarketingSections';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Templates', description: 'Practical Genjecx starting points for intelligent systems and reusable technical knowledge.', alternates: { canonical: '/templates' } };
export default function TemplatesPage() { return <ResourceLanding type="templates" />; }
