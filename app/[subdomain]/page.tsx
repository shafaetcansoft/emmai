import { notFound } from 'next/navigation';
import { getTenant } from '@/lib/tenant';

interface Props {
  params: { subdomain: string };
}

export default function TenantPage({ params }: Props) {
  const tenant = getTenant(params.subdomain);

  if (!tenant) notFound();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Welcome to {tenant.subdomain}
      </h1>
    </div>
  );
}
