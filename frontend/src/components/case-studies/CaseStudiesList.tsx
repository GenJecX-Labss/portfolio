'use client';

import Link from 'next/link';

export default function CaseStudiesList() {
  const caseStudies = [
    {
      id: 1,
      title: 'Case Study 1',
      industry: 'Industry',
      tier: 'Tier-3',
      description: 'Problem description and high-level solution overview.',
      status: 'Ready for Portfolio Content',
    },
    {
      id: 2,
      title: 'Case Study 2',
      industry: 'Industry',
      tier: 'Tier-2',
      description: 'Problem description and high-level solution overview.',
      status: 'Ready for Portfolio Content',
    },
    {
      id: 3,
      title: 'Case Study 3',
      industry: 'Industry',
      tier: 'Tier-1',
      description: 'Problem description and high-level solution overview.',
      status: 'Ready for Portfolio Content',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 p-6 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg">
          <h3 className="font-semibold text-[#92400E] mb-2">
            Portfolio Content Pending
          </h3>
          <p className="text-sm text-[#92400E]">
            Case study content will be integrated here. Each study will include:
            problem definition, system architecture, data strategy, custom
            intelligence, engineering challenges, outcomes, and diagrams.
          </p>
        </div>

        <div className="space-y-6">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="p-8 border border-[#E5E7EB] rounded-lg hover:border-[#334155] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">
                    {study.title}
                  </h3>
                  <p className="text-[#475569]">{study.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
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
                <div className="px-4 py-2 text-xs font-medium text-[#334155] bg-[#F9FAFB] rounded-md">
                  {study.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
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
              <span>Architecture Diagrams</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}