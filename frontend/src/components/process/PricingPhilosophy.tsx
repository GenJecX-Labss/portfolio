export default function PricingPhilosophy() {
  const pricingFactors = [
    {
      factor: 'Problem Complexity',
      explanation:
        'How hard is the problem? Novel domains require more research. Well-understood domains require less.',
    },
    {
      factor: 'Data Requirements',
      explanation:
        'Do you have clean data? Do we need to build labeling infrastructure? Synthetic data generation adds cost and time.',
    },
    {
      factor: 'Custom Architecture',
      explanation:
        'Are we adapting existing models or building from scratch? Custom neural networks require more research and validation.',
    },
    {
      factor: 'Integration Complexity',
      explanation:
        'How complex is your infrastructure? Real-time requirements? Edge deployment? These affect implementation cost.',
    },
    {
      factor: 'Team Involvement',
      explanation:
        'How much domain expertise do you bring? How much do we need to contribute to problem framing?',
    },
    {
      factor: 'Timeline Flexibility',
      explanation:
        'Do you need it done slowly (lower cost) or with urgency (higher cost)? We do not rush research.',
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">
          Pricing Philosophy
        </h2>

        <div className="mb-12">
          <h3 className="text-xl font-semibold text-[#0F172A] mb-4">
            Why Pricing Varies
          </h3>
          <p className="text-[#475569] leading-relaxed mb-8">
            We do not have fixed price points. Each project is unique. The cost depends on what you are building and why.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricingFactors.map((item, idx) => (
              <div key={idx} className="p-6 border border-[#E5E7EB] rounded-lg">
                <h4 className="font-semibold text-[#0F172A] mb-2">
                  {item.factor}
                </h4>
                <p className="text-sm text-[#475569]">{item.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-8 border border-[#334155] rounded-lg bg-[#F9FAFB]">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-4">
              Tier-3 (Custom Neural Networks)
            </h3>
            <p className="text-[#475569] mb-4">
              Full research and development. Proprietary models built from scratch. High investment. High value for organizations solving novel problems.
            </p>
            <p className="text-sm text-[#334155] font-mono">
              Typically ₹5,00,000 - ₹20,00,000+ depending on complexity
            </p>
          </div>

          <div className="p-8 border border-[#E5E7EB] rounded-lg">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-4">
              Tier-2 (Adapted Models)
            </h3>
            <p className="text-[#475569] mb-4">
              Fine-tuning and customization. Foundation models adapted for your domain. Moderate investment. Right for organizations building on proven architectures.
            </p>
            <p className="text-sm text-[#334155] font-mono">
              Typically ₹2,00,000 - ₹6,00,000 depending on scope
            </p>
          </div>

          <div className="p-8 border border-[#E5E7EB] rounded-lg">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-4">
              Tier-1 (LLM-Assisted Systems)
            </h3>
            <p className="text-[#475569] mb-4">
              Integration and deployment. LLMs as components. Lower investment. Right for teams adding AI to existing products.
            </p>
            <p className="text-sm text-[#334155] font-mono">
              Typically ₹50,000 - ₹2,00,000 depending on integration complexity
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-[#FEF3C7] border border-[#F59E0B] rounded-lg">
          <p className="text-sm text-[#92400E]">
            <span className="font-semibold">No Discounts. No Surprises.</span> These
            ranges reflect real costs. Custom intelligence is expensive because it
            is real work. We do not compete on price. We compete on depth and
            capability.
          </p>
        </div>
      </div>
    </section>
  );
}