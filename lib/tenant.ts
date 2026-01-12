import { tenantDB } from './db/memory';
import { isValidSubdomain } from './valication';

export function createTenant(subdomain: string) {
  if (!isValidSubdomain(subdomain)) {
    throw new Error('Invalid subdomain format');
  }

  if (tenantDB.exists(subdomain)) {
    throw new Error('Domain already exists');
  }

  return tenantDB.create(subdomain);
}

export function getTenant(subdomain: string) {
  return tenantDB.get(subdomain);
}
