export default function WhatWeAnalyze() {
  const analysisAreas = [
    {
      area: 'Data Flow',
      questions: [
        'Where does data come from?',
        'How is it transformed?',
        'What quality checks exist?',
        'What data is lost or filtered?',
      ],
    },
    {
      area: 'Model Usage',
      questions: [
        'Why this model for this problem?',
        'What training data was used?',
        'How is performance validated?',
        'What happens when the model fails?',
      ],
    },
    {
      area: 'Failure Modes',
      questions: [
        'What edge cases are untested?',
        'What happens at latency limits?',
        'How does the system degrade?',
        'What is your recovery strategy?',
      ],
    },
    {
      area: 'Infrastructure',
      questions: [
        'What is your cost footprint?',
        'How scalable is the system?',
        'What are your monitoring gaps?',
        'How is performance optimized?',
      ],
    },
    {
      area: 'Cost Efficiency',
      questions: [
        'Are you overspending on compute?',
        'Could you use smaller models?',
        'Are there latency-cost tradeoffs?',
        'What optimizations are missed?',
      ],
    },
    {
      area: 'Risk Assessment',
      questions: [
        'What are your data risks?',
        'What are your model risks?',
        'What are your operational risks?',
        'How exposed are you to failure?',
      ],
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">
          What We Analyze
        </h2>

        <p className="text-lg text-[#475569] mb-12 leading-relaxed">
          We ask hard questions. We look for inefficiencies, risks, and missed
          opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {analysisAreas.map((area, idx) => (
            <div
              key={idx}
              className="p-6 border border-[#E5E7EB] rounded-lg"
            >
              <h3 className="text-lg font-semibold text-[#0F172A] mb-4">
                {area.area}
              </h3>
              <ul className="space-y-2">
                {area.questions.map((q, qidx) => (
                  <li key={qidx} className="text-sm text-[#475569] flex gap-2">
                    <span className="text-[#334155] font-bold">Q</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}