export default function EthicalThinking() {
  const ethicalStances = [
    {
      domain: 'Mental Health & Medical Systems',
      stance:
        'We build these systems with exceptional care. Domain expertise is mandatory. Human validation is non-negotiable. We do not cut corners on interpretability.',
    },
    {
      domain: 'Data Privacy & Ownership',
      stance:
        'Your data is yours. We do not use it for other purposes. We do not resell insights. Clear, binding agreements on data handling.',
    },
    {
      domain: 'Transparency & Documentation',
      stance:
        'We document everything. You own the models, the training data, the architecture. Portability is guaranteed. No vendor lock-in.',
    },
    {
      domain: 'Impact Alignment',
      stance:
        'We choose work that matters. We do not build systems for harm. If the intended use conflicts with our values, we will decline.',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28 bg-[#F9FAFB] border-top border-bottom">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">
          Ethical & Long-Term Thinking
        </h2>

        <p className="text-lg text-[#475569] mb-12 leading-relaxed">
          We are guided by long-term values, not short-term incentives. This shapes how we work.
        </p>

        <div className="space-y-6">
          {ethicalStances.map((item, idx) => (
            <div key={idx} className="p-6 bg-white border border-[#E5E7EB] rounded-lg">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3">
                {item.domain}
              </h3>
              <p className="text-[#475569] leading-relaxed">{item.stance}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white border border-[#E5E7EB] rounded-lg">
          <p className="text-sm text-[#475569]">
            <span className="font-semibold text-[#0F172A]">Why This Matters:</span>{' '}
            Long-term thinking means we invest in relationships, not transactions.
            We build systems designed to work for years. We choose clients and
            problems carefully. This is how trust is earned.
          </p>
        </div>
      </div>
    </section>
  );
}