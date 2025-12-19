export default function WhatWeBuild() {
  const projects = [
    {
      id: 1,
      name: 'Custom Neural Networks',
      description: 'Purpose-built architectures trained on domain-specific data.',
      status: 'Production',
    },
    {
      id: 2,
      name: 'R&D-Heavy Models',
      description: 'Research-grade systems where exploration and learning drive the design.',
      status: 'Active Research',
    },
    {
      id: 3,
      name: 'Proprietary Intelligence',
      description: 'Systems built entirely without LLM dependence, where all intelligence is trained or designed.',
      status: 'Deployed',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">What We Build</h2>

        <div className="space-y-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-8 border border-[#E5E7EB] rounded-lg hover:border-[#334155] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-[#0F172A]">
                  {project.name}
                </h3>
                <span className="text-xs font-medium text-[#334155] px-3 py-1 bg-[#F9FAFB] rounded-full">
                  {project.status}
                </span>
              </div>
              <p className="text-[#475569]">{project.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
          <p className="text-sm text-[#475569]">
            <span className="font-semibold text-[#0F172A]">Note:</span> Only research-grade and custom-built systems appear here. Adapted models and LLM-integrated systems are documented separately in our case studies.
          </p>
        </div>
      </div>
    </section>
  );
}