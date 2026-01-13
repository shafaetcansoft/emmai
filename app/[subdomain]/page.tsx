import { notFound } from 'next/navigation';
import { getTenant } from '@/lib/tenant';

interface Props {
  params: { subdomain: string };
}

export default async function TenantPage({ params }: Props) {
  const tenant = await getTenant(params.subdomain);

  if (!tenant) notFound();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Welcome to {tenant.subdomain}
      </h1>
    </div>
  );
}
