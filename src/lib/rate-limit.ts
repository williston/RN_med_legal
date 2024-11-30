import { RateLimiter } from 'limiter';

export function createRateLimiter() {
  return new RateLimiter({
    tokensPerInterval: 100,
    interval: 15 * 60 * 1000  // 15 minutes in milliseconds
  });
}