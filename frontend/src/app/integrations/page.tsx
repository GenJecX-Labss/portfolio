import { IntegrationsExperience } from '@/components/marketing/MarketingSections';
import { EcosystemConversation } from '@/components/enrichment/SystemEnrichment';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Integrations', description: 'Understand how Genjecx systems connect with your data, infrastructure, APIs and existing business environment.', alternates: { canonical: '/integrations' } };
export default function IntegrationsPage() { return <><IntegrationsExperience /><EcosystemConversation /></>; }
