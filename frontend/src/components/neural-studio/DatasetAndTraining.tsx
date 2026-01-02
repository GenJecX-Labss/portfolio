export default function DatasetAndTraining() {
  const strategies = [
    {
      title: 'Data Organization',
      points: [
        'Hierarchical data structures reflecting domain logic',
        'Systematic labeling with clear intent',
        'Version control for all training data',
        'Continuous quality audits',
      ],
    },
    {
      title: 'Training Philosophy',
      points: [
        'Small, focused datasets beat large unfocused ones',
        'Synthetic data used strategically, never as default',
        'Failure modes identified before production',
        'Models are interpretable, not black boxes',
      ],
    },
    {
      title: 'Validation Approach',
      points: [
        'Domain expert validation is mandatory',
        'Real-world constraint testing',
        'Latency and resource requirements tested early',
        'Feedback loops built into production systems',
      ],
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">
          Dataset & Training Capability
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {strategies.map((strategy, idx) => (
            <div
              key={idx}
              className="p-6 border border-[#E5E7EB] rounded-lg"
            >
              <h3 className="text-lg font-semibold text-[#0F172A] mb-4">
                {strategy.title}
              </h3>
              <ul className="space-y-2">
                {strategy.points.map((point, pidx) => (
                  <li key={pidx} className="text-sm text-[#475569] flex gap-2">
                    <span className="text-[#334155] font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
          <h3 className="font-semibold text-[#0F172A] mb-3">
            Draft Brain Concept
          </h3>
          <p className="text-[#475569] mb-3">
            Before training begins, we organize knowledge. The "Draft Brain" is knowledge curation how data is structured, what relationships matter, what patterns we expect the model to discover.
          </p>
          <p className="text-sm text-[#475569]">
            This happens before any model touches the data. Why? Because intelligence starts with understanding. Data organization affects outcomes more than most people realize.
          </p>
        </div>
      </div>
    </section>
  );
}