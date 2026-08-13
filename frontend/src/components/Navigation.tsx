'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const productItems = [
  ['Intelligent Systems', '/products'], ['Intelligence Infrastructure', '/products'], ['Custom Models', '/products'], ['Custom Infrastructure', '/products'], ['AI R&D', '/products'], ['Consulting & Advisory', '/ArchitectureAudit'],
];
const moreItems = [['About Genjecx', '/about'], ['Careers', '/careers'], ['Roadmap', '/roadmap'], ['FAQ', '/faq'], ['Case Studies', '/docs/work/case-studies'], ['Talk to Genjecx', '/ArchitectureAudit']];
const links = [['Blogs', '/blogs'], ['Docs', '/docs'], ['Integrations', '/integrations'], ['Templates', '/templates'], ['Pricing', '/pricing']];
const mobileGroups: Array<{ label: string; items: string[][] }> = [
  { label: 'Products', items: productItems },
  ...links.map(([label, href]) => ({ label, items: [[label, href]] })),
  { label: 'More', items: moreItems },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false); const [open, setOpen] = useState<string | null>(null); const [scrolled, setScrolled] = useState(false); const pathname = usePathname();
  useEffect(() => { const handle = () => setScrolled(window.scrollY > 16); window.addEventListener('scroll', handle, { passive: true }); return () => window.removeEventListener('scroll', handle); }, []);
  useEffect(() => { setMobileOpen(false); setOpen(null); }, [pathname]);
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === 'Escape' && (setOpen(null), setMobileOpen(false)); window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, []);
  const isActive = (href: string) => href === '/docs' ? pathname.startsWith('/docs') : pathname === href;
  const Menu = ({ label, items }: { label: string; items: string[][] }) => <div className="gx-nav-menu"><button aria-expanded={open === label} onClick={() => setOpen(open === label ? null : label)} onMouseEnter={() => setOpen(label)} className={`gx-nav-link ${open === label ? 'active' : ''}`}>{label}<span>⌄</span></button>{open === label && <div className="gx-dropdown" onMouseLeave={() => setOpen(null)}>{items.map(([name, href]) => <Link key={name} href={href} className="gx-dropdown-link">{name}<span>→</span></Link>)}</div>}</div>;
  return <header className={`gx-nav ${scrolled ? 'scrolled' : ''}`}><nav className="gx-container gx-nav-inner" aria-label="Primary navigation">
    <Link href="/" className="gx-wordmark">GEN<span>JECX</span></Link>
    <div className="gx-nav-desktop"><Menu label="Products" items={productItems} />{links.map(([label, href]) => <Link key={label} href={href} className={`gx-nav-link ${isActive(href) ? 'active' : ''}`}>{label}</Link>)}<Menu label="More" items={moreItems} /></div>
    <div className="gx-nav-actions"><Link href="/ArchitectureAudit" className="gx-nav-cta">Talk to Genjecx <span>→</span></Link><button className="gx-menu-toggle" aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? '×' : '☰'}</button></div>
  </nav>{mobileOpen && <div className="gx-mobile-nav"><div className="gx-container">{mobileGroups.map(({ label, items }) => <details key={label}><summary>{label}</summary>{items.map(([name, href]) => <Link key={name} href={href}>{name}</Link>)}</details>)}<Link href="/ArchitectureAudit" className="gx-button gx-button-primary" style={{ marginTop: 20 }}>Talk to Genjecx <span>→</span></Link></div></div>}</header>;
}
