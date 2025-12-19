import ResearchIntro from '@/components/research/ResearchIntro';
import ResearchAreas from '@/components/research/ResearchAreas';
import ModelTaxonomy from '@/components/research/ModelTaxonomy';
import ModelUsagePhilosophy from '@/components/research/ModelUsagePhilosophy';
import FailureModesAndLimits from '@/components/research/FailureModesAndLimits';
import MentalHealthInitiative from '@/components/research/MentalHealthInitiative';

export default function ResearchModelsPage() {
  return (
    <div className="w-full">
      {/* Research Intro */}
      <ResearchIntro />

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