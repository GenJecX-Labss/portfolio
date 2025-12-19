export default function WhatThisIs() {
  const auditTypes = [
    {
      name: 'System Architecture Review',
      description:
        'We review your AI system end-to-end. Data pipelines, model choices, inference infrastructure, monitoring. We identify bottlenecks, inefficiencies, and risks.',
    },
    {
      name: 'Model Audit',
      description:
        'We examine your models. Training data, validation approach, failure modes, latency profile. We tell you what works and where it fails.',
    },
    {
      name: 'Data Strategy Review',
      description:
        'We assess your data. Is it organized effectively? Are labeling practices sound? Can the data support the intended uses?',
    },
    {
      name: 'Infrastructure Assessment',
      description:
        'We review your deployment infrastructure. Cost efficiency, scalability, reliability, monitoring. What is working? What needs to change?',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28 bg-[#F9FAFB] border-bottom">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">
          What We Audit
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {auditTypes.map((auditType, idx) => (
            <div
              key={idx}
              className="p-6 border border-[#E5E7EB] rounded-lg"
            >
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3">
                {auditType.name}
              </h3>
              <p className="text-[#475569]">{auditType.description}</p>
            </div>
          ))}
        </div>

        <div className="p-6 bg-white border border-[#E5E7EB] rounded-lg">
          <p className="text-sm text-[#475569]">
            <span className="font-semibold text-[#0F172A]">
              What This Is Not:
            </span>{' '}
            This is not a sales pitch. We will not recommend "solutions" we sell. We
            give you honest feedback on what we see.
          </p>
        </div>
      </div>
    </section>
  );
}