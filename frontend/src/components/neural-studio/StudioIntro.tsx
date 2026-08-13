export default function StudioIntro() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
          Neural Studio
        </h1>

        <p className="text-xl text-[#475569] mb-8 leading-relaxed max-w-3xl">
          A focused environment for experimenting with models and neural architectures that do not fit neatly into standard AI APIs.
        </p>

        <div className="space-y-6 text-lg text-[#475569] leading-relaxed max-w-3xl">
          <p>
            Neural Studio is where we work closer to the model itself: architecture, training, inference, representation, optimization, hybrid neural systems and deterministic behavior.
          </p>

          <p>
            Existing diagrams and research notes show the documented work. Where an experiment is still in progress, we label it honestly rather than implying a finished scientific result.
          </p>
        </div>
      </div>
    </section>
  );
}
