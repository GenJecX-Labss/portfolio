export default function AuditCTA() {
  return (
    <section className="px-6 py-20 md:py-28 bg-[#0F172A]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Request an Architecture Audit
          </h2>
          <p className="text-lg text-[#E5E7EB]">
            Tell us about your systems. We will schedule a call to understand scope
            and timeline.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-[#1F2937] p-8 rounded-lg border border-[#374151]">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Your Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-[#111827] border border-[#4B5563] rounded-md text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#334155]"
                placeholder="Full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Company
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-[#111827] border border-[#4B5563] rounded-md text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#334155]"
                placeholder="Company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-[#111827] border border-[#4B5563] rounded-md text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#334155]"
                placeholder="email@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tell us about your systems
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 bg-[#111827] border border-[#4B5563] rounded-md text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#334155]"
                placeholder="What AI systems are you running? What are your concerns?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-white text-[#0F172A] font-semibold rounded-md hover:bg-[#E5E7EB] transition-colors"
            >
              Request Audit
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#E5E7EB] text-sm">
            Or email us directly at{' '}
            <a
              href="mailto:audit@genjex.com"
              className="text-white font-medium hover:underline"
            >
              audit@genjex.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}