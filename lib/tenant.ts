import { redis } from './db/redis';
import { isValidSubdomain } from './validation';

const key = (subdomain: string) => `tenant:${subdomain}`;

export async function createTenant(subdomain: string) {
  if (!isValidSubdomain(subdomain)) {
    throw new Error('Invalid subdomain');
  }

  const exists = await redis.get(key(subdomain));
  if (exists) {
    throw new Error('Domain already exists');
  }

  const tenant = { subdomain, createdAt: Date.now() };
  await redis.set(key(subdomain), tenant);

  return tenant;
}

export async function getTenant(subdomain: string) {
  return redis.get<{ subdomain: string }>(key(subdomain));
}
