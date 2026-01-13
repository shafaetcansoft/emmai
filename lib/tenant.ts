import { tenantDB } from './db/kv';
import { isValidSubdomain } from './validation';

export async function createTenant(subdomain: string) {
  if (!isValidSubdomain(subdomain)) {
    throw new Error('Invalid subdomain format');
  }

  if (await tenantDB.exists(subdomain)) {
    throw new Error('Domain already exists');
  }

  return tenantDB.create(subdomain);
}

export async function getTenant(subdomain: string) {
  return tenantDB.get(subdomain);
}
