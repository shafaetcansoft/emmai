export function isValidSubdomain(value: string) {
  return /^[a-z0-9-]{3,30}$/.test(value);
}
