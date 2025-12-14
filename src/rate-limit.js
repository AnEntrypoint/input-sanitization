class RateLimiter {
  constructor(maxRequests = 100, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  checkLimit(key) {
    const now = Date.now();
    const entry = this.requests.get(key);

    if (!entry) {
      this.requests.set(key, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (now > entry.resetTime) {
      this.requests.set(key, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (entry.count < this.maxRequests) {
      entry.count++;
      return true;
    }

    return false;
  }
}

export function createRateLimitMiddleware(options = {}) {
  const limiter = new RateLimiter(
    options.max || 100,
    options.windowMs || 60000
  );

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    if (!limiter.checkLimit(key)) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    next();
  };
}

export function createWebSocketRateLimiter(options = {}) {
  return new RateLimiter(
    options.maxConnectionsPerIp || 10,
    options.windowMs || 60000
  );
}

export function checkWebSocketRateLimit(ip, limiter) {
  return limiter.checkLimit(ip);
}
