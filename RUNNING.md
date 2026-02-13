# Running the Documentation

## Quick Start - See It Working!

**ONE Docusaurus site showing ALL apps and ALL versions!**

```bash
cd /home/ubuntu/.openclaw/workspace/docu

# Install dependencies
npm install

# Start the dev server
npm start
```

**Open:** http://localhost:3000

You'll see:
- 📚 Main landing page
- 📱 All apps (App A, App B, App C)
- 🏷️ All versions (v1.0, v2.0, etc.)
- 👥 User Guide sections
- 🛠️ Technical sections

### Clone from GitHub

```bash
git clone https://github.com/garganache/docu.git
cd docu
npm install
npm start
```

## What's Included (Minimal Working Example)

```
docu/                        # ROOT - One Docusaurus site
├── package.json             ✅ Dependencies
├── docusaurus.config.js     ✅ Site config
├── sidebars.js             ✅ Navigation (all apps)
│
├── docs/                    ✅ All documentation
│   ├── intro.md            ✅ Main homepage
│   ├── versions.md         ✅ Version index
│   │
│   ├── app-a/              # App A
│   │   ├── intro.md        #   App A overview
│   │   └── v1.0/           #   Version 1.0
│   │       ├── intro.md
│   │       ├── user-guide/
│   │       └── technical/
│   │
│   ├── app-b/              # App B
│   │   ├── intro.md
│   │   └── v1.0/
│   │
│   └── app-c/              # App C
│       ├── intro.md
│       └── v1.0/
│
└── src/css/                ✅ Custom styling
    └── custom.css
```

## Build for Production

```bash
cd docu

# Build static site
npm run build

# Serve production build
npm run serve
```

Output will be in `build/` directory - ready to deploy to any static host!

## Next Steps

### Add More Versions

```bash
# Create v2.0 for App A
cp -r docs/app-a/v1.0 docs/app-a/v2.0

# Update content in docs/app-a/v2.0/

# Update sidebars.js to include v2.0
```

### Add New Apps

```bash
# Create App D
mkdir -p docs/app-d/v1.0/{user-guide,technical}

# Add pages
# Update sidebars.js to include app-d
```

### Customize

All changes happen in **one place** - the root `docu/` directory!

## Troubleshooting

### Port Already in Use

```bash
# Use different port
npm start -- --port 3001
```

### Clear Cache

```bash
npm run clear
npm start
```

### Node Version

Requires Node 18+:

```bash
node --version  # Should be >= 18.0
```

## Customization

### Change Theme Colors

Edit `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #yourcolor;
}
```

### Update Navigation

Edit `sidebars.js` to add/remove pages.

### Change Site Title

Edit `docusaurus.config.js`:

```js
title: 'Your App Name',
tagline: 'Your tagline',
```

---

**Ready to run!** Just `cd docs/app-a/v1.0 && npm install && npm start` 🚀
