const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    message: 'Too many login attempts from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  message: {
    message: 'Too many requests from this IP, please try again after a minute.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { loginRateLimiter, generalRateLimiter };
