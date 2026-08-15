import { DocsShell } from '@/components/docs/DocsShell';
import { DecisionGuides, ResourcesContext } from '@/components/enrichment/ContentEnrichment';

export default function ResourcesDocsPage() {
  return <DocsShell eyebrow="Docs / Resources" title="Resources & Decision Guides" description="Technical resources for understanding AI systems before committing engineering time or money."><ResourcesContext /><DecisionGuides /></DocsShell>;
}
