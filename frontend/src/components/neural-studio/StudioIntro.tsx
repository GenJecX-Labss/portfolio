export default function StudioIntro() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
          Neural Studio
        </h1>

        <p className="text-xl text-[#475569] mb-8 leading-relaxed max-w-3xl">
          A focused environment for exploring what happens when we move closer to the model itself.
        </p>

        <div className="space-y-6 text-lg text-[#475569] leading-relaxed max-w-3xl">
          <p>
            We investigate neural architectures, training approaches, inference behavior, specialized models and hybrid intelligence systems for problems where generic AI reaches its limits.
          </p>

          <p>
            Architecture asks what structure the model should have. Training, representation, inference, evaluation and optimization ask how it should learn, behave and improve. Existing diagrams and research notes remain the source of documented work.
          </p>
        </div>
      </div>
    </section>
  );
}
