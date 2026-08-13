import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Explore how Genjecx thinks, builds and works across intelligent systems, research, architecture and applied work.',
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
