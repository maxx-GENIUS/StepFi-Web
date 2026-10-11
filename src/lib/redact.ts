const SENSITIVE_KEYS = new Set(['authorization', 'accesstoken', 'refreshtoken', 'token', 'password', 'secret']);

export function truncateAddress(addr: string): string {
  if (typeof addr === 'string' && addr.startsWith('G') && addr.length === 56) {
    return ${addr.slice(0, 4)}...;
  }
  return addr;
}

export function redactContext(ctx: Record<string, unknown>, depth = 0): Record<string, unknown> {
  if (depth > 4 || typeof ctx !== 'object' || ctx === null) {
    return { '[truncated]': true };
  }

  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(ctx)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      continue; // Scrub credentials completely
    }
    if (key.toLowerCase() === 'headers' && typeof val === 'object') {
      result[key] = '[redacted]';
      continue;
    }
    if (typeof val === 'string') {
      result[key] = truncateAddress(val);
    } else if (typeof val === 'object' && val !== null) {
      result[key] = redactContext(val as Record<string, unknown>, depth + 1);
    } else {
      result[key] = val;
    }
  }
  return result;
}