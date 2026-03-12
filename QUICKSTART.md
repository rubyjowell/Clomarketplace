# 🚀 CLO Marketplace - Quick Start (5 Minutes)

## Deploy to Vercel in 3 Steps

### Step 1: Push to GitHub (2 min)

```bash
# If you haven't already
git init
git add .
git commit -m "CLO Marketplace ready for deployment"

# Create new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/clo-marketplace.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel (2 min)

1. Go to **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Select your **clo-marketplace** repo
4. Click **"Deploy"** (Vercel auto-detects Vite settings)
5. Wait 1-2 minutes ⏱️

### Step 3: Test It (1 min)

Visit your new URL: `https://clo-marketplace.vercel.app`

1. Click **"Sign Up"**
2. Create account → Get 4 free tags 🎉
3. Browse marketplace (empty at first)
4. Click **"List an Item"** to add first item

---

## ✅ Done!

Your marketplace is **LIVE** and ready for users!

---

## 🔥 Next Steps

### Make It Yours
1. **Custom Domain**: Vercel Settings → Domains
2. **Branding**: Update logo/colors in theme.css
3. **Content**: Add your own items

### Go Live
1. **Share** with your college community
2. **Get feedback** from first users
3. **Iterate** on features

### Optional
- Set up Stripe live mode (real payments)
- Add custom email domain (Supabase)
- Enable social login (Google, Instagram)

---

## 🆘 Problems?

### Build Failed?
- Check Vercel build logs
- Verify all files pushed to GitHub

### Can't Sign Up?
- Check Supabase is running
- Visit `/test-backend` to verify connection

### Fonts Not Loading?
- ✅ Already fixed! Using Google Fonts CDN
- Clear browser cache

---

## 📖 More Help

- **Full Guide**: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- **Features**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**That's it! You're live in 5 minutes!** 🎉
