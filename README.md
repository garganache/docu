# Multi-Application Documentation Repository

**A unified documentation repository for multiple applications with standardized structure and versioning.**

## Vision

- **Single source of truth** for documentation across multiple applications
- **Standardized structure** - all apps follow the same documentation format
- **Version controlled** - track documentation changes alongside code
- **Easy to maintain** - update once, applies to all apps

## Project Scope

### Applications to Document

1. **App A** - (description)
2. **App B** - (description)  
3. **App C** - (description)

### Documentation Types (Standard Structure)

For each application, we maintain **two types of documentation**:

#### User-Facing Documentation
**For end users, customers**
- **Getting Started** - First steps, quick start
- **User Guide** - How to use features
- **Tutorials** - Step-by-step walkthroughs
- **FAQ** - Common questions
- **Concepts** - Understanding key ideas
- **Troubleshooting** - User-level problems

#### Technical/Developer Documentation
**For developers, operators, DevOps**
- **Configuration** - Settings, environment variables
- **Deployment** - Production deployment
- **API Reference** - Endpoints, methods, examples
- **Debugging** - Developer troubleshooting, logs
- **Changelog** - Version history, breaking changes

## Repository Structure

```
docu/
├── README.md                    # This file
├── GENERAL.md                   # Main agent instructions
├── SKILL.md                     # Tracker workflow
├── WORKFLOW.md                  # Agent workflow
├── CONTRIBUTING.md              # Contribution rules
│
├── .tracker/                    # Project management
│   ├── prd.json                 # Project definition
│   ├── stories/                 # User stories
│   ├── tasks/                   # Tasks
│   └── progress.md              # Work log
│
├── templates/                   # Reusable doc templates
│   ├── docusaurus/              # Docusaurus scaffolding
│   │   ├── docusaurus.config.js.template
│   │   ├── sidebars.js.template
│   │   └── package.json.template
│   │
│   ├── user-facing/             # User documentation
│   │   ├── getting-started.md
│   │   ├── user-guide.md
│   │   ├── features.md
│   │   ├── tutorials.md
│   │   ├── faq.md
│   │   ├── concepts.md
│   │   └── troubleshooting.md
│   │
│   └── technical/               # Technical docs
│       ├── configuration.md     # Settings
│       ├── deployment.md        # Production deployment
│       ├── api-reference.md     # API docs
│       └── debugging.md         # Dev troubleshooting
│
├── docs/                        # Documentation root (Docusaurus)
│   ├── app-a/                   # App A documentation
│   │   ├── README.md            # Version index
│   │   ├── CHANGELOG.md         # Cross-version changelog
│   │   ├── v1.0/                # Version 1.0 docs
│   │   │   ├── docs/            # Docusaurus docs folder
│   │   │   │   ├── intro.md
│   │   │   │   ├── user-guide/       # User docs
│   │   │   │   │   ├── getting-started.md
│   │   │   │   │   ├── features.md
│   │   │   │   │   └── ...
│   │   │   │   └── technical/        # Technical docs
│   │   │   │       ├── configuration.md
│   │   │   │       ├── deployment.md
│   │   │   │       └── ...
│   │   │   ├── docusaurus.config.js
│   │   │   ├── sidebars.js
│   │   │   └── package.json
│   │   ├── v2.0/                # Version 2.0 docs
│   │   │   └── (same structure)
│   │   └── latest -> v2.0       # Symlink to latest
│   │
│   ├── app-b/                   # App B documentation
│   │   ├── README.md
│   │   ├── CHANGELOG.md
│   │   ├── v3.0/
│   │   ├── v3.1/
│   │   └── latest -> v3.1
│   │
│   └── app-c/                   # App C documentation
│       ├── README.md
│       ├── CHANGELOG.md
│       ├── v1.0/
│       ├── v2.0/
│       └── latest -> v2.0
│
└── scripts/                     # Automation
    ├── new-app.sh               # Scaffold new app docs
    ├── new-version.sh           # Scaffold new version for existing app
    ├── validate-structure.sh    # Check all apps follow structure
    └── generate-index.sh        # Auto-generate main index

**See [VERSIONING.md](VERSIONING.md) for detailed versioning strategy**
```

## Versioning Strategy

### Git Tags for Releases

```bash
# Tag documentation versions
git tag -a v1.0.0 -m "Initial documentation release"
git push --tags
```

### Per-App Versioning

Each app's `CHANGELOG.md` tracks its own version:

```markdown
# Changelog - App A

## [1.2.0] - 2026-02-13
### Added
- New authentication flow
### Changed
- Updated API endpoints
```

### Documentation Version Badge

Add to each app's main README:
```markdown
![Docs Version](https://img.shields.io/badge/docs-v1.2.0-blue)
```

## Current Status

**Status:** Planning  
**Next Step:** Create stories and tasks in `.tracker/`

See `.tracker/prd.json` for full project plan.

## Technology Stack

- **Docusaurus** - Documentation site generator
- **Markdown** - Documentation format
- **Git** - Version control
- **GitHub** - Repository hosting

## Quick Links

- **[TEMPLATES.md](TEMPLATES.md)** - Template guide (user-facing vs technical)
- **[STRUCTURE.md](STRUCTURE.md)** - Detailed structure explanation
- **[VERSIONING.md](VERSIONING.md)** - How to handle multiple versions
- **[QUICKSTART.md](QUICKSTART.md)** - Getting started guide
- **[.tracker/prd.json](.tracker/prd.json)** - Project plan
