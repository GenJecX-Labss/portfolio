export default function WhoThisIsFor() {
  const audiences = [
    {
      audience: 'Funded Startups',
      reason:
        'You have built something. You want expert feedback before scaling. You need confidence in your architecture.',
    },
    {
      audience: 'Scaling Teams',
      reason:
        'Your system is growing. You want to identify bottlenecks and risks before they become crises.',
    },
    {
      audience: 'CTO-Led Organizations',
      reason:
        'You are responsible for technical risk. You want independent assessment of your AI systems.',
    },
    {
      audience: 'Enterprises Adopting AI',
      reason:
        'You are deploying AI at scale. You need validation that your architecture is sound and secure.',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">
          Who This Is For
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {audiences.map((item, idx) => (
            <div
              key={idx}
              className="p-6 border border-[#E5E7EB] rounded-lg"
            >
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3">
                {item.audience}
              </h3>
              <p className="text-[#475569]">{item.reason}</p>
            </div>
          ))}
        </div>

        <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
          <p className="text-sm text-[#475569]">
            <span className="font-semibold text-[#0F172A]">Not For:</span> If you
            do not yet have an AI system, this audit is premature. Contact us when
            you have systems to review.
          </p>
        </div>
      </div>
    </section>
  );
}