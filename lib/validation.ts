export function isValidSubdomain(value: string): boolean {
  return /^[a-z0-9-]{2,30}$/.test(value);
}
