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
      <PageHero kicker="Talk to GenJecX" title={<>Talk to <em>GenJecX</em></>} copy={<>You don’t need a perfect brief. You don’t even need to know what the solution is.<br/><br/>Tell us what you’re trying to figure out.</>} />
      <section className="gx-section" style={{ paddingTop: 20 }}><div className="gx-container"><SectionHeader kicker="Three entry points" title={<>Start with the <em>actual situation.</em></>} /><div className="gx-situation-grid">{[['I want to build something','I have a product, feature, system or idea.'],["Something isn’t working",'I already have an AI system and need technical help.'],['I need to figure something out','I have a problem but do not know the right technical direction.']].map(([title,copy],index)=><article key={title}><span>0{index + 1}</span><p><strong>{title}</strong><br/>{copy}</p></article>)}</div></div></section>
      <section className="gx-section gx-soft-band"><div className="gx-container"><SectionHeader kicker="What you can bring" title={<>You bring the problem. We help determine the <em>depth.</em></>} /><FlowDiagram label="Conversation to system" steps={['Product / Architecture / Research problem', 'Technical judgment', 'System']} /><div className="gx-next-grid">{['Product idea','Architecture','Existing AI system','Research problem','Model problem','Data problem','Infrastructure problem','Failed AI experiment'].map((item,index)=><article key={item}><span>0{index+1}</span><h3 className="gx-display">{item}</h3><p>You can start here, including when you simply do not know what to do next.</p></article>)}</div></div></section>

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
