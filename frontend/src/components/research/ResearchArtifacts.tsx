import { FlowDiagram } from '@/components/enrichment/CapabilityVisuals';
import { SectionHeader } from '@/components/ui/Primitives';
import Link from 'next/link';
import { ResearchComparisonMatrix, ResearchDepthSelector, ResearchKnowledge, ResearchStatusStrip } from '@/components/research/ResearchUI';

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
    <ResearchStatusStrip />
    <div className="gx-studio-sequence">{[['Architecture','What structure should the model have?'],['Training','What should it learn, from what data, and under what objective?'],['Representation','How should the problem be represented internally?'],['Inference','How should the model behave when deployed?'],['Evaluation','How do we know the architecture actually improves the target problem?'],['Optimization','Can the system become smaller, faster, cheaper, or more deterministic?']].map(([title,copy],index)=><article key={title}><span>0{index+1}</span><h3 className="gx-display">{title}</h3><p>{copy}</p></article>)}</div>
    <div className="gx-research-direction-matrix">{['Custom neural networks', 'RNN/CNN hybrids', 'Specialized architectures', 'Deterministic inference', 'Local inference', 'Model optimization', 'Hybrid neural systems', 'Neuro-symbolic intelligence'].map((topic, index) => <article key={topic}><span>R{index + 1}</span><strong>{topic}</strong></article>)}</div>
    <FlowDiagram label="Neural Studio experiment path" steps={['Question', 'Hypothesis', 'Architecture', 'Training', 'Evaluation', 'Result', 'Next']} />
    <article className="gx-artifact-snapshot"><div><span>EXPERIMENT / STRUCTURE</span><h3 className="gx-display">Research notebook, not a service card.</h3><p>Every documented experiment distinguishes the question, hypothesis, architecture, training, evaluation, result and next decision. Existing notes remain the only source for published evidence.</p></div><dl><div><dt>Question</dt><dd>What are we trying to understand?</dd></div><div><dt>Hypothesis</dt><dd>What do we believe might work?</dd></div><div><dt>Architecture</dt><dd>What did we build?</dd></div><div><dt>Training</dt><dd>How did it learn?</dd></div><div><dt>Evaluation</dt><dd>How did we test it?</dd></div><div><dt>Result</dt><dd>Published only when supported by the research record.</dd></div><div><dt>Next</dt><dd>What does the result change?</dd></div></dl></article>
    <div className="gx-studio-artifact-canvas" aria-label="Illustrative research artifact canvas"><span>ARCHITECTURE</span><i>INPUT</i><b>NEURAL<br/>SYSTEM</b><i>INFERENCE</i><span>EVALUATION</span><small>Illustrative research artifact — no measured results represented.</small></div>
    <p className="gx-principle-statement">Research isn&apos;t a detour from engineering. Sometimes it is the shortest path to the right architecture.</p><div className="gx-page-actions"><Link className="gx-button secondary" href="/docs/research/models">Explore Research &amp; Models →</Link><Link className="gx-button secondary" href="/ArchitectureAudit">Talk to GenJecX →</Link></div>
  </div></section>;
}

export function ResearchModelsArtifact() {
  return <section className="gx-section gx-model-archive"><div className="gx-container">
    <SectionHeader kicker="Research Models" title={<>Models built to answer <em>questions</em> - not simply to ship features.</>} copy="Some models exist to understand a particular behavior. Others exist because existing models cannot satisfy the constraints of the problem." />
    <div className="gx-model-card"><header><span>MODEL CARD / RESEARCH ARCHIVE</span><b>Documentation template</b></header><h3 className="gx-display">How a research model is documented</h3><p>Existing model taxonomy, diagrams and research material remain intact below. This card clarifies how each artifact should be read without inventing missing data.</p><dl>{fields.map(([term, copy]) => <div key={term}><dt>{term}</dt><dd>{copy}</dd></div>)}</dl></div>
    <div className="gx-page-actions"><Link className="gx-button secondary" href="/docs/research">Research overview</Link><Link className="gx-button secondary" href="/docs/research/neural-studio">Neural Studio</Link></div>
  </div></section>;
}

export function ResearchTierIndex() { return <><ResearchDepthSelector/><ResearchComparisonMatrix/><ResearchKnowledge/></>; }
