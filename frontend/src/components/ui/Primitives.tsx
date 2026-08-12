import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonProps = { href?: string; children: ReactNode; variant?: 'primary' | 'secondary'; className?: string; onClick?: () => void };
export function Button({ href, children, variant = 'primary', className = '', onClick }: ButtonProps) {
  const styles = `gx-button gx-button-${variant} ${className}`;
  return href ? <Link href={href} className={styles}>{children}<span aria-hidden="true">→</span></Link> : <button onClick={onClick} className={styles}>{children}<span aria-hidden="true">→</span></button>;
}

export function SectionHeader({ kicker, title, copy, align = 'left' }: { kicker?: string; title: ReactNode; copy?: ReactNode; align?: 'left' | 'center' }) {
  return <div style={{ maxWidth: 700, margin: align === 'center' ? '0 auto' : undefined, textAlign: align }}>
    {kicker && <div className="gx-kicker">{kicker}</div>}
    <h2 className="gx-display" style={{ fontSize: 'clamp(34px, 4vw, 56px)', margin: '14px 0 18px' }}>{title}</h2>
    {copy && <div className="gx-copy">{copy}</div>}
  </div>;
}

export function PageHero({ kicker, title, copy, children }: { kicker: string; title: ReactNode; copy: ReactNode; children?: ReactNode }) {
  return <section className="gx-section" style={{ paddingTop: 160, background: 'radial-gradient(circle at 85% 25%, rgba(233,30,140,.12), transparent 28%), var(--gx-bg)' }}><div className="gx-container"><div style={{ maxWidth: 850 }} className="gx-reveal"><div className="gx-kicker">{kicker}</div><h1 className="gx-display" style={{ fontSize: 'clamp(46px, 6vw, 82px)', margin: '16px 0 22px' }}>{title}</h1><div className="gx-copy" style={{ maxWidth: 650 }}>{copy}</div>{children}</div></div></section>;
}
