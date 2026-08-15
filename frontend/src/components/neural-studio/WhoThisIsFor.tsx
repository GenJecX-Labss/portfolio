const audiences = [
    {
      role: 'CTOs & Technical Leaders',
      description:
        'Engineers and architects who need to understand whether a vendor has real technical depth.',
    },
    {
      role: 'Research Teams',
      description:
        'Organizations building proprietary intelligence and needing reference points for custom model development.',
    },
    {
      role: 'Serious Founders',
      description:
        'Teams that have invested in understanding their problem deeply and need systems that match that rigor.',
    },
];

export default function WhoThisIsFor() {
  return <section className="gx-section gx-studio-editorial"><div className="gx-container"><p className="gx-kicker">WHO THIS IS FOR</p><h2 className="gx-display">Technical curiosity meets <em>system rigor.</em></h2><div className="gx-editorial-rows">{audiences.map((audience, index) => <article key={audience.role}><span>0{index + 1}</span><div><h3 className="gx-display">{audience.role}</h3><p>{audience.description}</p></div></article>)}</div></div></section>;
}
