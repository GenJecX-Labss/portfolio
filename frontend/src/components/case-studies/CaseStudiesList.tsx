'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CaseStudy {
  id: number;
  title: string;
  industry: string;
  tier: string;
  description: string;
  status: string;
  pdfFile: string;
  fullTitle: string;
}

export default function CaseStudiesList() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

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
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
          <h3 className="font-semibold text-[#0F172A] mb-2">
            Portfolio Overview
          </h3>
          <p className="text-sm text-[#475569]">
            Click on any case study below to view the detailed PDF document.
            Each study includes: problem definition, system architecture, data
            strategy, custom intelligence approach, engineering challenges,
            outcomes, and technical specifications.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="p-8 border border-[#E5E7EB] rounded-lg hover:border-[#334155] transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2 group-hover:text-[#334155] transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-[#475569]">{study.description}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-[#334155] rounded-full mb-2">
                    {study.tier}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#E5E7EB]">
                <div>
                  <p className="text-sm text-[#475569]">
                    <span className="font-semibold text-[#0F172A]">
                      Industry:
                    </span>{' '}
                    {study.industry}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedPdf(null);
                    setTimeout(() => {
                      setSelectedPdf(study.pdfFile);
                    }, 0);
                  }}
                  className="px-6 py-2 text-sm font-semibold text-white bg-[#0F172A] rounded-md hover:bg-[#1E293B] transition-colors cursor-pointer"
                >
                  View Case Study
                </button>

              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
          <h3 className="font-semibold text-[#0F172A] mb-3">
            What Each Case Study Includes
          </h3>
          <ul className="space-y-2 text-sm text-[#475569]">
            <li className="flex gap-2">
              <span className="text-[#334155]">✓</span>
              <span>Problem Definition & Context</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#334155]">✓</span>
              <span>Why Existing Solutions Failed</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#334155]">✓</span>
              <span>System Architecture & Components</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#334155]">✓</span>
              <span>Data Strategy & Organization</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#334155]">✓</span>
              <span>Custom Intelligence & Training</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#334155]">✓</span>
              <span>Engineering Challenges & Solutions</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#334155]">✓</span>
              <span>Outcomes & Capabilities</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#334155]">✓</span>
              <span>Technical Specifications & Performance</span>
            </li>
          </ul>
        </div>
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
