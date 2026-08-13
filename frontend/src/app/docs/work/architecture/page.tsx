import { DocsShell } from '@/components/docs/DocsShell';
import ArchitecturePipeline from '@/components/neural-studio/ArchitecturePipeline';
import { ArchitectureLayers, ArchitecturePatterns, IntelligenceStack } from '@/components/enrichment/SystemEnrichment';
import { Button } from '@/components/ui/Primitives';
export default function ArchitectureDocsPage() { return <DocsShell eyebrow="Docs / Work" title="Architecture" description="An intelligence system is more than a model. It is the data, decisions, constraints and feedback loops around it."><IntelligenceStack focus="infrastructure" /><ArchitectureLayers /><ArchitecturePatterns /><ArchitecturePipeline /><Button href="/docs/work/architecture-audits">Request an architecture audit</Button></DocsShell>; }
