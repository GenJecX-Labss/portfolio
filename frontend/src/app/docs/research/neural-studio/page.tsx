import { DocsShell } from '@/components/docs/DocsShell';
import WhoThisIsFor from '@/components/neural-studio/WhoThisIsFor';
import WhatWeBuild from '@/components/neural-studio/WhatWeBuild';
import ArchitecturePipeline from '@/components/neural-studio/ArchitecturePipeline';
import DatasetAndTraining from '@/components/neural-studio/DatasetAndTraining';
import IPOwnershipStatement from '@/components/neural-studio/IPOwnershipStatement';
import ResearchNotes from '@/components/neural-studio/ResearchNotes';
import { NeuralStudioArtifact } from '@/components/research/ResearchArtifacts';
export default function NeuralStudioDocsPage() { return <DocsShell eyebrow="Docs / Research" title="Neural Studio" description="A focused environment for exploring neural architectures, training approaches, inference behavior, specialized models and hybrid intelligence systems where generic AI reaches its limits."><NeuralStudioArtifact/><WhoThisIsFor/><WhatWeBuild/><ArchitecturePipeline/><DatasetAndTraining/><IPOwnershipStatement/><ResearchNotes/></DocsShell>; }
