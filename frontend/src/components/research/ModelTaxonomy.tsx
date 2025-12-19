export default function ModelTaxonomy() {
  const modelTypes = [
    {
      name: 'Tier 1: Custom-Trained Models',
      description: 'Built entirely from scratch on domain-specific data.',
      when: 'When the problem is novel or existing models are fundamentally misaligned.',
      examples: [
        'Neural networks trained on proprietary datasets',
        'Reinforcement learning systems for specific domains',
      ],
    },
    {
      name: 'Tier 2: Adapted Models',
      description: 'Pre-trained models fine-tuned for specific problems.',
      when: 'When a foundation model exists but needs domain specialization.',
      examples: [
        'Transfer learning from public models',
        'Domain-specific fine-tuning',
      ],
    },
    {
      name: 'Tier 3: LLM-Assisted Systems',
      description:
        'Systems where LLMs provide specific capabilities within broader architectures.',
      when: 'When language understanding is one component of a larger solution.',
      examples: ['Systems using LLMs for reasoning within controlled workflows'],
    },
    {
      name: 'Non-LLM Systems',
      description: 'Intelligence without reliance on large language models.',
      when: 'When LLMs are inappropriate, inefficient, or overkill for the task.',
      examples: [
        'Structured prediction models',
        'Time-series forecasting systems',
      ],
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">
          Model Taxonomy
        </h2>

        <p className="text-lg text-[#475569] mb-12 leading-relaxed">
          We think about models in clear categories. This taxonomy helps us communicate with clients about what we're building and why.
        </p>

        <div className="space-y-6">
          {modelTypes.map((modelType, idx) => (
            <div
              key={idx}
              className="p-8 border border-[#E5E7EB] rounded-lg hover:border-[#334155] transition-colors"
            >
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3">
                {modelType.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-[#334155] mb-1">
                    Definition
                  </p>
                  <p className="text-[#475569]">{modelType.description}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#334155] mb-1">
                    When We Use It
                  </p>
                  <p className="text-[#475569]">{modelType.when}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#334155] mb-2">
                    Examples
                  </p>
                  <ul className="space-y-1">
                    {modelType.examples.map((example, eidx) => (
                      <li
                        key={eidx}
                        className="text-[#475569] flex gap-2 text-sm"
                      >
                        <span className="text-[#334155]">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}