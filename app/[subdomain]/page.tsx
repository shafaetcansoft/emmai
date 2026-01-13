import { notFound } from 'next/navigation';
import { getTenant } from '@/lib/tenant';

interface Props {
  params: Promise<{ subdomain: string }>;
}

export default async function TenantPage({ params }: Props) {
  const { subdomain } = await params;

  const tenant = await getTenant(subdomain);
  if (!tenant) notFound();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Welcome to {tenant.subdomain} 🎉
      </h1>
    </div>
  );
}
