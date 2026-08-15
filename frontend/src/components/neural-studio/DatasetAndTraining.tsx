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
    <section className="gx-section gx-studio-editorial">
      <div className="gx-container">
        <p className="gx-kicker">DATASET & TRAINING CAPABILITY</p><h2 className="gx-display">Research structure before <em>model behavior.</em></h2>

        <div className="gx-research-matrix gx-training-matrix">
          {strategies.map((strategy, idx) => (
            <div
              key={idx}
              className="gx-training-cell"
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

        <div className="gx-principle-block"><span>DRAFT BRAIN</span>
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
