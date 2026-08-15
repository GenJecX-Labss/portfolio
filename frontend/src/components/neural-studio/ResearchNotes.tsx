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
    <section className="gx-section gx-studio-editorial gx-studio-tonal">
      <div className="gx-container">
        <p className="gx-kicker">RESEARCH NOTES</p><h2 className="gx-display">Failures, constraints and <em>learning.</em></h2><p>
          Technical insights and learning captured from each system.
        </p>

        <div className="gx-research-note-grid">
          {notes.map((note, idx) => (
            <div
              key={idx}
              className="gx-research-note"
            >
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === idx ? null : idx)
                }
                className="w-full text-left"
              >
                <h3>
                  {note.title}
                </h3>
                <svg
                  className={`gx-note-arrow ${
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
                <div className="gx-note-body"><p>
                    {note.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="gx-principle-block"><span>WHY THESE NOTES MATTER</span><p>
            Real research documents failures, constraints, and learning. It signals we are building systems, not assembling components. It signals discipline.
          </p>
        </div>
      </div>
    </section>
  );
}
