import { notFound } from 'next/navigation';
import { capabilitySlugs, ProductCapabilityPage } from '@/components/marketing/ProductCapabilityPage';

export function generateStaticParams() { return capabilitySlugs.map((capability) => ({ capability })); }

export default function CapabilityPage({ params }: { params: { capability: string } }) {
  if (!capabilitySlugs.includes(params.capability)) notFound();
  return <ProductCapabilityPage slug={params.capability} />;
}
