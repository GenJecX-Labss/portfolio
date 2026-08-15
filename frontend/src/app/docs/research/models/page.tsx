import { DocsShell } from '@/components/docs/DocsShell';
import ResearchAreas from '@/components/research/ResearchAreas';
import ModelTaxonomy from '@/components/research/ModelTaxonomy';
import ModelUsagePhilosophy from '@/components/research/ModelUsagePhilosophy';
import FailureModesAndLimits from '@/components/research/FailureModesAndLimits';
import MentalHealthInitiative from '@/components/research/MentalHealthInitiative';
import { TechnicalExploration } from '@/components/research/ResearchEnrichment';
import { ResearchModelsArtifact, ResearchTierIndex } from '@/components/research/ResearchArtifacts';
export default function ModelsDocsPage() { return <DocsShell eyebrow="Docs / Research" title="Research & Models" description="GenJecX investigates models, architectures, knowledge systems, inference, evaluation and intelligence before deciding what should become a product."><ResearchTierIndex/><ResearchModelsArtifact/><ResearchAreas/><TechnicalExploration/><ModelTaxonomy/><ModelUsagePhilosophy/><FailureModesAndLimits/><MentalHealthInitiative/></DocsShell>; }
