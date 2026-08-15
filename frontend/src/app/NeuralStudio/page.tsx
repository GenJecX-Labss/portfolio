import StudioIntro from '@/components/neural-studio/StudioIntro';
import WhoThisIsFor from '@/components/neural-studio/WhoThisIsFor';
import WhatWeBuild from '@/components/neural-studio/WhatWeBuild';
import ArchitecturePipeline from '@/components/neural-studio/ArchitecturePipeline';
import DatasetAndTraining from '@/components/neural-studio/DatasetAndTraining';
import IPOwnershipStatement from '@/components/neural-studio/IPOwnershipStatement';
import ResearchNotes from '@/components/neural-studio/ResearchNotes';
import { NeuralStudioArtifact } from '@/components/research/ResearchArtifacts';

export default function NeuralStudioPage() {
  return (
    <div className="w-full">
      {/* Studio Intro */}
      <StudioIntro />
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
