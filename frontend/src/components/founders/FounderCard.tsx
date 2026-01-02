import Image from 'next/image';

interface FounderCardProps {
  name: string;
  role: string;
  education: string;
  background: string;
  obsessions: string[];
  focus: string;
  imageSrc: string;
  imageAlt?: string;
}

export default function FounderCard({
  name,
  role,
  education,
  background,
  obsessions,
  focus,
  imageSrc,
  imageAlt,
}: FounderCardProps) {
  return (
    <div className="flex flex-col">
      {/* Founder Image */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6">
        <Image
          src={imageSrc}
          alt={imageAlt || name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Name & Role */}
      <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{name}</h3>
      <p className="text-lg text-[#334155] font-medium mb-4">{role}</p>

      {/* Education */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#0F172A] mb-1">Education</p>
        <p className="text-[#475569]">{education}</p>
      </div>

      {/* Background */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#0F172A] mb-2">Background</p>
        <p className="text-[#475569] leading-relaxed">{background}</p>
      </div>

      {/* Obsessions */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#0F172A] mb-3">
          Areas of Focus
        </p>
        <ul className="space-y-2">
          {obsessions.map((obsession, idx) => (
            <li key={idx} className="text-[#475569] flex gap-2">
              <span className="text-[#334155] font-bold">•</span>
              <span>{obsession}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Focus */}
      <div className="pt-6 border-t border-[#E5E7EB]">
        <p className="text-sm text-[#475569]">{focus}</p>
      </div>
    </div>
  );
}
