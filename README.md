# CLO Marketplace 🛍️

**A modern peer-to-peer clothing rental marketplace for college students**

Built with React, Tailwind CSS, Supabase, and Stripe.

---

## ✨ Features

- 🔐 **Authentication** - Sign up/sign in with email
- 🏪 **Marketplace** - Browse and rent designer clothing
- ❤️ **Favourites** - Save items you love
- 💳 **Tag System** - Use tags to rent items (4 free on signup)
- 💰 **Stripe Payments** - Buy additional tags
- 📦 **List Items** - Share your wardrobe and earn on rentals
- 👤 **User Profiles** - Instagram integration, bio, and "as seen on" photos
- 📊 **Owner Dashboard** - Manage your listings

---

## 🚀 Quick Start

### Deploy to Vercel

**See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for full instructions**

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Deploy
# Go to vercel.com → Import GitHub repo → Deploy
```

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 🛠️ Tech Stack

**Frontend**
- React 18
- React Router 7
- Tailwind CSS 4
- Motion (Framer Motion)
- Lucide Icons

**Backend**
- Supabase (Auth, Database, Functions)
- Stripe (Payments)

**Deployment**
- Vercel (Frontend hosting)
- Supabase Edge Functions (Backend)

---

## 📦 Project Structure

```
/src
  /app
    /components       # Reusable UI components
    /pages           # Page components
    /context         # React context (Auth)
    routes.tsx       # React Router configuration
  /styles            # Global styles and fonts
  /imports           # Figma design assets
/supabase
  /functions
    /server          # Backend API
/utils               # Helper functions
```

---

## 🔑 Environment Setup

**No environment variables needed on frontend!**

Backend uses Supabase secrets (already configured):
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`

---

## 📖 Documentation

- **[Deployment Guide](./VERCEL_DEPLOYMENT.md)** - How to deploy to Vercel
- **[Full Documentation](./DEPLOYMENT.md)** - Complete setup guide

---

## 🎨 Design

Custom fonts from Google Fonts:
- Libre Caslon Display (headings)
- Meie Script (decorative)
- League Gothic (hero text)
- Inter (body text)
- Libre Bodoni (accents)

Color scheme: Elegant neutrals with warm accents

---

## 🧪 Testing

Visit `/test-backend` to verify backend connectivity

**Stripe Test Cards:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVV: Any 3 digits

---

## 📱 User Flow

1. **Sign Up** → Get 4 free tags
2. **Browse** marketplace
3. **Favourite** items
4. **Rent** items using tags
5. **List** your own items
6. **Buy** more tags when needed

---

## 🔒 Security

- HTTPS only
- Supabase Row Level Security
- XSS protection headers
- CSRF protection
- Secure payment handling (Stripe)

---

## 📈 Roadmap

- [ ] Image uploads (Supabase Storage)
- [ ] In-app messaging
- [ ] Review system
- [ ] Advanced search filters
- [ ] Monthly membership subscription
- [ ] Email notifications
- [ ] Admin panel

---

## 🤝 Contributing

This is a production app. For major changes, please open an issue first.

---

## 📄 License

© 2026 CLO Marketplace. All rights reserved.

---

## 🆘 Support

Check the documentation files:
- [Deployment Guide](./DEPLOYMENT.md)
- [Vercel Setup](./VERCEL_DEPLOYMENT.md)

---

**Built with ❤️ for the college fashion community**
