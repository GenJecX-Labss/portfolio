export default function ResearchAreas() {
  const researchAreas = [
    {
      title: 'Representation Learning',
      description:
        'How to structure data and learned representations so they capture domain knowledge. What makes a good feature? How do we enforce meaningful structure before training?',
    },
    {
      title: 'Domain-Specific Intelligence',
      description:
        'Building models that understand the nuances of specific domains. Custom architectures for custom problems. Not generic, always particular.',
    },
    {
      title: 'Data-Centric AI',
      description:
        'The belief that data organization matters more than model complexity. We invest heavily in understanding data before building models.',
    },
    {
      title: 'Model Failure Analysis',
      description:
        'Understanding where and why models fail. Documenting edge cases, latency constraints, and failure modes. Building systems that gracefully degrade.',
    },
    {
      title: 'Human-Aligned Systems',
      description:
        'Building AI that operates within clear human values. Particularly important for mental health and medical systems where alignment is non-negotiable.',
    },
    {
      title: 'Efficient Intelligence',
      description:
        'Creating models that do more with less. Lower latency. Smaller footprints. Better interpretability. Never sacrificing capability for efficiency.',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28 bg-[#F9FAFB] border-bottom">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">Research Areas</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchAreas.map((area, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-[#E5E7EB] rounded-lg"
            >
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3">
                {area.title}
              </h3>
              <p className="text-[#475569] leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}