import { kv } from '@vercel/kv';

export const tenantDB = {
  async exists(subdomain: string) {
    return Boolean(await kv.get(`tenant:${subdomain}`));
  },

  async create(subdomain: string) {
    const tenant = { subdomain, createdAt: Date.now() };
    await kv.set(`tenant:${subdomain}`, tenant);
    return tenant;
  },

  async get(subdomain: string) {
    return await kv.get<{ subdomain: string }>(`tenant:${subdomain}`);
  },
};
