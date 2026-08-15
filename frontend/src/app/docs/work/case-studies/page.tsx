import { DocsShell } from '@/components/docs/DocsShell';
import CaseStudiesIntro from '@/components/case-studies/CaseStudiesIntro';
import CaseStudiesList from '@/components/case-studies/CaseStudiesList';
import { CaseStudyFramework } from '@/components/enrichment/SystemEnrichment';
export default function CaseStudiesDocsPage() { return <DocsShell eyebrow="Docs / Work" title="Case Studies" description="What happens when AI is treated as a system rather than a feature."><CaseStudiesIntro/><CaseStudyFramework/><CaseStudiesList/></DocsShell>; }
