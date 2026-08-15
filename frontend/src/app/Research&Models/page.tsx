import ResearchAreas from '@/components/research/ResearchAreas';
import ModelTaxonomy from '@/components/research/ModelTaxonomy';
import ModelUsagePhilosophy from '@/components/research/ModelUsagePhilosophy';
import FailureModesAndLimits from '@/components/research/FailureModesAndLimits';
import MentalHealthInitiative from '@/components/research/MentalHealthInitiative';
import { ResearchModelsArtifact, ResearchTierIndex } from '@/components/research/ResearchArtifacts';
import { PageHero } from '@/components/ui/Primitives';

export default function ResearchModelsPage() {
  return (
    <div className="w-full">
      <PageHero kicker="Research & Models" title={<>Research That Becomes <em>Systems</em></>} copy="GenJecX investigates models, architectures, knowledge systems, inference, evaluation and intelligence before deciding what should become a product. Some things become products. Some become architectures. Some simply teach us something." />
      <ResearchModelsArtifact />
      <ResearchTierIndex />

      {/* Research Areas */}
      <ResearchAreas />

      {/* Model Taxonomy */}
      <ModelTaxonomy />

      {/* Model Usage Philosophy */}
      <ModelUsagePhilosophy />

      {/* Failure Modes & Limits */}
      <FailureModesAndLimits />

      {/* Mental Health Initiative */}
      <MentalHealthInitiative />
    </div>
  );
}
