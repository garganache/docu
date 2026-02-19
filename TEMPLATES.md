# Documentation Templates Guide

## Template Categories

We have **two main audiences**:

### 1. User-Facing Documentation
**Audience:** End users, customers, people USING your app

**Templates:**
- `getting-started.md` - First steps, quick start
- `user-guide.md` - How to use features
- `tutorials.md` - Step-by-step walkthroughs
- `faq.md` - Common questions
- `concepts.md` - Understanding key ideas
- `troubleshooting.md` - User-level problems

### 2. Technical/Developer Documentation
**Audience:** Developers, operators, people BUILDING/DEPLOYING your app

**Templates:**
- `configuration.md` - Settings, environment variables
- `deployment.md` - How to deploy to production
- `api-reference.md` - API endpoints, methods
- `debugging.md` - Developer troubleshooting, logs

## Deployment

### Deployment
**For:** DevOps, SREs, production operations  
**Goal:** Deploy to production/staging servers  
**Examples:**
- "Build Docker image"
- "Deploy to Kubernetes"
- "Configure load balancer"
- "Set up monitoring"
- "Configure auto-scaling"

**Use case:** "I need to put this in production for real users"

**Note:** There is no separate "installation" document - deployment covers getting the app running.

## Docusaurus Structure

Since you're using Docusaurus, the structure should be:

```
docs/
└── app-a/
    ├── v1.0/
    │   ├── docs/                    # Docusaurus docs folder
    │   │   │
    │   │   ├── intro.md             # Landing page
    │   │   │
    │   │   ├── user-guide/          # USER-FACING
    │   │   │   ├── getting-started.md
    │   │   │   ├── features.md
    │   │   │   ├── tutorials.md
    │   │   │   ├── faq.md
    │   │   │   └── troubleshooting.md
    │   │   │
    │   │   └── technical/           # TECHNICAL
    │   │       ├── configuration.md
    │   │       ├── deployment.md
    │   │       ├── api-reference.md
    │   │       └── debugging.md
    │   │
    │   ├── docusaurus.config.js     # Docusaurus config
    │   ├── sidebars.js              # Sidebar navigation
    │   └── package.json
    │
    ├── v2.0/
    │   └── (same structure)
    │
    └── latest -> v2.0
```

## Updated Repository Structure

```
docu/
│
├── templates/
│   │
│   ├── docusaurus/                  # Docusaurus scaffolding
│   │   ├── docusaurus.config.js.template
│   │   ├── sidebars.js.template
│   │   └── package.json.template
│   │
│   ├── user-facing/                 # User documentation
│   │   ├── getting-started.md
│   │   ├── user-guide.md
│   │   ├── features.md
│   │   ├── tutorials.md
│   │   ├── faq.md
│   │   ├── concepts.md
│   │   └── troubleshooting.md
│   │
│   └── technical/                   # Technical documentation
│       ├── configuration.md         # Settings, env vars
│       ├── deployment.md            # Production deployment
│       ├── api-reference.md         # API docs
│       └── debugging.md             # Dev troubleshooting
│
└── docs/
    └── app-a/
        ├── v1.0/
        │   ├── docs/
        │   │   ├── intro.md
        │   │   ├── user-guide/
        │   │   └── technical/
        │   ├── docusaurus.config.js
        │   └── sidebars.js
        └── latest -> v1.0
```

## Template Breakdown

### User-Facing Templates

#### getting-started.md
**Purpose:** First 5 minutes with the app  
**Content:**
- What is this?
- Quick start (3-5 steps)
- Your first action
- What's next?

#### user-guide.md
**Purpose:** How to use features  
**Content:**
- Feature walkthroughs
- Screenshots/videos
- Common workflows
- Tips & tricks

#### tutorials.md
**Purpose:** Step-by-step guides  
**Content:**
- Beginner tutorials
- Advanced guides
- Real-world examples
- Expected outcomes

#### faq.md
**Purpose:** Answer common questions  
**Content:**
- "How do I...?"
- "Can I...?"
- "Why does...?"
- Links to detailed docs

#### concepts.md
**Purpose:** Explain key ideas  
**Content:**
- Core concepts
- Architecture (user perspective)
- Terminology
- Mental models

#### troubleshooting.md (user)
**Purpose:** Help users fix problems  
**Content:**
- "It's not working..."
- Common issues
- Error messages (user-facing)
- When to contact support

### Technical Templates

#### deployment.md
**Purpose:** Deploy to production  
**Content:**
- Infrastructure requirements
- Build process
- Deployment methods (Docker, K8s, etc.)
- Configuration for prod
- Monitoring setup
- Scaling considerations

**Example:**
```markdown
# Deployment - App A v1.0

## Prerequisites
- Kubernetes cluster
- Docker registry access

## Build
\`\`\`bash
docker build -t app-a:v1.0 .
docker push registry.example.com/app-a:v1.0
\`\`\`

## Deploy
\`\`\`bash
kubectl apply -f k8s/
\`\`\`

## Post-Deployment
- Health check: `kubectl get pods`
- Logs: `kubectl logs -f app-a-xxx`
- Metrics: Grafana dashboard

## Scaling
\`\`\`bash
kubectl scale deployment app-a --replicas=3
\`\`\`
```

## Docusaurus Sidebar Example

```js
// sidebars.js
module.exports = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'User Guide',
      items: [
        'user-guide/getting-started',
        'user-guide/features',
        'user-guide/tutorials',
        'user-guide/faq',
        'user-guide/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Technical',
      items: [
        'technical/configuration',
        'technical/deployment',
        'technical/api-reference',
        'technical/debugging',
      ],
    },
  ],
};
```

## Summary

**User-Facing:**
- Getting Started
- User Guide
- Tutorials
- FAQ
- Concepts
- Troubleshooting

**Technical:**
- **Configuration** = Settings, env vars
- **Deployment** = Production deployment ("make it live")
- API Reference
- Debugging

Does this structure work for you?
