import { DocsShell } from '@/components/docs/DocsShell';
import ResearchIntro from '@/components/research/ResearchIntro';
import ResearchAreas from '@/components/research/ResearchAreas';
import ModelTaxonomy from '@/components/research/ModelTaxonomy';
import ModelUsagePhilosophy from '@/components/research/ModelUsagePhilosophy';
import FailureModesAndLimits from '@/components/research/FailureModesAndLimits';
import MentalHealthInitiative from '@/components/research/MentalHealthInitiative';
import { TechnicalExploration } from '@/components/research/ResearchEnrichment';
import { ResearchModelsArtifact } from '@/components/research/ResearchArtifacts';
export default function ModelsDocsPage() { return <DocsShell eyebrow="Docs / Research" title="Research & Models" description="A detailed look at the model work, research principles and constraints that inform our systems."><ResearchIntro/><ResearchModelsArtifact/><ResearchAreas/><TechnicalExploration/><ModelTaxonomy/><ModelUsagePhilosophy/><FailureModesAndLimits/><MentalHealthInitiative/></DocsShell>; }
