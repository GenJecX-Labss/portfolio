import { DocsShell } from '@/components/docs/DocsShell';
import CaseStudiesIntro from '@/components/case-studies/CaseStudiesIntro';
import CaseStudiesList from '@/components/case-studies/CaseStudiesList';
export default function CaseStudiesDocsPage() { return <DocsShell eyebrow="Docs / Work" title="Case Studies" description="Selected systems, their problems and the technical material behind the work."><CaseStudiesIntro/><CaseStudiesList/></DocsShell>; }
