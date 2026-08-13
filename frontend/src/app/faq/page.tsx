import { FAQExperience } from '@/components/company/CompanyPages';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'FAQ', description: 'Answers to practical questions about Genjecx, intelligent systems, architecture and long-term engagements.', alternates: { canonical: '/faq' } };
export default function FAQPage() { return <FAQExperience />; }
