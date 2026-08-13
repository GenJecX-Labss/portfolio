import CaseStudiesIntro from '@/components/case-studies/CaseStudiesIntro';
import CaseStudiesList from '@/components/case-studies/CaseStudiesList';
import { ArchitecturePatterns } from '@/components/enrichment/SystemEnrichment';

export default function CaseStudiesPage() {
  return (
    <div className="w-full">
      {/* Case Studies Intro */}
      <CaseStudiesIntro />

      {/* Case Studies List */}
      <CaseStudiesList />
      <ArchitecturePatterns />
    </div>
  );
}
