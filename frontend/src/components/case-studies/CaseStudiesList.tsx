'use client';

import { useState } from 'react';

interface CaseStudy {
  id: number;
  title: string;
  industry: string;
  tier: string;
  description: string;
  status: string;
  pdfFile: string;
  fullTitle: string;
  system: string;
  architecture: string[];
}

export default function CaseStudiesList() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState('Tier-1');

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: 'HookBank Cross-Platform',
      industry: 'Content Intelligence',
      tier: 'Tier-1',
      description:
        'LLM-powered hook generation tool trained on real human conversations for platform-specific content creation.',
      status: 'Portfolio Ready',
      pdfFile: '/pdfs/hookbank.pdf',
      fullTitle: 'HookBank Cross-Platform Hook Intelligence System',
      system: 'Content Intelligence System',
      architecture: ['Context', 'Retrieval', 'Model', 'Action'],
    },
    {
      id: 2,
      title: 'Personal Brandwriter',
      industry: 'Brand Brain, voice AI',
      tier: 'Tier-2',
      description:
      'BrandWriter is a custom, brand-specific multi-pipeline AI system that encodes founder identity to automate content creation, asset reuse, editing, and long-term scheduling across platforms with human-in-the-loop control.',
      status: 'Portfolio Ready',
      pdfFile: '/pdfs/brand-writer.pdf',
      fullTitle: 'BrandWriter - Brand Intelligence System',
      system: 'Knowledge + Workflow System',
      architecture: ['Context', 'Knowledge', 'Pipelines', 'Review'],
    },
    {
      id: 3,
      title: 'Personality Neural Models',
      industry: 'AI & Personality Systems',
      tier: 'Tier-3',
      description:
        'High-EQ personality-specific neural networks including "Sara" and "Alexa" with bounded behavioral systems.',
      status: 'Portfolio Ready',
      pdfFile: '/pdfs/custom-neural-networks.pdf',
      fullTitle: 'Sara & Alexa - Personality Neural Intelligence Systems',
      system: 'Specialized Neural System',
      architecture: ['Representation', 'Model', 'Inference', 'Evaluation'],
    },
  ];

  const tierDetails: Record<string, { label: string; title: string; copy: string; depth: string[] }> = {
    'Tier-1': { label: '01 / TIER 1', title: 'Focused AI Solutions', copy: 'Projects built around bounded problems.', depth: ['Application', 'AI Capability', 'Integration', 'Evaluation'] },
    'Tier-2': { label: '02 / TIER 2', title: 'Custom Intelligence Systems', copy: 'Systems where intelligence becomes part of the architecture.', depth: ['Data', 'Knowledge', 'Memory', 'Intelligence', 'Evaluation'] },
    'Tier-3': { label: '03 / TIER 3', title: 'Custom Neural R&D / Enterprise', copy: 'Systems where the problem requires deeper model-level research.', depth: ['Research', 'Architecture', 'Training', 'Inference', 'Evaluation'] },
  };
  const tiers = Object.keys(tierDetails);
  const cycleTier = (direction: -1 | 1) => {
    const currentIndex = tiers.indexOf(selectedTier);
    setSelectedTier(tiers[(currentIndex + direction + tiers.length) % tiers.length]);
  };
  const activeTier = tierDetails[selectedTier];
  const activeStudies = caseStudies.filter((study) => study.tier === selectedTier);

  return (
    <section className="gx-section gx-case-list">
      <div className="gx-container">
        <div className="gx-case-list-intro"><div><span>EXPLORE THE WORK BY ARCHITECTURAL DEPTH</span><h2 className="gx-display">Not every system needs the <em>same engineering depth.</em></h2></div><p>Some problems are solved with a focused AI capability. Others require persistent knowledge, orchestration, memory and deeper integration. Some require actual neural research.</p></div>
        <div className="gx-case-tier-tabs" role="tablist" aria-label="Case studies by architectural depth">{Object.entries(tierDetails).map(([tier, detail]) => <button key={tier} type="button" role="tab" aria-selected={selectedTier === tier} aria-controls="case-study-panel" className={selectedTier === tier ? 'active' : ''} onClick={() => setSelectedTier(tier)}><span>{detail.label}</span><strong className="gx-display">{detail.title}</strong><small>{detail.copy}</small></button>)}</div>
        <div className="gx-case-browser-head"><div><span>PROJECT BROWSER</span><h2 className="gx-display">Technical work, read as a <em>system.</em></h2></div><p>Open an existing case study to view its original supporting PDF. Public outcomes remain limited to the evidence already included in those documents.</p></div>
        <section id="case-study-panel" role="tabpanel" aria-live="polite" className="gx-active-tier-panel"><div className="gx-active-tier-title"><div className="gx-tier-cycle"><button type="button" onClick={() => cycleTier(-1)} aria-label="Show previous case study tier">←</button><span>{activeTier.label}</span><button type="button" onClick={() => cycleTier(1)} aria-label="Show next case study tier">→</button></div><h3 className="gx-display">{activeTier.title}</h3><p>{activeTier.copy}</p><div>{activeTier.depth.map((step,index)=><span key={step}>{step}{index < activeTier.depth.length - 1 && <b>→</b>}</span>)}</div></div>
        <div className="gx-case-study-grid">
          {activeStudies.map((study) => (
            <article
              key={study.id}
              className="gx-case-study-card"
            >
              <span>{study.tier.replace('-', ' ').toUpperCase()} / PROJECT 0{study.id}</span>
              <h3 className="gx-display">{study.title}</h3>
              <dl><div><dt>PROBLEM</dt><dd>{study.description}</dd></div><div><dt>SYSTEM</dt><dd>{study.system}</dd></div></dl>
              <div className="gx-case-architecture"><small>ARCHITECTURE</small>{study.architecture.map((step,index)=><span key={step}>{step}{index < study.architecture.length - 1 && <b>→</b>}</span>)}</div>
              <div className="gx-case-card-footer"><p>{study.industry}</p>
                <button
                  onClick={() => {
                    setSelectedPdf(null);
                    setTimeout(() => {
                      setSelectedPdf(study.pdfFile);
                    }, 0);
                  }}
                  className="gx-case-open"
                >
                  Read Case Study →
                </button>
              </div>
            </article>
          ))}
        </div></section>
      </div>

      {/* PDF Viewer Modal */}
{typeof selectedPdf === 'string' &&
  selectedPdf.startsWith('/pdfs/') && (
    <PDFModal
      pdfUrl={selectedPdf}
      onClose={() => setSelectedPdf(null)}
    />
)}
    </section>
  );
}

// PDF Modal Component
interface PDFModalProps {
  pdfUrl: string;
  onClose: () => void;
}

function PDFModal({ pdfUrl, onClose }: PDFModalProps) {
  if (!pdfUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full h-[90vh] max-w-4xl flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#0F172A]">Case Study PDF</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F9FAFB] rounded-lg transition-colors"
            aria-label="Close PDF viewer"
          >
            <svg
              className="w-6 h-6 text-[#0F172A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden bg-[#F3F4F6]">
          <iframe
            key={pdfUrl} // 🔥 FORCES HARD REMOUNT
            src={`${pdfUrl}#toolbar=1&navpanes=0`}
            className="w-full h-full border-0"
            title="Case Study PDF"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E5E7EB] flex items-center justify-between bg-[#F9FAFB]">
          <p className="text-sm text-[#475569]">
            Use your browser's print function to save as PDF
          </p>
          <div className="flex gap-3">
            <a
              href={pdfUrl}
              download
              className="px-4 py-2 bg-[#0F172A] text-white text-sm font-medium rounded-md hover:bg-[#1E293B] transition-colors"
            >
              Download PDF
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#E5E7EB] text-[#0F172A] text-sm font-medium rounded-md hover:bg-[#F9FAFB] transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
