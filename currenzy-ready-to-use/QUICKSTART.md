# Quick Start Guide - Currenzy

Get your Currenzy app up and running in 5 minutes!

## ⚡ Fast Setup (5 minutes)

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/currenzy.git
cd currenzy
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

### 4. Deploy to GitHub Pages
```bash
npm run deploy
```

Live at: `https://YOUR_USERNAME.github.io/currenzy/`

---

## 📁 Project Structure

```
currenzy/
├── src/
│   ├── components/
│   │   ├── SplashScreen.jsx      ← Logo & animation (2.5s)
│   │   ├── HomeScreen.jsx        ← Main converter app
│   │   └── *.css                 ← Component styles
│   ├── App.jsx                   ← Screen switcher
│   ├── main.jsx                  ← React entry
│   └── index.css                 ← Global styles
├── index.html                    ← HTML template
├── vite.config.js               ← Build config
└── package.json                 ← Dependencies
```

---

## 🎨 Customization Quick Tips

### Change App Logo
Edit `SplashScreen.jsx` - SVG path starting with `<svg>`

### Change Colors
Edit `src/index.css` CSS variables:
```css
:root {
  --primary-blue: #0066ff;    ← Main blue color
  --text-dark: #1a1a1a;       ← Text color
  --input-bg: #f5f5f5;        ← Input background
}
```

### Add More Currencies
In `HomeScreen.jsx`:
1. Add to `CURRENCIES` object
2. Add to `EXCHANGE_RATES` object
3. Update `getCountryCode()` function

### Change Welcome Duration
In `SplashScreen.jsx`, line with `setTimeout`:
```javascript
const timer = setTimeout(onComplete, 2500)  // 2500ms = 2.5 seconds
```

---

## 🚀 Deployment Checklist

- [ ] Code committed to GitHub
- [ ] `package.json` has deploy script
- [ ] `vite.config.js` has correct base path
- [ ] Run `npm run build` successfully
- [ ] Run `npm run deploy` successfully
- [ ] GitHub Pages enabled in repository settings
- [ ] App accessible at GitHub Pages URL

---

## 💡 Common Tasks

### Update Splash Screen Animation
Edit `SplashScreen.css` - look for `@keyframes` sections

### Change Bottom Navigation Text
Edit `HomeScreen.jsx` - each nav button has a `<span>` with the label

### Modify Recent Conversions List
Edit `HomeScreen.jsx` - `recentConversions` state variable

### Add Real Exchange Rates API
Replace mock rates in `HomeScreen.jsx`:
```javascript
// Replace this:
const EXCHANGE_RATES = { ... }

// With API call:
useEffect(() => {
  fetchRates().then(setRates)
}, [fromCurrency])
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5173 already in use | `npm run dev -- --port 3000` |
| Blank page on GitHub | Check browser console, verify base path |
| Build fails | Delete `node_modules`, run `npm install` again |
| Changes not showing | Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R` |

---

## 📱 Testing on Mobile

### Local Device Testing
```bash
npm run dev
# Find your computer IP (ipconfig on Windows, ifconfig on Mac)
# Visit http://YOUR_IP:5173 on your phone
```

### Production Testing
Visit your GitHub Pages URL on your phone

### Browser DevTools Mobile View
Press `F12`, then `Ctrl+Shift+M` to toggle mobile view

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [GitHub Pages](https://pages.github.com)

---

## ✨ What's Included

✅ Beautiful animated splash screen  
✅ Currency conversion logic  
✅ 12 major world currencies  
✅ Recent conversions history  
✅ Mobile-optimized UI  
✅ Production-ready build  
✅ GitHub Pages ready  
✅ Dark/Light mode capable  

---

## 🔧 Next Steps

1. **Clone the repo** to your machine
2. **Run `npm install`** to get dependencies
3. **Run `npm run dev`** to see it live
4. **Customize** colors, currencies, rates
5. **Push to GitHub** when ready
6. **Deploy** with `npm run deploy`

---

## ❓ Need Help?

1. Check `README.md` for detailed docs
2. Read `DEPLOYMENT.md` for deployment help
3. Open an issue on GitHub
4. Check troubleshooting section above

---

Happy coding! 🎉
