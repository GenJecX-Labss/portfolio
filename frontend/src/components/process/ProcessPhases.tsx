export default function ProcessPhases() {
  const phases = [
    {
      number: 1,
      title: 'Problem Framing',
      description:
        'We spend time understanding your problem deeply. Not just the surface problem, but the underlying constraints, dependencies, and what success actually means. This phase determines everything that follows.',
    },
    {
      number: 2,
      title: 'Research & Data Strategy',
      description:
        'We research the domain. We understand available data, data quality, labeling requirements, and what synthetic data might be necessary. We plan the dataset before building anything.',
    },
    {
      number: 3,
      title: 'Architecture Design',
      description:
        'We design the system. Every component considered. Not selected based on hype, but on fit for your specific problem. This is where we decide: custom model, adapted model, or hybrid approach.',
    },
    {
      number: 4,
      title: 'Model Development',
      description:
        'We build and train. We document training dynamics, failure modes, and learning. We iterate based on validation results, not marketing timelines.',
    },
    {
      number: 5,
      title: 'System Integration',
      description:
        'Models do not exist in isolation. We integrate with your infrastructure. We handle data pipelines, inference servers, monitoring, and alerting. Everything is production-ready.',
    },
    {
      number: 6,
      title: 'Validation & Iteration',
      description:
        'We validate against real constraints. Latency budgets. Resource constraints. Domain expert review. We iterate until the system is reliable and meets your requirements.',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28 bg-[#F9FAFB] border-bottom">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">
          Our Process
        </h2>

        <p className="text-lg text-[#475569] mb-12 leading-relaxed">
          We follow a deliberate sequence. Each phase builds on the previous one.
          No shortcuts. No promises of speed.
        </p>

        <div className="space-y-6">
          {phases.map((phase) => (
            <div key={phase.number} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#334155] text-white flex items-center justify-center font-bold text-lg">
                  {phase.number}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
                  {phase.title}
                </h3>
                <p className="text-[#475569] leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white border border-[#E5E7EB] rounded-lg">
          <p className="text-sm text-[#475569]">
            <span className="font-semibold text-[#0F172A]">Key Principle:</span> We
            do not promise timelines because custom intelligence cannot be
            commodified. What matters is that the system works. How long that
            takes depends on your problem's complexity.
          </p>
        </div>
      </div>
    </section>
  );
}