import ProcessIntro from '@/components/process/ProcessIntro';
import ProcessPhases from '@/components/process/ProcessPhases';
import PricingPhilosophy from '@/components/process/PricingPhilosophy';
import ClientFitFilter from '@/components/process/ClientFitFilter';

export default function ProcessPricingPage() {
  return (
    <div className="w-full">
      {/* Process Intro */}
      <ProcessIntro />

      {/* Process Phases */}
      <ProcessPhases />

      {/* Pricing Philosophy */}
      <PricingPhilosophy />

      {/* Client Fit Filter */}
      <ClientFitFilter />
    </div>
  );
}