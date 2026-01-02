export default function StudioIntro() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
          Neural Studio
        </h1>

        <p className="text-xl text-[#475569] mb-8 leading-relaxed max-w-3xl">
          This is our R&D portfolio. Where we showcase custom neural networks, proprietary intelligence systems, and the research that powers them.
        </p>

        <div className="space-y-6 text-lg text-[#475569] leading-relaxed max-w-3xl">
          <p>
            This page is not for everyone and that's intentional. It answers a single question: <span className="font-semibold text-[#0F172A]">Do these people actually build intelligence from scratch?</span>
          </p>

          <p>
            If you're here looking to understand our technical depth, the research that guides our work, and the systems we've built without reliance on off-the-shelf models, you're in the right place.
          </p>
        </div>
      </div>
    </section>
  );
}