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
    <section className="gx-section gx-research-areas-section">
      <div className="gx-container">
        <p className="gx-kicker">RESEARCH AREAS</p><h2 className="gx-display">Questions with technical <em>consequences.</em></h2>

        <div className="gx-research-area-grid">
          {researchAreas.map((area, idx) => (
            <div
              key={idx}
              className="gx-research-area"
            >
              <span>R{idx + 1}</span><h3>
                {area.title}
              </h3>
              <p>{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
