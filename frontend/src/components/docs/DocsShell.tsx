'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';

const sections = [
  { label: 'Getting Started', links: [['About Genjecx', '/Founders'], ['What We Build', '/docs/solutions'], ['How We Work', '/Procees&Pricing']] },
  { label: 'Research', links: [['Research overview', '/docs/research'], ['Neural Studio', '/docs/research/neural-studio'], ['Research & Models', '/docs/research/models']] },
  { label: 'Work', links: [['Work overview', '/docs/work'], ['Case Studies', '/docs/work/case-studies'], ['Architecture', '/docs/work/architecture'], ['Architecture Audits', '/docs/work/architecture-audits']] },
  { label: 'Resources', links: [['Integrations & ecosystem', '/integrations'], ['Templates', '/templates'], ['Roadmap', '/roadmap'], ['FAQ', '/faq']] },
  { label: 'Company', links: [['About Genjecx', '/about'], ['Careers', '/careers'], ['Talk to Genjecx', '/ArchitectureAudit']] },
];
export function DocsShell({ eyebrow = 'Genjecx Docs', title, description, children }: { eyebrow?: string; title: string; description: string; children: ReactNode }) {
  const pathname = usePathname(); const [open,setOpen] = useState(false);
  const nav = <aside className="gx-docs-sidebar"><div className="gx-kicker">Documentation</div><Link href="/docs" className={`gx-docs-home ${pathname === '/docs' ? 'active' : ''}`}>Everything at a glance</Link>{sections.map(section=><div className="gx-docs-group" key={section.label}><div>{section.label}</div>{section.links.map(([label,href])=><Link key={label} href={href} className={pathname === href ? 'active' : ''}>{label}</Link>)}</div>)}</aside>;
  return <main className="gx-docs"><section className="gx-docs-hero"><div className="gx-container"><div className="gx-kicker">{eyebrow}</div><div className="gx-docs-breadcrumb"><Link href="/docs">Docs</Link><span>/</span><span>{title}</span></div><h1 className="gx-display">{title}</h1><p>{description}</p></div></section><div className="gx-container gx-docs-layout"><button className="gx-docs-toggle" onClick={()=>setOpen(!open)} aria-expanded={open}>Browse Docs {open ? '−' : '+'}</button><div className={open ? 'gx-docs-mobile-nav open' : 'gx-docs-mobile-nav'}>{nav}</div>{nav}<article className="gx-docs-content">{children}</article></div></main>;
}

export function DocsCard({ href, eyebrow, title, copy }: { href: string; eyebrow: string; title: string; copy: string }) { return <Link href={href} className="gx-docs-card"><span>{eyebrow}</span><h2 className="gx-display">{title}</h2><p>{copy}</p><b>Explore →</b></Link>; }
