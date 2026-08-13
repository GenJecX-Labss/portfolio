import type { ReactNode } from 'react';

export function FlowDiagram({ label, steps }: { label: string; steps: string[] }) {
  return <div className="gx-flow-diagram" role="img" aria-label={`${label}: ${steps.join(', then ')}`}><span className="gx-kicker">{label}</span><div>{steps.map((step, index) => <span key={step}><b>0{index + 1}</b>{step}{index < steps.length - 1 && <i aria-hidden="true">→</i>}</span>)}</div></div>;
}

export function LayerLens() {
  const layers = [['Problem', 'What are we actually trying to change?'], ['Intelligence', 'What needs reasoning, prediction, retrieval or decision-making?'], ['Knowledge', 'What does the system need to know?'], ['Architecture', 'How does information move through the system?'], ['Evaluation', 'How do we know it works?'], ['Infrastructure', 'Can it survive real usage?'], ['Iteration', 'How does the system become more useful?']];
  return <div className="gx-layer-lens" role="img" aria-label="The Genjecx thinking lens moves from problem through intelligence, knowledge, architecture, evaluation, infrastructure and iteration.">{layers.map(([title,copy], index) => <article key={title}><span>0{index + 1}</span><div><h3 className="gx-display">{title}</h3><p>{copy}</p></div>{index < layers.length - 1 && <b aria-hidden="true">↓</b>}</article>)}</div>;
}

export function SplitComparison({ left, right }: { left: { title: string; items: string[] }; right: { title: string; items: string[] } }) {
  return <div className="gx-compare"><article><span>Feature</span><h3 className="gx-display">{left.title}</h3><ul>{left.items.map(item => <li key={item}>{item}</li>)}</ul></article><article><span>System</span><h3 className="gx-display">{right.title}</h3><ul>{right.items.map(item => <li key={item}>{item}</li>)}</ul></article></div>;
}

export function CapabilityDetail({ number, title, copy, children }: { number: string; title: string; copy: string; children: ReactNode }) {
  return <section className="gx-capability-detail"><div><span>{number}</span><h2 className="gx-display">{title}</h2><p>{copy}</p></div>{children}</section>;
}
