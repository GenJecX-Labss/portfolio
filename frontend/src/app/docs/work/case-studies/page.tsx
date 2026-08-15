import { DocsShell } from '@/components/docs/DocsShell';
import CaseStudiesList from '@/components/case-studies/CaseStudiesList';
import { CaseStudyFramework } from '@/components/enrichment/SystemEnrichment';
export default function CaseStudiesDocsPage() { return <DocsShell eyebrow="Docs / Work" title="What Happens When AI Becomes a System" description="We don’t treat AI as a feature added to a product. We design the intelligence, knowledge, architecture, infrastructure and evaluation that make capability useful."><CaseStudyFramework/><CaseStudiesList/></DocsShell>; }
