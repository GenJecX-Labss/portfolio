import { ResourceLanding } from '@/components/marketing/MarketingSections';
import { EditorialFramework } from '@/components/enrichment/ContentEnrichment';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Blogs', description: 'Genjecx perspectives on intelligent systems, engineering, research and company building.', alternates: { canonical: '/blogs' } };
export default function BlogsPage() { return <><ResourceLanding type="blogs" /><EditorialFramework /></>; }
