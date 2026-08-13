import { CareersExperience } from '@/components/company/CompanyPages';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Careers', description: 'Learn about the research, engineering and systems-thinking environment Genjecx is building.', alternates: { canonical: '/careers' } };
export default function CareersPage() { return <CareersExperience />; }
