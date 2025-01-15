import rateLimit from 'express-rate-limit';

const isDev = process.env.NODE_ENV === "development";

export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: isDev ? Infinity : 100, // Disable rate limiting in development
});
