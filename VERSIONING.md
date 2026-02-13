# Versioning Strategy for Multi-Version Documentation

## The Problem

You need to document **multiple versions** of the same application:
- App A v1.0, v1.5, v2.0
- App B v3.0, v3.1
- App C v1.0, v2.0, v3.0

## Solution: Version-Based Directory Structure

### Recommended Structure

```
docs/
├── app-a/
│   ├── v1.0/                    # Version 1.0 docs
│   │   ├── installation.md
│   │   ├── configuration.md
│   │   ├── debugging.md
│   │   ├── api-reference.md
│   │   └── deployment.md
│   │
│   ├── v2.0/                    # Version 2.0 docs (latest)
│   │   └── (same structure)
│   │
│   ├── latest -> v2.0           # Symlink to latest version
│   ├── CHANGELOG.md             # Cross-version changelog
│   └── README.md                # Version index
│
├── app-b/
│   ├── v3.0/
│   ├── v3.1/
│   ├── latest -> v3.1
│   ├── CHANGELOG.md
│   └── README.md
│
└── app-c/
    ├── v1.0/
    ├── v2.0/
    ├── latest -> v2.0
    ├── CHANGELOG.md
    └── README.md
```

## How It Works

### 1. Each Version Gets Its Own Folder

```bash
docs/app-a/
  v1.0/    # Old version, for reference
  v2.0/    # Current version
```

### 2. Symlink Points to Latest

```bash
cd docs/app-a
ln -s v2.0 latest

# Users always know where to find current docs:
docs/app-a/latest/installation.md  # -> v2.0/installation.md
```

### 3. Version Index (README.md)

Each app has a README listing all versions:

```markdown
# App A Documentation

## Available Versions

- **[v2.0](v2.0/)** (latest, stable)
- **[v1.0](v1.0/)** (archived)

## Quick Links

- [Latest Installation](latest/installation.md)
- [Latest API Docs](latest/api-reference.md)
- [Changelog](CHANGELOG.md)
```

### 4. Cross-Version Changelog

`docs/app-a/CHANGELOG.md` tracks all versions:

```markdown
# App A - Full Changelog

## [2.0.0] - 2026-02-01
### Breaking Changes
- New authentication system

## [1.0.0] - 2025-01-01
- Initial release
```

## Workflow Examples

### Creating Documentation for New Version

```bash
# App A releases v3.0
./scripts/new-version.sh app-a v3.0

# Copy from previous version as starting point
cp -r docs/app-a/v2.0/* docs/app-a/v3.0/

# Update the docs for v3.0
vim docs/app-a/v3.0/installation.md

# Update symlink
cd docs/app-a
rm latest
ln -s v3.0 latest

# Update changelog
vim docs/app-a/CHANGELOG.md

# Commit
git add docs/app-a/v3.0 docs/app-a/latest docs/app-a/CHANGELOG.md
git commit -m "Add App A v3.0 documentation"
git tag docs-app-a-v3.0
git push --tags
```

### Finding Documentation

Users can:

**Get latest:**
```
docs/app-a/latest/installation.md
```

**Get specific version:**
```
docs/app-a/v1.0/installation.md
```

**See all versions:**
```
docs/app-a/README.md
```

## Git Tags for Documentation Releases

Tag each documentation release:

```bash
# Tag docs for App A v2.0
git tag -a docs-app-a-v2.0 -m "App A v2.0 documentation"

# Tag overall docs release
git tag -a v1.0.0 -m "Documentation repository v1.0.0"

git push --tags
```

## Benefits

✅ **Multiple versions** of same app documented  
✅ **Clear structure** - version folders  
✅ **Easy to find** - `latest/` symlink  
✅ **Version history** - CHANGELOG per app  
✅ **Same structure** across all apps  
✅ **Git versioned** - tags track releases
