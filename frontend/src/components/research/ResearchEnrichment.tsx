'use client';

import { useState } from 'react';
import { FlowDiagram } from '@/components/enrichment/CapabilityVisuals';
import { SectionHeader } from '@/components/ui/Primitives';

const domains = [
  ['Experimental Intelligence', 'Questions about how systems can reason, adapt, remember and act.'],
  ['Technical Exploration', 'Testing the technologies underneath emerging AI systems.'],
  ['Model & Architecture Research', 'Exploring model behavior and the structures around useful inference.'],
  ['Evaluation & Reliability', 'Investigating how systems should be assessed, observed and improved.'],
  ['Knowledge & Memory Systems', 'Questions around representation, retrieval, context and persistent intelligence.'],
  ['Applied Intelligence', 'Understanding how intelligence can support real people, workflows and decisions.'],
];

const experiments = [
  ['How should an agent retain useful context across tasks?', 'Persistent memory may improve continuity while increasing retrieval complexity.', 'Approach is investigated through system architecture, retrieval and evaluation choices.'],
  ['How should multiple agents coordinate without creating unnecessary complexity?', 'Specialization may help when coordination has clear goals, tools and constraints.', 'Approach is investigated through orchestration patterns and controlled task boundaries.'],
  ['What should remain deterministic in an intelligent system?', 'Clear system boundaries can make intelligence more reliable and easier to evaluate.', 'Approach is investigated through decision decomposition and explicit evaluation paths.'],
];

const technologies = ['Local models', 'Model routing', 'Retrieval strategies', 'Vector databases', 'Knowledge graphs', 'Agent orchestration', 'Inference optimization', 'Evaluation', 'Infrastructure', 'Deployment patterns'];
const matrix = [
  ['Local inference', 'Cost control', 'Hardware constraints', 'Deployment control', 'Private or constrained workloads'],
  ['Model routing', 'Use the right resource', 'Routing overhead', 'Decision quality', 'Mixed task complexity'],
  ['Retrieval systems', 'Context efficiency', 'Search work', 'Knowledge quality', 'Grounded responses'],
  ['Knowledge graphs', 'Structured relationships', 'Modeling effort', 'Explicit semantics', 'Connected domain knowledge'],
  ['Agent orchestration', 'Task specialization', 'Coordination cost', 'Defined boundaries', 'Complex multi-step work'],
];

export function ResearchDomains() {
  return <section className="gx-section" style={{ paddingTop: 20 }}><div className="gx-container">
    <SectionHeader kicker="Research domains" title={<>Not every experiment becomes a <em>product.</em></>} copy="Some exist to answer a question about how intelligent systems could become more capable, reliable and useful." />
    <div className="gx-research-domain-grid">{domains.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3 className="gx-display">{title}</h3><p>{copy}</p><b>Question space</b></article>)}</div>
  </div></section>;
}

export function ExperimentalIntelligence() {
  const [open, setOpen] = useState<number | null>(0);
  return <section className="gx-section gx-research-notebook"><div className="gx-container">
    <SectionHeader kicker="Experimental Intelligence" title={<>Questions we&apos;re exploring about how systems can <em>reason, adapt, remember and act.</em></>} copy="These are research question spaces, not finished commercial products or claimed research outcomes." />
    <div className="gx-theme-row">{['Agent behavior', 'Adaptive systems', 'Multi-agent coordination', 'Memory', 'Context', 'Decision systems', 'Human-in-the-loop intelligence'].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div>
    <div className="gx-experiment-list">{experiments.map(([question, hypothesis, approach], index) => <article key={question}>
      <button onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} aria-controls={`experiment-${index}`}><span>EXP-{String(index + 1).padStart(2, '0')}</span><strong>{question}</strong><b aria-hidden="true">{open === index ? '-' : '+'}</b></button>
      <div id={`experiment-${index}`} hidden={open !== index}><dl><div><dt>Question</dt><dd>{question}</dd></div><div><dt>Hypothesis</dt><dd>{hypothesis}</dd></div><div><dt>Approach</dt><dd>{approach}</dd></div><div><dt>Result</dt><dd>Not published — this card intentionally does not fabricate a conclusion.</dd></div><div><dt>What changed</dt><dd>Reserved for evidence-supported updates as research becomes available.</dd></div></dl></div>
    </article>)}</div>
  </div></section>;
}

export function TechnicalExploration() {
  return <section className="gx-section"><div className="gx-container">
    <SectionHeader kicker="Technical Exploration" title={<>Testing the technologies underneath <em>emerging AI systems.</em></>} copy="Technical decisions involve trade-offs. This is a conceptual evaluation framework, not a benchmark table or a claim about measured performance." />
    <div className="gx-tech-topics">{technologies.map((topic, index) => <span key={topic}><b>0{index + 1}</b>{topic}</span>)}</div>
    <div className="gx-tech-matrix" role="table" aria-label="Conceptual technical experiment matrix comparing approach, cost, latency, reliability and capability">
      <div className="gx-tech-matrix-head" role="row"><span role="columnheader">Approach</span><span role="columnheader">Cost</span><span role="columnheader">Latency</span><span role="columnheader">Reliability</span><span role="columnheader">Capability</span></div>
      {matrix.map(([approach, cost, latency, reliability, capability]) => <article key={approach} role="row"><strong role="rowheader">{approach}</strong><span role="cell"><i>Cost</i>{cost}</span><span role="cell"><i>Latency</i>{latency}</span><span role="cell"><i>Reliability</i>{reliability}</span><span role="cell"><i>Capability</i>{capability}</span></article>)}
    </div>
    <FlowDiagram label="Technical decision" steps={['Technology', 'Trade-off', 'Evaluation', 'Decision']} />
  </div></section>;
}
