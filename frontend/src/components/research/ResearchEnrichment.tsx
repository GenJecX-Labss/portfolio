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

const modelAreas = ['Neural architecture experiments', 'RNN/CNN hybrids', 'Custom inference', 'Specialized model architectures', 'Neuro-symbolic approaches', 'Deterministic inference', 'Model specialization'];
const evaluationAreas = ['AI evaluation', 'Hallucination analysis', 'Retrieval quality', 'Agent reliability', 'Failure modes', 'Regression testing', 'Human evaluation', 'Cost-performance trade-offs'];
const knowledgeAreas = ['Persistent memory', 'Semantic memory', 'Knowledge graphs', 'Context management', 'Retrieval', 'Long-term system knowledge', 'Personal intelligence systems'];

function ResearchTags({ items }: { items: string[] }) {
  return <div className="gx-theme-row gx-depth-tags">{items.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div>;
}

export function ResearchDepth() {
  return <>
    <section className="gx-section gx-research-depth"><div className="gx-container">
      <SectionHeader kicker="Model & Architecture Research" title={<>Exploring what happens when the <em>architecture itself</em> becomes part of the intelligence.</>} copy="The question is not only which model to use, but how model structure, specialization and inference choices shape system behavior." />
      <ResearchTags items={modelAreas} />
      <div className="gx-architecture-map" role="img" aria-label="Conceptual neural architecture flow: input is represented, interpreted by an architecture, processed through an inference strategy and produces behavior.">
        {['Input', 'Representation', 'Architecture', 'Inference', 'Behavior'].map((step, index) => <article key={step}><span>0{index + 1}</span><strong>{step}</strong><small>{['Signals and constraints', 'Relevant features', 'Neural, symbolic or hybrid structure', 'Specialized or deterministic path', 'Observed system response'][index]}</small>{index < 4 && <i aria-hidden="true">-&gt;</i>}</article>)}
      </div>
      <div className="gx-model-experiments"><article><span>QUESTION</span><h3 className="gx-display">Where should a system be specialized?</h3><p>Architecture, inference and system boundaries are investigated together - not as isolated model choices.</p><b>RESULT: Unpublished research direction</b></article><article><span>CONCEPTUAL PATH</span><h3 className="gx-display">Model + architecture + inference</h3><p>Neural and symbolic components can be considered as complementary ways to express constrained, useful behavior.</p><b>WHAT CHANGED: Reserved for evidence-supported updates</b></article></div>
    </div></section>

    <section className="gx-section gx-research-notebook"><div className="gx-container">
      <SectionHeader kicker="Evaluation & Reliability" title={<>If we can&apos;t measure it, we don&apos;t really know if it <em>works.</em></>} copy="Evaluation belongs inside intelligent-system engineering, not after deployment. These are research dimensions, not claimed benchmark results." />
      <ResearchTags items={evaluationAreas} />
      <FlowDiagram label="Continuous evaluation loop" steps={['Input', 'System', 'Output', 'Evaluation', 'Feedback', 'Iteration']} />
      <div className="gx-evaluation-grid" aria-label="Conceptual evaluation dimensions"><article><span>QUALITY</span><p>Does the response serve the intended task?</p></article><article><span>RELIABILITY</span><p>Does behavior remain useful across conditions?</p></article><article><span>LATENCY + COST</span><p>What does useful behavior require in practice?</p></article><article><span>HUMAN JUDGMENT</span><p>Where should people assess or intervene?</p></article></div>
      <FlowDiagram label="Failure analysis" steps={['Input', 'System', 'Failure', 'Diagnosis', 'Correction', 'Regression test']} />
    </div></section>

    <section className="gx-section gx-research-depth"><div className="gx-container">
      <SectionHeader kicker="Knowledge & Memory Systems" title={<>How information becomes useful <em>system knowledge.</em></>} copy="Information is not knowledge; knowledge is not memory; memory is not context. Each layer changes what a system can retrieve and reason with." />
      <ResearchTags items={knowledgeAreas} />
      <FlowDiagram label="Knowledge and memory flow" steps={['Raw information', 'Structured knowledge', 'Persistent memory', 'Retrieved context', 'Reasoning']} />
      <div className="gx-knowledge-graph" role="img" aria-label="Conceptual knowledge graph: entities and relationships become structured knowledge, which supports retrieval and reasoning."><div><span>Entities</span><span>Relationships</span><span>Context</span></div><strong>Structured<br />knowledge</strong><div><span>Retrieval</span><span>Memory</span><span>Reasoning</span></div></div>
      <div className="gx-model-experiments"><article><span>MEMORY QUESTION</span><h3 className="gx-display">What should persist?</h3><p>Persistent context needs useful boundaries: what a system should retain, retrieve and leave behind remains an active design question.</p></article><article><span>PERSONAL INTELLIGENCE</span><h3 className="gx-display">Long-term context for assistance</h3><p>A research/application area for user-specific knowledge, retrieval and intelligent assistance without claiming a specific production capability.</p></article></div>
    </div></section>
  </>;
}

export function AppliedIntelligence() {
  const applications = [
    ['Healthcare Intelligence', 'Domain-specific intelligence and decision support.'],
    ['Fitness Intelligence', 'Personalized performance and adaptive intelligence.'],
    ['Executive Intelligence', 'Systems for synthesis, decision support and organizational knowledge.'],
    ['Content Intelligence', 'Systems for understanding, generating and organizing information.'],
    ['Decision Systems', 'Systems combining models, knowledge, rules and human judgment.'],
    ['Research Systems', 'Systems supporting investigation, experimentation and knowledge work.'],
  ];
  return <section className="gx-section gx-applied-intelligence"><div className="gx-container">
    <SectionHeader kicker="Applied Intelligence" title={<>Research doesn&apos;t have to remain <em>theoretical.</em></>} copy="A bridge from research question to usable capability: investigate the underlying problem, test a possible mechanism, validate it, then integrate what holds up into a system." />
    <FlowDiagram label="From research to a usable system" steps={['Research', 'Prototype', 'Validation', 'System']} />
    <div className="gx-applied-grid">{applications.map(([title, copy], index) => <article key={title}><span>0{index + 1} / DOMAIN</span><h3 className="gx-display">{title}</h3><p>{copy}</p><b>Conceptual application area</b></article>)}</div>
  </div></section>;
}
