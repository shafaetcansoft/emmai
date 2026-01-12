export interface Tenant {
  subdomain: string;
  createdAt: number;
}

const tenants = new Map<string, Tenant>();

export const tenantDB = {
  get(subdomain: string) {
    return tenants.get(subdomain);
  },

  exists(subdomain: string) {
    return tenants.has(subdomain);
  },

  create(subdomain: string) {
    const tenant: Tenant = {
      subdomain,
      createdAt: Date.now(),
    };
    tenants.set(subdomain, tenant);
    return tenant;
  },

  all() {
    return Array.from(tenants.values());
  },
};
