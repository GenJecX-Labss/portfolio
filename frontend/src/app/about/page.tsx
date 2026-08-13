import { AboutExperience } from '@/components/company/CompanyPages';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'About', description: 'Learn about Genjecx, an AI R&D studio building intelligent systems and long-term intelligence infrastructure.', alternates: { canonical: '/about' } };
export default function AboutPage() { return <AboutExperience />; }
