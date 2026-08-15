'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';

const sections = [
  { label: 'Getting Started', links: [['About Genjecx', '/Founders'], ['What We Build', '/docs/solutions'], ['How We Work', '/Procees&Pricing']] },
  { label: 'Research', links: [['Research overview', '/docs/research'], ['Neural Studio', '/docs/research/neural-studio'], ['Research & Models', '/docs/research/models']] },
  { label: 'Work', links: [['Work overview', '/docs/work'], ['Case Studies', '/docs/work/case-studies'], ['Architecture', '/docs/work/architecture'], ['Architecture Audits', '/docs/work/architecture-audits']] },
  { label: 'Resources', links: [['Resources & Decision Guides', '/docs/resources'], ['Integrations & ecosystem', '/integrations'], ['Templates', '/templates'], ['Roadmap', '/roadmap'], ['FAQ', '/faq']] },
  { label: 'Company', links: [['About Genjecx', '/about'], ['Careers', '/careers'], ['Talk to Genjecx', '/ArchitectureAudit']] },
];
export function DocsShell({ eyebrow = 'Genjecx Docs', title, description, children }: { eyebrow?: string; title: string; description: string; children: ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const closeMobileNavigation = () => setIsMobileOpen(false);

  return <main className="gx-docs"><section className="gx-docs-hero"><div className="gx-container"><div className="gx-kicker">{eyebrow}</div><div className="gx-docs-breadcrumb"><Link href="/docs">Docs</Link><span>/</span><span>{title}</span></div><h1 className="gx-display">{title}</h1><p>{description}</p></div></section><div className={`gx-container gx-docs-layout ${isCollapsed ? 'is-collapsed' : ''}`}>
    <button className="gx-docs-toggle" type="button" onClick={() => setIsMobileOpen(!isMobileOpen)} aria-expanded={isMobileOpen} aria-controls="gx-docs-navigation">{isMobileOpen ? 'Close Docs navigation' : 'Browse Docs navigation'}</button>
    <aside id="gx-docs-navigation" className={`gx-docs-sidebar ${isMobileOpen ? 'is-mobile-open' : ''}`} aria-label="Documentation navigation">
      <div className="gx-docs-sidebar-head"><div className="gx-kicker">Documentation</div><button className="gx-docs-collapse" type="button" onClick={() => setIsCollapsed(!isCollapsed)} aria-expanded={!isCollapsed} aria-label={isCollapsed ? 'Expand Docs navigation' : 'Collapse Docs navigation'}><span aria-hidden="true">{isCollapsed ? '›' : '‹'}</span><span className="gx-docs-collapse-text">{isCollapsed ? 'Expand' : 'Collapse'}</span></button></div>
      <nav className="gx-docs-nav-links"><Link href="/docs" onClick={closeMobileNavigation} className={`gx-docs-home ${pathname === '/docs' ? 'active' : ''}`}>Everything at a glance</Link>{sections.map(section=><div className="gx-docs-group" key={section.label}><div>{section.label}</div>{section.links.map(([label,href])=><Link key={label} href={href} onClick={closeMobileNavigation} className={pathname === href ? 'active' : ''}>{label}</Link>)}</div>)}</nav>
    </aside>
    <article className="gx-docs-content">{children}</article>
  </div></main>;
}

export function DocsCard({ href, eyebrow, title, copy }: { href: string; eyebrow: string; title: string; copy: string }) { return <Link href={href} className="gx-docs-card"><span>{eyebrow}</span><h2 className="gx-display">{title}</h2><p>{copy}</p><b>Explore →</b></Link>; }
