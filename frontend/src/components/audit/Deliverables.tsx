export default function Deliverables() {
  const deliverables = [
    {
      title: 'Written Report',
      description:
        'A comprehensive technical report documenting our findings, analysis, and observations. Clear. Honest. Actionable.',
    },
    {
      title: 'System Diagrams',
      description:
        'Visual representations of your architecture. Where data flows. Where models fit. Where risks exist.',
    },
    {
      title: 'Recommendations',
      description:
        'Specific, prioritized recommendations. What to fix first. What to monitor. What to optimize.',
    },
    {
      title: 'Risk Assessment',
      description:
        'Clear documentation of risks we identified. What could fail. What the impact would be. How to mitigate.',
    },
    {
      title: 'Cost Analysis',
      description:
        'Breakdown of your infrastructure costs. Where money is well-spent. Where you are overspending.',
    },
    {
      title: 'Follow-up Session',
      description:
        'We review the report with your team. Answer questions. Clarify recommendations. Ensure alignment.',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28 bg-[#F9FAFB] border-top border-bottom">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">
          What You Receive
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {deliverables.map((deliverable, idx) => (
            <div
              key={idx}
              className="p-6 border border-[#E5E7EB] rounded-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#334155] text-white flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                    {deliverable.title}
                  </h3>
                  <p className="text-[#475569]">{deliverable.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-white border border-[#E5E7EB] rounded-lg">
          <p className="text-sm text-[#475569]">
            <span className="font-semibold text-[#0F172A]">Timeline:</span> A typical
            audit takes 2-4 weeks depending on system complexity. We review your
            systems, talk to your team, and deliver findings.
          </p>
        </div>
      </div>
    </section>
  );
}