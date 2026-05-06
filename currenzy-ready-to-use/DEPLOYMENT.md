# Currenzy Deployment Guide

Step-by-step instructions to deploy your Currenzy app to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your computer
- Node.js and npm installed

## Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon in the top-right corner
3. Select **New repository**
4. Repository name: `currenzy`
5. Click **Create repository**

## Step 2: Initialize and Push Code

```bash
cd currenzy-app

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Currenzy app"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/currenzy.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Build and Deploy

### Option A: Using npm script (Recommended)

```bash
npm run deploy
```

This will:
1. Build the production version
2. Push to `gh-pages` branch
3. Enable GitHub Pages automatically

### Option B: Manual Deployment

```bash
# Build the app
npm run build

# Install gh-pages if not installed
npm install gh-pages --save-dev

# Deploy
npx gh-pages -d dist
```

## Step 5: Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Click **Settings** (top-right area)
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - Source: Select **Deploy from a branch**
   - Branch: Select **gh-pages** and **/(root)**
5. Click **Save**

## Step 6: Access Your App

Your app will be live at:
```
https://YOUR_USERNAME.github.io/currenzy/
```

Example: `https://john-doe.github.io/currenzy/`

## Troubleshooting

### App loads but shows blank page
- Check browser console for errors (F12)
- Verify base path in `vite.config.js` is `/currenzy/`
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Changes not reflecting
```bash
# Clear dist folder and rebuild
rm -rf dist
npm run build
npm run deploy
```

### gh-pages branch not created
```bash
# Manually create and push
npm run build
npx gh-pages -d dist -m "Deploy"
```

### Permission denied
Make sure you have push access to the repository and authentication is set up.

## Continuous Deployment (Optional)

Create `.github/workflows/deploy.yml` for automatic deployment:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Updating Your App

After making changes:

```bash
# Commit changes
git add .
git commit -m "Update: description of changes"

# Push to main branch
git push

# Deploy (if not using auto-deploy)
npm run deploy
```

## Custom Domain (Optional)

To use a custom domain:

1. Go to Settings > Pages
2. Under "Custom domain", enter your domain
3. Add DNS records to your domain provider:
   - Type: CNAME
   - Name: www
   - Value: `YOUR_USERNAME.github.io`

## Security

- Never commit secrets or API keys
- Use environment variables for sensitive data
- Keep dependencies updated: `npm update`

## Performance Tips

- Minified build is automatic with Vite
- Check size: `npm run build` shows file sizes
- Use lighthouse DevTools for performance audit

## Support

For GitHub Pages issues:
- [GitHub Pages Help](https://docs.github.com/en/pages)
- [GitHub Community Discussions](https://github.com/orgs/community/discussions)

---

Happy deploying! 🚀
