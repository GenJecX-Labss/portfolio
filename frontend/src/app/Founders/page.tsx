import FoundersIntro from '@/components/founders/FoundersIntro';
import FounderCard from '@/components/founders/FounderCard';
import PhilosophySection from '@/components/founders/PhilosophySection';
import EthicalThinking from '@/components/founders/EthicalThinking';

export default function FoundersPage() {
  return (
    <div className="w-full">
      {/* Founders Intro */}
      <FoundersIntro />

      {/* Founders Cards */}
      <section className="section-padding border-bottom">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-12">
            <FounderCard
              name="Garima Kalra"
              role="Founder & Lead Researcher"
              education="BITS Pilani, CS + AI/ML Honors"
              background="Background and professional trajectory"
              obsessions={[
                'Representation learning and data organization',
                'Custom neural architectures for domain-specific problems',
                'Building intelligence from first principles',
              ]}
              focus="What problems they work on and why"
              imageSrc="/founders/garimaf.png"
              imageAlt="Garima Kalra"
            />
            <FounderCard
              name="Aurin Desai"
              role="Founder & System Architect"
              education="BITS Pilani, CS, Advanced ML"
              background="Background and professional trajectory"
              obsessions={[
                'AI system architecture and infrastructure',
                'Scaling custom intelligence without compromise',
                'Long-term research-driven product engineering',
              ]}
              focus="What problems they work on and why"
                imageSrc="/founders/aurinf.png"
                imageAlt="Aurin Desai"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Ethical Thinking */}
      <EthicalThinking />
    </div>
  );
}