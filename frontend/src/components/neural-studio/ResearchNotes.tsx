'use client';

import { useState } from 'react';

export default function ResearchNotes() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const notes = [
    {
      title: 'Trade-offs in Architecture Selection',
      content:
        'Custom architectures require careful balance between model complexity and training efficiency. We document every decision point where we chose constraint over capability, and why.',
    },
    {
      title: 'Failure Modes & Constraints',
      content:
        'Real research acknowledges what does not work. We document latency limitations, accuracy boundaries, data scaling constraints, and infrastructure limits for every system.',
    },
    {
      title: 'Learning Dynamics',
      content:
        'How models behave during training, convergence patterns, unexpected phenomena, and what those patterns revealed about the underlying problem. This knowledge transfers across projects.',
    },
    {
      title: 'Data Quality Lessons',
      content:
        'Insights about how data organization affected outcomes. What structures surprised us. What labeling approaches failed. These lessons guide future dataset curation.',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28 bg-[#F9FAFB] border-top border-bottom">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Research Notes</h2>
        <p className="text-[#475569] mb-12">
          Technical insights and learning captured from each system.
        </p>

        <div className="space-y-4">
          {notes.map((note, idx) => (
            <div
              key={idx}
              className="border border-[#E5E7EB] rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === idx ? null : idx)
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white transition-colors"
              >
                <h3 className="text-lg font-semibold text-[#0F172A] text-left">
                  {note.title}
                </h3>
                <svg
                  className={`w-5 h-5 text-[#334155] transition-transform ${
                    expandedIndex === idx ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {expandedIndex === idx && (
                <div className="px-6 py-4 bg-white border-t border-[#E5E7EB]">
                  <p className="text-[#475569] leading-relaxed">
                    {note.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white border border-[#E5E7EB] rounded-lg">
          <p className="text-sm text-[#475569]">
            <span className="font-semibold text-[#0F172A]">
              Why These Notes Matter:
            </span>{' '}
            Real research documents failures, constraints, and learning. It signals we are building systems, not assembling components. It signals discipline.
          </p>
        </div>
      </div>
    </section>
  );
}