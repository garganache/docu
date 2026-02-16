# Documentation Structure Guide

## Overview

This repository manages documentation for **3 applications** using a **standardized structure**.

## The Problem You're Solving

❌ **Before:**
- Each app has different documentation structure
- Hard to find information
- Inconsistent formatting
- No version control
- Documentation scattered everywhere

✅ **After:**
- **One repository** for all app docs
- **Same structure** for every app
- **Version controlled** with git
- **Easy to maintain** - update templates, all apps benefit
- **Consistent** - users know exactly where to look

## Repository Structure

```
docu/
│
├── README.md                    # Project overview
├── STRUCTURE.md                 # This file
├── VERSIONING.md                # Versioning strategy
├── QUICKSTART.md                # Getting started
├── GENERAL.md                   # Agent instructions
│
├── templates/                   # 📄 Reusable documentation templates
│   ├── installation.md          #    Template for installation guide
│   ├── configuration.md         #    Template for configuration
│   ├── debugging.md             #    Template for debugging
│   ├── api-reference.md         #    Template for API docs
│   └── deployment.md            #    Template for deployment
│
├── docs/                        # 📚 Actual documentation
│   │
│   ├── app-a/                   # App A documentation
│   │   ├── README.md            # Version index
│   │   ├── CHANGELOG.md         # Cross-version changelog
│   │   ├── v1.0/                # Version 1.0 docs
│   │   │   ├── installation.md
│   │   │   ├── configuration.md
│   │   │   ├── debugging.md
│   │   │   ├── api-reference.md
│   │   │   └── deployment.md
│   │   ├── v2.0/                # Version 2.0 docs
│   │   │   └── (same structure)
│   │   └── latest -> v2.0       # Symlink to latest version
│   
│
├── scripts/                     # 🤖 Automation
│   ├── new-app.sh               #    Create docs for new app
│   ├── new-version.sh           #    Add new version for existing app
│   ├── validate-structure.sh    #    Check all apps match structure
│   └── generate-index.sh        #    Auto-generate index page
│
└── .tracker/                    # 📋 Project management
    ├── prd.json                 #    Project definition
    ├── stories/                 #    User stories
    ├── tasks/                   #    Individual tasks
    └── progress.md              #    Work log
```

## How It Works

### 1. **Templates Define Structure**

Each template (`templates/*.md`) defines the structure for one documentation type:

- Installation
- Configuration  
- Debugging
- API Reference
- Deployment

### 2. **Each App Gets Same Structure**

When you create docs for a new app, you copy all templates:

```bash
# Example: creating App A docs
cp templates/installation.md docs/app-a/v1.0/installation.md
cp templates/configuration.md docs/app-a/v1.0/configuration.md
# ... etc
```

Then fill in the app-specific details.

### 3. **Version Control Tracks Everything**

```bash
git add docs/app-a/v1.0/installation.md
git commit -m "Update App A v1.0 installation"
git tag v1.0.0
git push --tags
```

### 4. **All Apps Stay Consistent**

Because all apps use the same templates, users always know where to find information:

- Need installation? → `docs/{app-name}/latest/installation.md`
- Need debugging? → `docs/{app-name}/latest/debugging.md`
- Need API docs? → `docs/{app-name}/latest/api-reference.md`

## Versioning

Each app can have multiple versions:

```
docs/app-a/
  v1.0/    # Old version, for reference
  v2.0/    # Current stable
  v3.0/    # Next version (in development)
  latest -> v2.0    # Symlink to current
```

See [VERSIONING.md](VERSIONING.md) for complete details.

## Benefits

✅ **Consistency** - Same structure everywhere  
✅ **Maintainability** - Update template, all apps benefit  
✅ **Discoverability** - Users know where to look  
✅ **Version Control** - Full history, tags, branches  
✅ **Collaboration** - PRs, reviews, CI checks  
✅ **Automation** - Scripts validate, scaffold, generate  

## Next Steps

1. ✅ Review this structure
2. 📝 Create stories/tasks in `.tracker/`
3. 🔨 Build templates
4. 📚 Scaffold first app (App A)
5. 🚀 Roll out to Apps B & C

See `.tracker/prd.json` for the full project plan!
