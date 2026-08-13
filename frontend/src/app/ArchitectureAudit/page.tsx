import AuditIntro from '@/components/audit/AuditIntro';
import WhatThisIs from '@/components/audit/WhatThisIs';
import WhatWeAnalyze from '@/components/audit/WhatWeAnalyze';
import Deliverables from '@/components/audit/Deliverables';
import WhoThisIsFor from '@/components/audit/WhoThisIsFor';
import AuditCTA from '@/components/audit/AuditCTA';
import { FlowDiagram } from '@/components/enrichment/CapabilityVisuals';
import { PageHero, SectionHeader } from '@/components/ui/Primitives';

export default function ArchitectureAuditPage() {
  return (
    <div className="w-full">
      <PageHero kicker="Start a conversation" title={<>Start a <em>Conversation</em></>} copy={<>Not every AI problem needs a product. Not every product needs a custom model. And not every broken system needs to be rebuilt.<br/><br/>Tell us what you’re working on, what isn’t working, or what you’re trying to figure out. We’ll help identify the actual problem before talking about the build.</>} />
      <section className="gx-section" style={{ paddingTop: 20 }}><div className="gx-container"><SectionHeader kicker="Start wherever you are" title={<>You can come to us with <em>the messy version.</em></>} /><div className="gx-situation-grid">{["A product you’re planning", "An AI feature that isn’t behaving properly", "A workflow that has become too complex", "A model that isn’t performing as expected", "A system that needs memory, retrieval or intelligence", "A prototype that needs to become production-ready", "An idea without an obvious technical path", "An AI stack that has become expensive or fragile", "A research problem where the standard approach isn’t enough"].map((item,index)=><article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}</div></div></section>
      <section className="gx-section gx-soft-band"><div className="gx-container"><SectionHeader kicker="What happens next" title={<>We find the <em>right depth</em> before proposing a build.</>} /><FlowDiagram label="Conversation to build" steps={['Conversation', 'Diagnosis', 'System', 'Build']} /><div className="gx-next-grid">{[['01','You tell us what’s happening','Context matters more than a polished brief. Give us the messy version.'],['02','We identify the actual problem','We separate the product, system, model and infrastructure problems.'],['03','We determine the right depth','Sometimes that is a focused AI solution. Sometimes it needs actual R&D.'],['04','We decide whether there’s something worth building','No unnecessary build proposal. No forced scope.']].map(([num,title,copy])=><article key={num}><span>{num}</span><h3 className="gx-display">{title}</h3><p>{copy}</p></article>)}</div></div></section>

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
