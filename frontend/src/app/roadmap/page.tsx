import { RoadmapExperience } from '@/components/company/CompanyPages';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Roadmap', description: 'Explore the direction of Genjecx across intelligent systems, research and infrastructure.', alternates: { canonical: '/roadmap' } };
export default function RoadmapPage() { return <RoadmapExperience />; }
