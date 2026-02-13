# App A Documentation (v1.0)

Docusaurus site for App A version 1.0 documentation.

## Quick Start

### 1. Install Dependencies

```bash
cd docs/app-a/v1.0
npm install
```

### 2. Start Development Server

```bash
npm start
```

This will open http://localhost:3000 in your browser.

### 3. Build for Production

```bash
npm run build
```

Output will be in `build/` directory.

### 4. Serve Production Build

```bash
npm run serve
```

## Structure

```
v1.0/
├── docs/                  # Documentation markdown files
│   ├── intro.md          # Homepage
│   ├── user-guide/       # User-facing docs
│   │   ├── getting-started.md
│   │   ├── features.md
│   │   └── faq.md
│   └── technical/        # Technical docs
│       ├── configuration.md
│       ├── deployment.md
│       └── api-reference.md
│
├── src/                  # React components & CSS
│   └── css/
│       └── custom.css
│
├── static/               # Static files (images, etc.)
│   └── img/
│
├── docusaurus.config.js  # Docusaurus configuration
├── sidebars.js          # Sidebar navigation
└── package.json         # Dependencies
```

## Documentation

- **User Guide** - For end users
  - Getting Started
  - Features
  - FAQ

- **Technical** - For developers/DevOps
  - Configuration
  - Deployment
  - API Reference

## Customization

### Add a New Page

1. Create a markdown file in `docs/`
2. Add frontmatter:
   ```markdown
   ---
   sidebar_position: 1
   ---
   ```
3. Update `sidebars.js` if needed

### Change Theme

Edit `docusaurus.config.js`:

```js
themeConfig: {
  colorMode: {
    defaultMode: 'light',
    disableSwitch: false,
  },
}
```

### Add Custom CSS

Edit `src/css/custom.css` to customize colors, fonts, etc.

## Deployment

### GitHub Pages

```bash
npm run build
GIT_USER=<Your GitHub username> npm run deploy
```

### Netlify

Connect your repository and set:
- Build command: `npm run build`
- Publish directory: `build`

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
```

## Links

- [Docusaurus Documentation](https://docusaurus.io)
- [Markdown Features](https://docusaurus.io/docs/markdown-features)
- [Deployment Guide](https://docusaurus.io/docs/deployment)
