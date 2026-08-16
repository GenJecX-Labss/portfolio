import WhatWeBuild from '@/components/neural-studio/WhatWeBuild';
import { NeuralStudioPhase21 } from '@/components/neural-studio/NeuralStudioPhase21';
import { PageHero } from '@/components/ui/Primitives';

export default function NeuralStudioPage() {
  return (
    <div className="w-full">
      <PageHero kicker="Neural Studio" title={<>Where we investigate what comes after the <em>API call.</em></>} copy="Neural Studio is GenJecX's research environment for exploring models, neural architectures, inference systems and forms of intelligence that don’t fit neatly inside an existing API. We use it when the question isn’t simply which model should we use, but what should the model actually be?" />
      <NeuralStudioPhase21 />
      <WhatWeBuild />
    </div>
  );
}
