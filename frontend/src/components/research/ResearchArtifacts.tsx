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
    <SectionHeader kicker="Neural Studio / Research artifact" title={<>Closer to the model, where architecture becomes <em>testable.</em></>} copy="A focused environment for experimenting with models and neural architectures that do not fit neatly into standard AI APIs." />
    <div className="gx-artifact-topics">{['Architecture', 'Training', 'Inference', 'Representation', 'Optimization', 'Hybrid neural systems', 'Deterministic behavior', 'Research artifacts'].map((topic, index) => <span key={topic}>0{index + 1} / {topic}</span>)}</div>
    <FlowDiagram label="Neural Studio experiment path" steps={['Problem', 'Architecture', 'Training', 'Inference', 'Evaluation', 'Observed behavior']} />
    <article className="gx-artifact-snapshot"><div><span>EXPERIMENT 01</span><h3 className="gx-display">Experiment snapshot</h3><p>The existing Neural Studio diagrams and notes remain the source for documented architectures and research material.</p></div><dl><div><dt>Problem</dt><dd>Documented within the corresponding existing studio artifact.</dd></div><div><dt>Architecture</dt><dd>See the existing architecture diagrams.</dd></div><div><dt>Training</dt><dd>Not published where no supporting research record exists.</dd></div><div><dt>Evaluation</dt><dd>Kept evidence-led; no synthetic benchmark data is presented.</dd></div><div><dt>Inference</dt><dd>Investigated through the existing architecture and system materials.</dd></div><div><dt>Result / learning</dt><dd>Not published unless supported by the current research record.</dd></div></dl></article>
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
