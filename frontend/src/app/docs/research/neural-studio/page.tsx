import { DocsShell } from '@/components/docs/DocsShell';
import StudioIntro from '@/components/neural-studio/StudioIntro';
import WhoThisIsFor from '@/components/neural-studio/WhoThisIsFor';
import WhatWeBuild from '@/components/neural-studio/WhatWeBuild';
import ArchitecturePipeline from '@/components/neural-studio/ArchitecturePipeline';
import DatasetAndTraining from '@/components/neural-studio/DatasetAndTraining';
import IPOwnershipStatement from '@/components/neural-studio/IPOwnershipStatement';
import ResearchNotes from '@/components/neural-studio/ResearchNotes';
import { NeuralStudioArtifact } from '@/components/research/ResearchArtifacts';
export default function NeuralStudioDocsPage() { return <DocsShell eyebrow="Docs / Research" title="Neural Studio" description="Experimental intelligence, custom neural systems and the work required to build them responsibly."><StudioIntro/><NeuralStudioArtifact/><WhoThisIsFor/><WhatWeBuild/><ArchitecturePipeline/><DatasetAndTraining/><IPOwnershipStatement/><ResearchNotes/></DocsShell>; }
