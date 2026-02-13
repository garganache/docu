---
sidebar_position: 2
---

# Deployment

Deploy **App A** to production.

## Prerequisites

Before deploying, ensure you have:

- ✅ Kubernetes cluster (v1.24+)
- ✅ PostgreSQL database (v14+)
- ✅ Redis cache (v6+)
- ✅ S3-compatible storage
- ✅ Domain name and SSL certificate

## Quick Deploy (Docker)

### 1. Build the Image

```bash
docker build -t app-a:1.0.0 .
docker tag app-a:1.0.0 registry.example.com/app-a:1.0.0
docker push registry.example.com/app-a:1.0.0
```

### 2. Run the Container

```bash
docker run -d \
  --name app-a \
  -p 8000:8000 \
  -e DATABASE_URL=postgresql://... \
  -e REDIS_URL=redis://... \
  -e SECRET_KEY=your-secret \
  registry.example.com/app-a:1.0.0
```

### 3. Verify

```bash
curl http://localhost:8000/health
# Expected: {"status": "ok"}
```

## Kubernetes Deployment

### 1. Create Namespace

```bash
kubectl create namespace app-a-prod
```

### 2. Apply Configurations

```bash
# Secrets
kubectl apply -f k8s/secrets.yaml

# ConfigMap
kubectl apply -f k8s/configmap.yaml

# Deployment
kubectl apply -f k8s/deployment.yaml

# Service
kubectl apply -f k8s/service.yaml

# Ingress
kubectl apply -f k8s/ingress.yaml
```

### Example Deployment Manifest

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-a
  namespace: app-a-prod
spec:
  replicas: 3
  selector:
    matchLabels:
      app: app-a
  template:
    metadata:
      labels:
        app: app-a
    spec:
      containers:
      - name: app-a
        image: registry.example.com/app-a:1.0.0
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-a-secrets
              key: database-url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: app-a-secrets
              key: redis-url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### 3. Verify Deployment

```bash
# Check pods
kubectl get pods -n app-a-prod

# Check logs
kubectl logs -f deployment/app-a -n app-a-prod

# Check service
kubectl get svc -n app-a-prod
```

## Database Migration

Run migrations before deploying:

```bash
# Using kubectl
kubectl run app-a-migrate \
  --image=registry.example.com/app-a:1.0.0 \
  --restart=Never \
  --namespace=app-a-prod \
  --env="DATABASE_URL=..." \
  -- python manage.py migrate

# Or using a Job
kubectl apply -f k8s/migration-job.yaml
```

## SSL/TLS Configuration

### Using Cert-Manager

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: app-a-tls
  namespace: app-a-prod
spec:
  secretName: app-a-tls-secret
  issuer Ref:
    name: letsencrypt-prod
    kind: ClusterIssuer
  dnsNames:
  - app-a.example.com
  - www.app-a.example.com
```

### Ingress with TLS

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-a-ingress
  namespace: app-a-prod
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - app-a.example.com
    secretName: app-a-tls-secret
  rules:
  - host: app-a.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: app-a
            port:
              number: 80
```

## Scaling

### Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: app-a-hpa
  namespace: app-a-prod
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: app-a
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### Manual Scaling

```bash
kubectl scale deployment app-a --replicas=5 -n app-a-prod
```

## Monitoring

### Prometheus Metrics

App A exposes metrics at `/metrics`:

```bash
curl http://app-a.example.com/metrics
```

### Grafana Dashboard

Import dashboard ID: `12345` (example)

Key metrics to monitor:
- Request rate
- Error rate
- Response time (p50, p95, p99)
- Database connection pool usage
- Cache hit rate

## Backup & Disaster Recovery

### Database Backups

```bash
# Daily backup script
pg_dump $DATABASE_URL | gzip > backup-$(date +%Y%m%d).sql.gz
aws s3 cp backup-$(date +%Y%m%d).sql.gz s3://backups/app-a/
```

### Restore

```bash
# Download backup
aws s3 cp s3://backups/app-a/backup-20260213.sql.gz .

# Restore
gunzip backup-20260213.sql.gz
psql $DATABASE_URL < backup-20260213.sql
```

## Rollback

If deployment fails:

```bash
# Rollback to previous version
kubectl rollout undo deployment/app-a -n app-a-prod

# Check rollout status
kubectl rollout status deployment/app-a -n app-a-prod
```

## Health Checks

App A provides health endpoints:

- `/health` - Overall health
- `/ready` - Readiness (database, redis connected)
- `/metrics` - Prometheus metrics

---

**Next:** [API Reference](api-reference.md) →
