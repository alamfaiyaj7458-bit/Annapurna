require('dotenv').config();

// Check required env variables
const REQUIRED_ENV = [
'MONGODB_URI',
'JWT_SECRET',
'CLOUDINARY_CLOUD_NAME',
'CLOUDINARY_API_KEY',
'CLOUDINARY_API_SECRET'
];

const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
if (missing.length) {
console.error(`Missing required environment variables: ${missing.join(', ')}`);
process.exit(1);
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const { seedAdmin } = require('./controllers/authController');
const { generalRateLimiter } = require('./middleware/rateLimiter');

const app = express();

// Connect DB
connectDB().then(() => seedAdmin());

// Security headers
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// ✅ FIXED CORS (ONLY ONCE, CORRECT)
app.use(
cors({
origin: ['https://annapurna-five.vercel.app'],
credentials: true,
})
);

// Body parsing
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Health check
app.get('/health', (req, res) =>
res.json({ status: 'OK', timestamp: new Date() })
);

// Rate limiting
app.use('/api', generalRateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
console.log(
`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
);
});
