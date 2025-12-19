export default function FailureModesAndLimits() {
  const failureModes = [
    {
      mode: 'Hallucinations',
      description:
        'LLMs generate plausible but false information. Our approach: Constrain outputs, verify against structured data, use verification layers.',
    },
    {
      mode: 'Data Drift',
      description:
        'Real-world data changes. Models trained on yesterday\'s data may fail today. Our approach: Continuous monitoring, regular retraining cycles, robust validation.',
    },
    {
      mode: 'Latency Constraints',
      description:
        'Some problems require sub-millisecond responses. Large models are impossible. Our approach: Right-size architectures, optimize for your latency budget.',
    },
    {
      mode: 'Infrastructure Limits',
      description:
        'GPUs are expensive. Some systems require edge deployment. Our approach: Design architectures that fit real infrastructure constraints.',
    },
    {
      mode: 'Interpretability Loss',
      description:
        'Black-box models harm trust in high-stakes domains. Our approach: Build interpretable systems where it matters. Accept opacity only when necessary.',
    },
    {
      mode: 'Cold-Start Problems',
      description:
        'New domains with limited data. Our approach: Leverage domain knowledge, synthetic data carefully, human-in-the-loop validation.',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-4">
          Failure Modes & Limits
        </h2>

        <p className="text-lg text-[#475569] mb-12 leading-relaxed">
          This is rare and valuable. We document where AI fails, and what we do about it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {failureModes.map((mode, idx) => (
            <div
              key={idx}
              className="p-6 border border-[#E5E7EB] rounded-lg"
            >
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3">
                {mode.mode}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {mode.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg">
          <p className="text-sm text-[#92400E]">
            <span className="font-semibold">Important:</span> The fact that we
            document these failures signals real research behavior. We are not
            selling hype. We are solving problems rigorously.
          </p>
        </div>
      </div>
    </section>
  );
}