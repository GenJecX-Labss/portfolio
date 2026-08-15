import WhoThisIsFor from '@/components/neural-studio/WhoThisIsFor';
import WhatWeBuild from '@/components/neural-studio/WhatWeBuild';
import ArchitecturePipeline from '@/components/neural-studio/ArchitecturePipeline';
import DatasetAndTraining from '@/components/neural-studio/DatasetAndTraining';
import IPOwnershipStatement from '@/components/neural-studio/IPOwnershipStatement';
import ResearchNotes from '@/components/neural-studio/ResearchNotes';
import { NeuralStudioArtifact } from '@/components/research/ResearchArtifacts';
import { PageHero } from '@/components/ui/Primitives';

export default function NeuralStudioPage() {
  return (
    <div className="w-full">
      <PageHero kicker="Neural Studio" title={<>Closer to the <em>Model</em></>} copy="A focused environment for exploring neural architectures, training approaches, inference behavior, specialized models and hybrid intelligence systems for problems where generic AI reaches its limits." />
      <NeuralStudioArtifact />

      {/* Who This Is For */}
      <WhoThisIsFor />

      {/* What We Build */}
      <WhatWeBuild />

      {/* Architecture Pipeline */}
      <ArchitecturePipeline />

      {/* Dataset & Training */}
      <DatasetAndTraining />

      {/* IP Ownership Statement */}
      <IPOwnershipStatement />

      {/* Research Notes */}
      <ResearchNotes />
    </div>
  );
}
