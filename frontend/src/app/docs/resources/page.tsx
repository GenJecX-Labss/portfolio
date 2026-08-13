import { DocsShell } from '@/components/docs/DocsShell';
import { DecisionGuides, ResourcesContext } from '@/components/enrichment/ContentEnrichment';

export default function ResourcesDocsPage() {
  return <DocsShell eyebrow="Docs / Resources" title="Resources & Ecosystem" description="The technology, reusable patterns, research and ecosystem context around GenJecX systems."><ResourcesContext /><DecisionGuides /></DocsShell>;
}
