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
    <section className="w-full bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-[#94A3B8] uppercase mb-3">
          Dataset &amp; Training Capability
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-[#0F172A] mb-12 leading-tight">
          Research structure before <em className="italic">model behavior.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {strategies.map((strategy, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-[#0F172A] mb-4 pb-3 border-b border-[#E2E8F0]">
                {strategy.title}
              </h3>
              <ul className="space-y-3">
                {strategy.points.map((point, pidx) => (
                  <li key={pidx} className="text-sm text-[#475569] flex gap-2 leading-relaxed">
                    <span className="text-[#334155] font-bold shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-[#0F172A] rounded-xl p-8">
          <span className="text-xs font-semibold tracking-widest text-[#94A3B8] uppercase">
            Draft Brain
          </span>
          <p className="text-[#CBD5E1] mt-3 mb-3 leading-relaxed">
            Before training begins, we organize knowledge. The "Draft Brain" is knowledge
            curation: how data is structured, what relationships matter, what patterns we
            expect the model to discover.
          </p>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            This happens before any model touches the data. Why? Because intelligence starts
            with understanding. Data organization affects outcomes more than most people realize.
          </p>
        </div>
      </div>
    </section>
  );
}