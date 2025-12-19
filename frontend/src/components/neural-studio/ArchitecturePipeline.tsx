export default function ArchitecturePipeline() {
  const stages = [
    {
      stage: 'Data Ingestion',
      description: 'Multiple data sources unified into structured format.',
    },
    {
      stage: 'Draft Brain Curation',
      description: 'Knowledge organization before model training begins.',
    },
    {
      stage: 'Model Training',
      description: 'Custom architectures learning from organized data.',
    },
    {
      stage: 'Validation',
      description: 'Rigorous testing against real-world constraints.',
    },
    {
      stage: 'Inference & Feedback',
      description: 'Continuous learning through production feedback loops.',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28 bg-[#F9FAFB] border-top border-bottom">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">
          Architecture Pipeline
        </h2>

        <div className="space-y-4 mb-12">
          {stages.map((item, idx) => (
            <div key={idx} className="flex items-start gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#334155] text-white flex items-center justify-center font-semibold">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#0F172A] mb-1">
                  {item.stage}
                </h3>
                <p className="text-[#475569]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-white border border-[#E5E7EB] rounded-lg">
          <p className="text-sm text-[#475569]">
            <span className="font-semibold text-[#0F172A]">Key Principle:</span> Each stage is deliberately sequential. We do not skip problem understanding. We do not rush to LLM integration. Intelligence is designed, not defaulted.
          </p>
        </div>
      </div>
    </section>
  );
}