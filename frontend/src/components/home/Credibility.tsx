export default function CredibilityStrip() {
  const credentials = [
    {
      label: 'BITS Pilani',
      description: 'Founders',
    },
    {
      label: 'CS + AI/ML Honors',
      description: 'Advanced Technical Training',
    },
    {
      label: 'Custom Neural Models',
      description: 'Proprietary Research',
    },
    {
      label: 'Long-term R&D Lab',
      description: 'Research-First Approach',
    },
  ];

  return (
    <section className="px-6 py-16 bg-[#F9FAFB] border-top border-bottom">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {credentials.map((credential, idx) => (
            <div key={idx} className="text-center">
              <p className="text-sm font-semibold text-[#0F172A] mb-2">
                {credential.label}
              </p>
              <p className="text-xs text-[#475569]">
                {credential.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}