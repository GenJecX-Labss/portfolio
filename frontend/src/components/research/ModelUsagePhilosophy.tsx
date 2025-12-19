export default function ModelUsagePhilosophy() {
  const philosophyPoints = [
    {
      principle: 'We do not default to APIs',
      explanation:
        'Off-the-shelf models are a starting point, not an ending point. We choose them thoughtfully, not by default.',
    },
    {
      principle: 'LLMs are powerful for some problems',
      explanation:
        'Language understanding, reasoning, generation. LLMs excel here. We use them where they shine.',
    },
    {
      principle: 'LLMs are harmful for others',
      explanation:
        'Structured prediction, real-time constraints, interpretability requirements. LLMs often overcomplicate and introduce brittleness.',
    },
    {
      principle: 'Control matters',
      explanation:
        'Custom systems give us control over latency, cost, failure modes, and intellectual property. This matters for serious work.',
    },
    {
      principle: 'Fit drives architecture',
      explanation:
        'We choose the right tool for each problem. Sometimes that is a large model. Sometimes it is a carefully tuned classifier.',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28 bg-[#F9FAFB] border-top border-bottom">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
          Model Usage Philosophy
        </h2>

        <p className="text-lg text-[#475569] mb-12 leading-relaxed">
          How we think about model selection and deployment.
        </p>

        <div className="space-y-8">
          {philosophyPoints.map((point, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-[#E5E7EB] rounded-lg"
            >
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                {point.principle}
              </h3>
              <p className="text-[#475569]">{point.explanation}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white border border-[#E5E7EB] rounded-lg">
          <p className="text-sm text-[#475569]">
            <span className="font-semibold text-[#0F172A]">Bottom Line:</span> We
            think deeply about model selection. We do not use a hammer because it
            is shiny. We use it because the problem requires it.
          </p>
        </div>
      </div>
    </section>
  );
}