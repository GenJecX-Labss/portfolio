export default function WhatWeDo() {
  const capabilities = [
    {
      title: 'Custom Model Development',
      description:
        'We build neural networks and intelligence systems from first principles. Not adapted models. Not LLM wrappers. Proprietary systems trained on your data, solving your specific problems.',
    },
    {
      title: 'AI System Architecture',
      description:
        'Enterprise-grade systems designed for scale, reliability, and control. From data ingestion through inference, we architect every component for performance and maintainability.',
    },
    {
      title: 'Research-Driven Automation',
      description:
        'Intelligence that emerges from deep research into your domain. We invest time understanding the problem before building the solution, ensuring lasting value.',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-[#0F172A]">What We Do</h2>
          <p className="text-lg text-[#475569] mt-4 max-w-2xl">
            Three core competencies that set us apart.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {capabilities.map((capability, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-xl font-semibold text-[#0F172A] mb-4">
                {capability.title}
              </h3>
              <p className="text-[#475569] leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}