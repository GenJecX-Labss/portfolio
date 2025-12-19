export default function IPOwnershipStatement() {
  return (
    <section className="px-6 py-20 md:py-28 bg-[#0F172A]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Intellectual Property</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Clear Ownership. No Ambiguity.
            </h3>
            <p className="text-[#E5E7EB] leading-relaxed">
              Every custom system we build is your property. All models, training methodologies, and architectures developed specifically for your problem are owned entirely by you.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              What You Own
            </h3>
            <ul className="space-y-2">
              <li className="text-[#E5E7EB] flex gap-3">
                <span className="text-[#94A3B8]">✓</span>
                <span>Custom models and neural architectures</span>
              </li>
              <li className="text-[#E5E7EB] flex gap-3">
                <span className="text-[#94A3B8]">✓</span>
                <span>Training data organization and labeling</span>
              </li>
              <li className="text-[#E5E7EB] flex gap-3">
                <span className="text-[#94A3B8]">✓</span>
                <span>System architecture and design documentation</span>
              </li>
              <li className="text-[#E5E7EB] flex gap-3">
                <span className="text-[#94A3B8]">✓</span>
                <span>All inference code and deployment specifications</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Our Standards
            </h3>
            <p className="text-[#E5E7EB] leading-relaxed">
              We document everything. You receive complete model weights, training procedures, validation results, and architectural decisions. Portability and independence are guaranteed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}