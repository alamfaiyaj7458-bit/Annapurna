# Annapurna Marbles & Sanitary — Web Application

A full-stack web application for Annapurna Marbles & Sanitary, Biratnagar. Lets the business showcase products online and lets customers get in touch directly via WhatsApp or phone.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT |
| Image Storage | Cloudinary |
| File Uploads | Multer |

---

## Project Structure

```
annapurnamarbles/
├── backend/
│   └── src/
│       ├── config/db.js
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── utils/cloudinary.js
│       └── server.js
└── frontend/
    └── src/
        ├── components/
        ├── pages/
        ├── services/api.js
        └── animations/
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database (MongoDB Atlas recommended)
- A Cloudinary account (free tier is fine)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values (see below)
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Set VITE_API_URL in .env
npm run dev
```

---

## Environment Variables

### Backend `.env`

```
PORT=5001
NODE_ENV=production
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/annapurna
JWT_SECRET=<a long random string>
JWT_EXPIRES_IN=7d
ADMIN_DEFAULT_PASSWORD=<your chosen password>
CLOUDINARY_CLOUD_NAME=<your cloud name>
CLOUDINARY_API_KEY=<your api key>
CLOUDINARY_API_SECRET=<your api secret>
ALLOWED_ORIGINS=https://yourdomain.com
```

All of these are **required**. The server will refuse to start if any are missing.

### Frontend `.env`

```
VITE_API_URL=https://your-backend-url.com/api
```

---

## Admin Panel

Visit `/admin` on the frontend to access the admin panel.

On first startup, the backend creates a default admin account:
- **Username:** `admin`
- **Password:** whatever you set in `ADMIN_DEFAULT_PASSWORD`

If `ADMIN_DEFAULT_PASSWORD` is not set in the environment, the fallback password `Annapurna@2024` is used and a warning is printed to the console. **Change it immediately after first login.**

### What the admin can do

- Add, edit, and delete products
- Upload multiple images per product
- Mark products as featured
- Filter products by category

---

## API Reference

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | — | Login |
| GET | `/api/auth/me` | ✓ | Get current admin |
| PUT | `/api/auth/change-password` | ✓ | Change password |

### Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | — | List products (filter by `?category=`) |
| GET | `/api/products/:id` | — | Get single product |
| POST | `/api/products` | ✓ | Create product |
| PUT | `/api/products/:id` | ✓ | Update product |
| DELETE | `/api/products/:id` | ✓ | Delete product |

---

## Deployment

Recommended services (all have free tiers):

| Component | Service |
|---|---|
| Frontend | Vercel |
| Backend | Render or Railway |
| Database | MongoDB Atlas |
| Images | Cloudinary |

---

## Security Notes

- Rate limiting is applied globally to all `/api` routes, and additionally on `/api/auth/login`
- Passwords are hashed with bcrypt (salt rounds: 12)
- JWT tokens expire after 7 days
- Only JPEG, PNG, and WebP images are accepted for upload (max 5MB per file)
- CORS is restricted to origins listed in `ALLOWED_ORIGINS`
- Helmet is used for HTTP security headers

---

## Known Limitations

- Single admin account only (no multi-user support)
- No product pricing field — the site is a showcase, not a shop. Customers contact via WhatsApp or phone to enquire.
- Phone and WhatsApp numbers in `FloatingActions.jsx`, `Hero.jsx`, `Contact.jsx`, and `Navbar.jsx` are placeholders (`XXXXXX`). Replace them with the real business number before deploying.
