import { createRateLimitMiddleware, createWebSocketRateLimiter } from '@sequentialos/rate-limiter';

export { createRateLimitMiddleware, createWebSocketRateLimiter };

export function checkWebSocketRateLimit(ip, limiter) {
  return limiter.checkLimit(ip);
}
