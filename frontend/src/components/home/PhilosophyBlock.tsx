export default function PhilosophyBlock() {
  const philosophies = [
    'We do not sell generic AI.',
    'We build intelligence where the problem demands it.',
    'Architecture comes before tooling.',
    'Research precedes scale.',
  ];

  return (
    <section className="px-6 py-20 md:py-28 bg-[#F9FAFB] border-top border-bottom">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-[#0F172A] mb-16">How We Think</h2>

        <div className="space-y-6">
          {philosophies.map((philosophy, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-6 bg-white rounded-lg border border-[#E5E7EB]"
            >
              <div className="flex-shrink-0 w-2 h-2 mt-3 bg-[#334155] rounded-full"></div>
              <p className="text-lg text-[#0F172A] font-medium">{philosophy}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-[#475569] mt-12">
          These principles inform every decision we make. They filter for serious clients solving real problems. They repel low-quality leads and misaligned work.
        </p>
      </div>
    </section>
  );
}