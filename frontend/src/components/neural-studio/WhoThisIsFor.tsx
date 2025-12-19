export default function WhoThisIsFor() {
  const audiences = [
    {
      role: 'CTOs & Technical Leaders',
      description:
        'Engineers and architects who need to understand whether a vendor has real technical depth.',
    },
    {
      role: 'Research Teams',
      description:
        'Organizations building proprietary intelligence and needing reference points for custom model development.',
    },
    {
      role: 'Serious Founders',
      description:
        'Teams that have invested in understanding their problem deeply and need systems that match that rigor.',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28 bg-[#F9FAFB] border-bottom">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">Who This Is For</h2>

        <div className="space-y-8">
          {audiences.map((audience, idx) => (
            <div key={idx} className="border-l-2 border-[#334155] pl-6">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                {audience.role}
              </h3>
              <p className="text-[#475569]">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}