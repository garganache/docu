# Quick Start Guide

## What This Is

A documentation repository for **3+ applications** with:
- **Same structure** for all apps
- **Multiple versions** per app (v1.0, v2.0, etc.)
- **Templates** for consistency
- **Version control** with git

## The Structure

```
docs/
├── app-a/
│   ├── v1.0/  # Old version
│   ├── v2.0/  # Current
│   └── latest -> v2.0
├── app-b/
│   ├── v3.0/
│   ├── v3.1/
│   └── latest -> v3.1
└── app-c/
    └── ...
```

## Quick Actions

### Clone the Repository

```bash
git clone https://github.com/garganache/docu.git
cd docu
```

### Review the Plan

```bash
# Overview
cat README.md

# Detailed structure
cat STRUCTURE.md

# Versioning strategy
cat VERSIONING.md

# Project plan
cat .tracker/prd.json
```

### Build the Structure

Option A: **Let the agent build it**
> Tell the agent: "Build the documentation structure"

Option B: **Do it yourself**
```bash
# Execute stories in order
# See .tracker/stories/ for details
```

## Files to Read

1. **README.md** - Project overview
2. **STRUCTURE.md** - How it all works
3. **VERSIONING.md** - Multiple version handling
4. **.tracker/prd.json** - Full project plan

## What You Get

After building:

```
docu/
├── templates/         ✅ Reusable doc templates
├── docs/             ✅ Versioned app docs
│   ├── app-a/
│   ├── app-b/
│   └── app-c/
└── scripts/          ✅ Automation tools
```

## Next Steps

1. Review the structure
2. Customize for your apps
3. Build templates
4. Create first app docs
5. Roll out to all apps

**Ready to build?** Tell the agent what you need!
