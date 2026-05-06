# 🚀 GITHUB SETUP - STEP BY STEP

## ✅ What You'll Do:

1. Create a GitHub account (free)
2. I'll give you the code to push
3. You download it
4. Run it locally
5. It's live on the internet!

---

## STEP 1: Create GitHub Account (5 minutes)

### Go To:
https://github.com/signup

### Fill In:
1. **Username** - Something like: `johndoe` or `jane-smith` (you choose!)
2. **Email** - Use your real email
3. **Password** - Make it strong
4. Click **"Create account"**
5. Verify your email (check your email inbox)

✅ **Check**: Do you have a GitHub account now?

---

## STEP 2: Install Git (5 minutes)

### What's Git?
It's software to manage your code.

### Download From:
https://git-scm.com/download

### Choose Your OS:
- Windows → Download Windows version
- Mac → Download Mac version
- Linux → Follow Linux instructions

### Install:
1. Run the installer
2. Keep clicking "Next" (default settings are fine)
3. When done, **restart your computer**

✅ **Check**: Open Command Prompt/Terminal and type:
```
git --version
```
Do you see a version number?

---

## STEP 3: Set Up Git (2 minutes)

### Open Terminal/Command Prompt

### Type These Commands (one at a time):

```
git config --global user.name "Your Name"
```

Replace "Your Name" with your actual name!

Then:

```
git config --global user.email "your@email.com"
```

Replace with your real email!

✅ **Done!**

---

## STEP 4: Create Repository on GitHub (3 minutes)

### Go To:
https://github.com/new

### Or Click This Way:
1. Go to github.com
2. Click your profile picture (top right)
3. Click "Your repositories"
4. Click green "New" button

### Fill In:
- **Repository name**: `currenzy`
- **Description**: "Currency converter app"
- **Public** or **Private**: Choose "Public" (so others can see it)
- Click "Create repository"

✅ **Check**: You now have an empty repository!

---

## STEP 5: Download My Code (1 minute)

### In This Chat:

Look for the file named:
```
currenzy-ready-to-use.zip
```

Or I'll create it for you. Tell me and I will!

### Download it to your computer

---

## STEP 6: Extract the Folder (1 minute)

1. Find the downloaded file on your computer
2. Right-click it
3. Click "Extract All" (Windows) or double-click (Mac)
4. You now have a `currenzy-ready-to-use` folder

---

## STEP 7: Push to GitHub (5 minutes)

### Open Terminal/Command Prompt in the folder:

**Windows:**
1. Open the `currenzy-ready-to-use` folder
2. Right-click inside
3. Click "Open in Terminal"

**Mac:**
1. Right-click the folder
2. Hold Option key
3. Click "Open in Terminal"

### Run These Commands (copy-paste each one):

```
git init
```

```
git add .
```

```
git commit -m "Initial commit: Currenzy app"
```

```
git remote add origin https://github.com/YOUR_USERNAME/currenzy.git
```
⚠️ Replace `YOUR_USERNAME` with your actual GitHub username!

```
git branch -M main
```

```
git push -u origin main
```

⚠️ You'll be asked for your GitHub username and password/token. This is normal!

---

## STEP 8: Verify on GitHub (1 minute)

1. Go to: https://github.com/YOUR_USERNAME/currenzy
2. Refresh the page
3. You should see all your files!

✅ **SUCCESS!** Your code is on GitHub!

---

## STEP 9: Run Locally (5 minutes)

Now you can use it:

```
npm install
npm run dev
```

Open: `http://localhost:5173/`

---

## STEP 10: Deploy to GitHub Pages (3 minutes)

When ready to make it live:

```
npm run deploy
```

Your app will be live at:
```
https://YOUR_USERNAME.github.io/currenzy/
```

✅ **DONE!** Your app is on the internet!

---

## 📋 COMPLETE CHECKLIST

- [ ] Created GitHub account
- [ ] Installed Git
- [ ] Configured Git (name + email)
- [ ] Created repository named "currenzy"
- [ ] Downloaded code
- [ ] Extracted the folder
- [ ] Opened terminal in folder
- [ ] Ran: git init
- [ ] Ran: git add .
- [ ] Ran: git commit
- [ ] Ran: git remote add origin...
- [ ] Ran: git branch -M main
- [ ] Ran: git push -u origin main
- [ ] Verified files on GitHub
- [ ] Code is now on GitHub! ✅

---

## ✅ NEXT STEPS

1. Verify your code is on GitHub
2. Run locally: `npm install && npm run dev`
3. Customize it
4. Deploy: `npm run deploy`
5. Share your app!

---

## ❌ HAVING TROUBLE?

### "git: command not found"
→ Git not installed. Download from git-scm.com

### "fatal: not a git repository"
→ Make sure you're in the right folder

### "Permission denied"
→ GitHub password issue. Use Personal Access Token instead

### "fatal: 'origin' does not appear to be a 'git' repository"
→ Run: `git remote add origin https://github.com/YOUR_USERNAME/currenzy.git`

---

## 🎊 YOU DID IT!

Your code is now:
✅ On GitHub
✅ Safe and backed up
✅ Easy to deploy
✅ Can be shared with others

**Congratulations! 🎉**

---

Tell me when you're ready and I'll help you with the next step!
