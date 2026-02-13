---
sidebar_position: 1
---

# Configuration

Configure **App A** for your environment.

## Environment Variables

Set these environment variables before deployment:

### Required

```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/app_a
REDIS_URL=redis://localhost:6379

# Application
APP_ENV=production
SECRET_KEY=your-secret-key-here
API_BASE_URL=https://api.app-a.example.com

# Authentication
JWT_SECRET=your-jwt-secret
JWT_EXPIRY=86400  # 24 hours in seconds
```

### Optional

```bash
# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@example.com
SMTP_PASSWORD=your-smtp-password
EMAIL_FROM=App A <noreply@example.com>

# Storage
S3_BUCKET=app-a-uploads
S3_REGION=us-east-1
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/123
LOG_LEVEL=info  # debug, info, warn, error
```

## Configuration File

Create `config/production.yml`:

```yaml
app:
  name: App A
  version: 1.0.0
  debug: false
  
server:
  host: 0.0.0.0
  port: 8000
  workers: 4
  
database:
  pool_size: 20
  max_overflow: 10
  echo: false
  
cache:
  type: redis
  ttl: 3600  # 1 hour
  
security:
  allowed_origins:
    - https://app-a.example.com
    - https://www.app-a.example.com
  cors_enabled: true
  rate_limit: 100  # requests per minute
  
features:
  signup_enabled: true
  oauth_enabled: true
  api_enabled: true
```

## Feature Flags

Enable/disable features without redeployment:

```bash
# Enable/disable features
FEATURE_NEW_DASHBOARD=true
FEATURE_BETA_API=false
FEATURE_ADVANCED_ANALYTICS=true
```

## Scaling Configuration

### Database Connection Pool

```yaml
database:
  pool_size: 20          # Connections per worker
  max_overflow: 10       # Extra connections when needed
  pool_timeout: 30       # Seconds to wait for connection
  pool_recycle: 3600     # Recycle connections after 1 hour
```

### Cache Settings

```yaml
cache:
  type: redis
  ttl: 3600              # Default TTL in seconds
  max_memory: 256mb      # Redis max memory
  eviction_policy: allkeys-lru
```

### Worker Configuration

```yaml
workers:
  web: 4                 # Gunicorn workers
  celery: 2              # Background workers
  celery_max_tasks: 100  # Tasks per worker before restart
```

## Security Settings

### SSL/TLS

```yaml
security:
  ssl_enabled: true
  hsts_enabled: true
  hsts_max_age: 31536000  # 1 year
  ssl_redirect: true
```

### Authentication

```yaml
auth:
  session_timeout: 86400     # 24 hours
  password_min_length: 12
  require_2fa: false         # Set true for enterprise
  allow_social_login: true
  
  oauth_providers:
    - google
    - github
    - microsoft
```

### Rate Limiting

```yaml
rate_limit:
  enabled: true
  window: 60              # 1 minute
  max_requests: 100       # Per IP
  
  endpoints:
    /api/auth/login:
      max_requests: 5     # Stricter for login
      window: 300         # 5 minutes
```

## Logging

```yaml
logging:
  level: info             # debug, info, warn, error
  format: json
  
  outputs:
    - type: file
      path: /var/log/app-a/app.log
      max_size: 100mb
      max_age: 30         # days
      
    - type: sentry
      dsn: ${SENTRY_DSN}
      level: error
```

## Monitoring

```yaml
monitoring:
  metrics_enabled: true
  metrics_port: 9090
  
  health_check:
    enabled: true
    path: /health
    interval: 30          # seconds
  
  profiling:
    enabled: false        # Enable for debugging
```

---

**Next:** [Deployment](deployment.md) →
