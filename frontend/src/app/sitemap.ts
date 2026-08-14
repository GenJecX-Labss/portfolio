import type { MetadataRoute } from 'next';

const routes = [
  '', '/products', '/integrations', '/pricing', '/templates', '/blogs', '/docs',
  '/docs/solutions', '/docs/research', '/docs/research/neural-studio', '/docs/research/models',
  '/docs/work', '/docs/work/architecture', '/docs/work/architecture-audits', '/docs/work/case-studies',
  '/about', '/careers', '/roadmap', '/faq',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `https://genjecxlabs.com${route || '/'}`, changeFrequency: 'monthly', priority: route === '' ? 1 : route === '/docs' || route === '/products' ? 0.8 : 0.6 }));
}
