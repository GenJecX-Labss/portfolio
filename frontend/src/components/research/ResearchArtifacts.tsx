import { FlowDiagram } from '@/components/enrichment/CapabilityVisuals';
import { SectionHeader } from '@/components/ui/Primitives';
import Link from 'next/link';

const fields = [
  ['Why it exists', 'The research question or system constraint that motivates the work.'],
  ['What problem it addresses', 'The capability or behavior being investigated.'],
  ['Architecture', 'Documented through the existing model taxonomy and diagrams.'],
  ['Dataset & training', 'Shown only where current research documentation provides it.'],
  ['Evaluation', 'A research dimension, not an implied benchmark.'],
  ['Limitations', 'Important constraints and open questions remain part of the artifact.'],
  ['Observed behavior', 'Not published unless supported by documented research.'],
  ['Next experiment', 'Planned or in-progress work is marked as such.'],
];

export function NeuralStudioArtifact() {
  return <section className="gx-section gx-studio-artifact"><div className="gx-container">
    <SectionHeader kicker="What happens inside Neural Studio" title={<>Closer to the model, where architecture becomes <em>testable.</em></>} copy="A focused environment for exploring neural architectures, training approaches, inference behavior, specialized models and hybrid intelligence systems where generic AI reaches its limits." />
    <div className="gx-artifact-topics">{['Architecture', 'Training', 'Representation', 'Inference', 'Evaluation', 'Optimization'].map((topic, index) => <span key={topic}>0{index + 1} / {topic}</span>)}</div>
    <div className="gx-artifact-topics">{['Custom neural networks', 'RNN/CNN hybrids', 'Specialized architectures', 'Deterministic inference', 'Local inference', 'Model optimization', 'Hybrid neural systems', 'Neuro-symbolic intelligence'].map((topic, index) => <span key={topic}>R{index + 1} / {topic}</span>)}</div>
    <FlowDiagram label="Neural Studio experiment path" steps={['Problem', 'Architecture', 'Training', 'Inference', 'Evaluation', 'Observed behavior']} />
    <article className="gx-artifact-snapshot"><div><span>EXPERIMENT / STRUCTURE</span><h3 className="gx-display">Research notebook, not a service card.</h3><p>Every documented experiment distinguishes the question, hypothesis, architecture, training, evaluation, result and next decision. Existing notes remain the only source for published evidence.</p></div><dl><div><dt>Question</dt><dd>What are we trying to understand?</dd></div><div><dt>Hypothesis</dt><dd>What do we believe might work?</dd></div><div><dt>Architecture</dt><dd>What did we build?</dd></div><div><dt>Training</dt><dd>How did it learn?</dd></div><div><dt>Evaluation</dt><dd>How did we test it?</dd></div><div><dt>Result</dt><dd>Published only when supported by the research record.</dd></div><div><dt>Next</dt><dd>What does the result change?</dd></div></dl></article>
    <div className="gx-page-actions"><Link className="gx-button secondary" href="/docs/research">Research overview</Link><Link className="gx-button secondary" href="/docs/research/models">Research Models</Link></div>
  </div></section>;
}

export function ResearchModelsArtifact() {
  return <section className="gx-section gx-model-archive"><div className="gx-container">
    <SectionHeader kicker="Research Models" title={<>Models built to answer <em>questions</em> - not simply to ship features.</>} copy="Some models exist to understand a particular behavior. Others exist because existing models cannot satisfy the constraints of the problem." />
    <div className="gx-model-card"><header><span>MODEL CARD / RESEARCH ARCHIVE</span><b>Documentation template</b></header><h3 className="gx-display">How a research model is documented</h3><p>Existing model taxonomy, diagrams and research material remain intact below. This card clarifies how each artifact should be read without inventing missing data.</p><dl>{fields.map(([term, copy]) => <div key={term}><dt>{term}</dt><dd>{copy}</dd></div>)}</dl></div>
    <div className="gx-page-actions"><Link className="gx-button secondary" href="/docs/research">Research overview</Link><Link className="gx-button secondary" href="/docs/research/neural-studio">Neural Studio</Link></div>
  </div></section>;
}

export function ResearchTierIndex() { const tiers: Array<[string, string, string[], string[]]> = [['Tier 1 — Quick AI Solutions', 'Focused AI Capability', ['Input', 'Context', 'Model', 'Action', 'Evaluation'], ['Project name', 'Problem', 'System type', 'Core architecture', 'Technologies', 'Outcome', 'Diagram']], ['Tier 2 — Custom AI Integration / Intelligence Systems', 'Persistent Intelligence', ['Data', 'Knowledge', 'Retrieval', 'Memory', 'Intelligence', 'Evaluation'], ['Problem', 'Intelligence architecture', 'Knowledge layer', 'Memory', 'Agents', 'Evaluation', 'Infrastructure', 'Outcome']], ['Tier 3 — Custom Neural R&D / Enterprise', 'Research-Driven Intelligence', ['Research', 'Data', 'Neural Architecture', 'Training', 'Inference', 'Evaluation', 'Deployment'], ['Research question', 'Architecture', 'Dataset', 'Training', 'Inference', 'Evaluation', 'Infrastructure', 'Findings']]]; return <section className="gx-section gx-research-tiers"><div className="gx-container"><SectionHeader kicker="Three levels of building" title={<>Research depth is architectural, not a <em>package.</em></>} copy="Some projects become products. Some become reusable architectures. Some simply answer a question. All of them create technical knowledge."/><div className="gx-depth-build-grid">{tiers.map(([title,kind,flow,fields],index)=><article key={title}><span>0{index+1} / RESEARCH TIER</span><h2 className="gx-display">{title}</h2><p>{kind}</p><FlowDiagram label="Architecture" steps={flow} /><ul>{fields.map(field=><li key={field}>{field}</li>)}</ul></article>)}</div><div className="gx-tier-comparison" role="table" aria-label="Conceptual research tier comparison"><div role="row"><b role="columnheader">Capability</b><b role="columnheader">Tier 1</b><b role="columnheader">Tier 2</b><b role="columnheader">Tier 3</b></div>{[['Primary goal','Solve a bounded problem','Build an intelligence system','Solve a technically difficult problem'],['Agents','✓','✓','✓'],['RAG','✓','✓','✓'],['Integrations','✓','✓','✓'],['Custom data engineering','—','✓','✓'],['Persistent memory','—','✓','✓'],['Knowledge graphs','—','✓','✓'],['Evaluation pipelines','—','✓','✓'],['Custom neural networks','—','—','✓'],['Custom training','—','—','✓'],['Deterministic inference','—','—','✓'],['Neuro-symbolic systems','—','—','✓']].map(([label,a,b,c])=><div role="row" key={label}><span role="rowheader">{label}</span><span role="cell">{a}</span><span role="cell">{b}</span><span role="cell">{c}</span></div>)}</div><p className="gx-principle-statement">The tiers are not arbitrary packages. They represent increasing architectural depth.</p></div></section>; }
