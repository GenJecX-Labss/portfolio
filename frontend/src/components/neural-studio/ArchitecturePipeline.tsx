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
      <div className="gx-container gx-studio-editorial">
        <p className="gx-kicker">ARCHITECTURE PIPELINE</p><h2 className="gx-display">A deliberate path from data to <em>feedback.</em></h2>
        <div className="gx-editorial-rows gx-pipeline-rows">
          {stages.map((item, idx) => (
            <div key={idx}>
              <span>0{idx + 1}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-[#0F172A] mb-1">
                  {item.stage}
                </h3>
                <p className="text-[#475569]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="gx-principle-block"><span>KEY PRINCIPLE</span><p>Each stage is deliberately sequential. We do not skip problem understanding. We do not rush to LLM integration. Intelligence is designed, not defaulted.</p></div>
      </div>
    </section>
  );
}
