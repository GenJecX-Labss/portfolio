import AuditIntro from '@/components/audit/AuditIntro';
import WhatThisIs from '@/components/audit/WhatThisIs';
import WhatWeAnalyze from '@/components/audit/WhatWeAnalyze';
import Deliverables from '@/components/audit/Deliverables';
import WhoThisIsFor from '@/components/audit/WhoThisIsFor';
import AuditCTA from '@/components/audit/AuditCTA';

export default function ArchitectureAuditPage() {
  return (
    <div className="w-full">
      {/* Audit Intro */}
      <AuditIntro />

      {/* What This Is */}
      <WhatThisIs />

      {/* What We Analyze */}
      <WhatWeAnalyze />

      {/* Deliverables */}
      <Deliverables />

      {/* Who This Is For */}
      <WhoThisIsFor />

      {/* Audit CTA */}
      <AuditCTA />
    </div>
  );
}