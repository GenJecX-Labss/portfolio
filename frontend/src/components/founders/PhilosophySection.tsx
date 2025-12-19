export default function PhilosophySection() {
  const philosophies = [
    {
      title: 'Research Before Scale',
      description:
        'We do not move fast and break things. We move deliberately and understand things. This is how you build systems that last.',
    },
    {
      title: 'Problems Come First',
      description:
        'We are obsessed with understanding problems deeply. The solution emerges from that understanding. Tools are secondary.',
    },
    {
      title: 'Depth Over Speed',
      description:
        'We choose depth and capability over quick deployments. This attracts clients who value the same.',
    },
    {
      title: 'Long-Term Thinking',
      description:
        'We build for systems that matter over years. That shapes every decision. It is not about next quarter. It is about next decade.',
    },
    {
      title: 'Intellectual Honesty',
      description:
        'We document failures. We acknowledge constraints. We do not oversell. Real credibility comes from being right, not from being loud.',
    },
    {
      title: 'Impact Matters',
      description:
        'We care about the problems we solve. If it does not matter, we do not do it. That filters for meaningful work.',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">
          How We Think
        </h2>

        <p className="text-lg text-[#475569] mb-12 leading-relaxed">
          These principles are not marketing copy. They drive everyday decisions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {philosophies.map((philosophy, idx) => (
            <div
              key={idx}
              className="p-6 border border-[#E5E7EB] rounded-lg hover:border-[#334155] transition-colors"
            >
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3">
                {philosophy.title}
              </h3>
              <p className="text-[#475569] leading-relaxed">
                {philosophy.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}