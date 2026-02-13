# Running the Documentation

## Quick Start - See It Working!

### Option 1: App A v1.0 (Ready to Run)

```bash
cd /home/ubuntu/.openclaw/workspace/docu/docs/app-a/v1.0

# Install dependencies
npm install

# Start the dev server
npm start
```

**Open:** http://localhost:3000

You'll see a working Docusaurus site with:
- 👥 User Guide (Getting Started, Features, FAQ)
- 🛠️ Technical Docs (Configuration, Deployment, API Reference)

### Option 2: Clone from GitHub

```bash
git clone https://github.com/garganache/docu.git
cd docu/docs/app-a/v1.0
npm install
npm start
```

## What's Included (Minimal Working Example)

```
docs/app-a/v1.0/
├── package.json             ✅ Docusaurus dependencies
├── docusaurus.config.js     ✅ Site configuration
├── sidebars.js             ✅ Navigation structure
│
├── docs/                    ✅ Documentation content
│   ├── intro.md            ✅ Homepage
│   │
│   ├── user-guide/         ✅ User-facing docs
│   │   ├── getting-started.md
│   │   ├── features.md
│   │   └── faq.md
│   │
│   └── technical/          ✅ Technical docs
│       ├── configuration.md
│       ├── deployment.md
│       └── api-reference.md
│
└── src/css/                ✅ Custom styling
    └── custom.css
```

## Build for Production

```bash
cd docs/app-a/v1.0

# Build static site
npm run build

# Serve production build
npm run serve
```

Output will be in `build/` directory - ready to deploy!

## Next Steps

### Add More Apps

Copy the structure:

```bash
cp -r docs/app-a/v1.0 docs/app-b/v1.0
cd docs/app-b/v1.0

# Update package.json name
# Update docusaurus.config.js title
# Update docs content

npm install
npm start
```

### Add More Versions

```bash
cp -r docs/app-a/v1.0 docs/app-a/v2.0
cd docs/app-a/v2.0

# Update version-specific content
npm install
npm start
```

### Create Symlink to Latest

```bash
cd docs/app-a
ln -s v1.0 latest
```

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
