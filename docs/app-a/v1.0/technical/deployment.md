# Deployment Guide

This document provides step-by-step guides for installing and upgrading Yields for Performance (YfP) on a Kubernetes cluster.

## Prerequisites

- **Kubernetes** 1.20–1.30 (preferably >= 1.29)
- **Helm** 3.6.0+
- **PV provisioner** support in the underlying infrastructure (StorageClass supporting `ReadWriteMany`, e.g. NFS)

Cluster and disk sizing will vary depending on the data processing requirements.

In Kubernetes deployments, JupyterHub uses the [KubeSpawner](https://jupyterhub-kubespawner.readthedocs.io/en/latest/) to create new JupyterLab pods for users, which requires sufficient privileges to create the required RBAC objects.

### OpenShift

YfP is provided with custom security context constraints for running on OpenShift, available in `chiron/hack/openshift-scc.yaml`.

1. Fetch and untar the Helm charts:

   ```shell
   helm fetch --untar yields/chiron
   ```

2. Apply the security context constraints:

   ```shell
   kubectl apply -f chiron/hack/openshift-scc.yaml
   ```

---

## Image Registry Configuration

The cluster must be configured with a `docker-registry` secret to pull images from the private repository.

**Using literal credentials:**

```shell
kubectl create secret docker-registry yields-docker-cfg \
  --docker-username=tiger \
  --docker-password=pass113 \
  --docker-email=tiger@acme.com
```

**Using an existing config.json:**

```shell
kubectl create secret generic yields-docker-cfg \
  --from-file=.dockerconfigjson=/path/to/.docker/config.json \
  --type=kubernetes.io/dockerconfigjson
```

---

## Fresh Install

### 1. Create Kubernetes Secrets

Create all required secrets before installation:

```shell
# PostgreSQL for Registry
PGPASSWORD=$(openssl rand -base64 32)
kubectl create secret generic k8s-registry-postgresql \
  --from-literal=password=${PGPASSWORD} \
  --from-literal=postgres-password=${PGPASSWORD} \
  --from-literal=postgresql-password=${PGPASSWORD} \
  --from-literal=postgresql-postgres-password=${PGPASSWORD} \
  --from-literal=postgresql-replication-password=$(openssl rand -base64 32)

# Registry Service
kubectl create secret generic k8s-registry \
  --from-literal=registry-secret=$(uuidgen)

# PostgreSQL for Registry-Auth
PGPASSWORD=$(openssl rand -base64 32)
kubectl create secret generic k8s-registry-auth-postgresql \
  --from-literal=password=${PGPASSWORD} \
  --from-literal=postgres-password=${PGPASSWORD} \
  --from-literal=postgresql-password=${PGPASSWORD} \
  --from-literal=postgresql-postgres-password=${PGPASSWORD} \
  --from-literal=postgresql-replication-password=$(openssl rand -base64 32)

# Registry-Auth Service
kubectl create secret generic k8s-registry-auth \
  --from-literal=registry-auth-secret=$(uuidgen)

# PostgreSQL for Keycloak
PGPASSWORD=$(openssl rand -base64 32)
kubectl create secret generic k8s-keycloak-postgresql \
  --from-literal=password=${PGPASSWORD} \
  --from-literal=postgres-password=${PGPASSWORD} \
  --from-literal=postgresql-password=${PGPASSWORD} \
  --from-literal=postgresql-postgres-password=${PGPASSWORD} \
  --from-literal=postgresql-replication-password=$(openssl rand -base64 32)

# Keycloak Admin
kubectl create secret generic k8s-keycloak \
  --from-literal=keycloak-password=$(openssl rand -base64 32)

# Kernel Client (Registry-Kernel communication)
kubectl create secret generic k8s-registry-kernel \
  --from-literal=kernel-client-secret=$(uuidgen)

# JupyterHub
JUPYTERHUB_CRYPT_KEY=$(openssl rand -base64 32)
kubectl create secret generic k8s-jupyterhub \
  --from-literal=JUPYTERHUB_CRYPT_KEY=${JUPYTERHUB_CRYPT_KEY}
```

### 2. Add the Helm Repository

```shell
helm repo add yields https://chartmuseum-jx.k8s.yields.io
helm repo update
```

### 3. Review the Charts

Fetch a copy of the charts to review installation specs:

```shell
helm fetch --untar yields/chiron
```

### 4. Configure Values

The deployment requires two configuration files:

- **`values.yaml`** — Main configuration (services, resources, ingress, secrets)
- **`values-versions.yaml`** — Image tags for each service

A storage class supporting `ReadWriteMany` mounts (e.g. NFS) must be configured in the target cluster.

<details>
<summary>Example values.yaml</summary>

```yaml
auth:
  database: registry
global:
  image:
    pullSecrets:
      - yields-docker-cfg
    pullPolicy: Always
  storageClass: nfs-client
keycloak:
  frontendURL: "https://your-domain.example.com/y-keycloak/"
  resources:
    requests:
      cpu: 2
      memory: 1Gi
    limits:
      cpu: 4
      memory: 2Gi
  existingSecret: true
  existingSecretName: k8s-keycloak
  existingRegistrySecretName: k8s-registry
  existingRegistryAuthSecretName: k8s-registry-auth
  existingKernelClientSecretName: k8s-registry-kernel
  keycloak-postgresql:
    auth:
      existingSecret: k8s-keycloak-postgresql
      database: keycloak
      username: yields
y-portal:
  persistence:
    enabled: true
    results:
      existingClaim: results-chiron-registry-0
  ingress:
    enabled: true
    hosts:
      - host: "your-domain.example.com"
        paths:
          - path: /
            pathType: ImplementationSpecific
    extraPaths:
      - path: "/y-keycloak"
        pathType: ImplementationSpecific
        backend:
          service:
            name: chiron-keycloak
            port:
              number: 8080
      - path: "/y-jupyterhub"
        pathType: ImplementationSpecific
        backend:
          service:
            name: chiron-jupyterhub
            port:
              number: 8000
    annotations:
      kubernetes.io/ingress.class: "nginx"
      cert-manager.io/cluster-issuer: "letsencrypt-prod"
      nginx.ingress.kubernetes.io/enable-cors: "true"
      nginx.ingress.kubernetes.io/cors-allow-origin: "https://your-domain.example.com"
      nginx.ingress.kubernetes.io/cors-allow-methods: "GET, POST, PUT, PATCH, OPTIONS"
      nginx.ingress.kubernetes.io/proxy-body-size: "0"
      nginx.ingress.kubernetes.io/proxy-max-temp-file-size: "0"
      nginx.ingress.kubernetes.io/proxy-buffer-size: "128k"
      nginx.ingress.kubernetes.io/proxy-buffering: "on"
      nginx.ingress.kubernetes.io/proxy-buffers-number: "4"
    tls:
      - secretName: tls-portal
        hosts:
          - "your-domain.example.com"
registry-auth:
  existingSecret: true
  existingSecretName: k8s-registry-auth
  registry-auth-postgresql:
    auth:
      existingSecret: k8s-registry-auth-postgresql
      database: registry-auth
      username: yields
registry:
  existingSecret: true
  existingSecretName: k8s-registry
  existingKernelClientSecretName: k8s-registry-kernel
  registry-postgresql:
    auth:
      existingSecret: k8s-registry-postgresql
      database: registry
      username: yields
  persistence:
    enabled: true
    instances:
      accessModes:
        - ReadWriteMany
      size: "8Gi"
    results:
      accessModes:
        - ReadWriteMany
      size: "8Gi"
    data:
      accessModes:
        - ReadWriteMany
      size: "8Gi"
jupyterhub:
  existingSecret: true
  existingSecretName: k8s-jupyterhub
  existingKernelClientSecretName: k8s-registry-kernel
  oidc:
    enabled: true
    keycloak: "https://your-domain.example.com"
vault:
  server:
    autoUnseal:
      enabled: true
  enabled: true
  jwt:
    jwksUrl: "https://your-domain.example.com/y-keycloak/realms/yields/protocol/openid-connect/certs"
    boundIssuer: "https://your-domain.example.com/y-keycloak/realms/yields"
```

</details>

<details>
<summary>Example values-versions.yaml</summary>

```yaml
keycloak:
  image:
    tag: 2.12.1
y-portal:
  image:
    tag: 2.12.1
registry:
  image:
    tag: 2.12.1
  chironVersion: 2.12.d53406
registry-auth:
  image:
    tag: 2.12.1
analysispackage-docs:
  image:
    tag: 2.12.2
jupyterhub:
  image:
    tag: 2.12.1
  jupyterlab:
    image:
      tag: 2.12.3
  jupyter-enterprise-gateway:
    image:
      tag: 2.12.2
    kernel:
      image:
        tag: 2.12.1
    hadoop:
      dfs:
        namenode:
          image:
            tag: 2.12.1
        datanode:
          image:
            tag: 2.12.1
      historyserver:
        image:
          tag: 2.12.1
      hadoop-yarn:
        resourcemanager:
          image:
            tag: 2.12.1
        nodemanager:
          image:
            tag: 2.12.1
vault:
  server:
    image:
      tag: 2.12.1
global:
  init:
    image:
      tag: 2.12.1
```

</details>

### 5. Install

```shell
helm upgrade --install chiron \
  -f values.yaml \
  -f values-versions.yaml \
  --wait \
  --timeout=1800s \
  --debug \
  yields/chiron
```

:::tip AWS deployments
Deployments in Amazon Web Services require the `external-dns.alpha.kubernetes.io/hostname` annotation set to the FQDN of the host on the Ingress:

```shell
--set y-portal.ingress.annotations."external-dns\.alpha\.kubernetes\.io/hostname"="portal.qa.k8s.yields.io"
```
:::

### 6. Vault Setup

After deployment, check the logs of the `vault-setup` container to get the root token and unseal keys:

```shell
kubectl logs -f y-vault-0 -c vault-setup
```

When resource functionality is disabled, vault should also be disabled:

```yaml
y-portal:
  resourcesShow: false
vault:
  enabled: false
```

### 7. Strong Password Policy

Set the following environment variable on the `chiron-keycloak` pod:

```
YIELDS_PASSWORD_POLICY="specialChars(1) and upperCase(1) and digits(1) and length(9)"
```

### 8. Google OAuth (Optional)

Add to the `keycloak` block in `values.yaml`:

```yaml
googleOauth:
  enabled: true
  clientId: "123someid.apps.googleusercontent.com"
  clientSecret: "secret"
  keycloakDomain: "your-domain.example.com"
```

### 9. CSP Headers for Nginx Ingress

When applicable, configure:

```
default-src 'self' https://accounts.google.com https://api.cdnjs.com https://ajax.googleapis.com https://cdnjs.cloudflare.com https://rawgit.com; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self'; style-src 'self'
```

---

## Upgrade Install

### Standard Upgrade

Update the Helm repository and upgrade:

```shell
helm repo update
helm upgrade chiron \
  -f values.yaml \
  -f values-versions.yaml \
  --wait \
  --timeout=1800s \
  yields/chiron
```

### Post-Upgrade: Update Example Runtimes

After a successful upgrade:

1. Sign in with the Yields user
2. Navigate to **Instances** > **Examples** folder
3. Switch to **List view**
4. Sort by **Runtime** name (descending)
5. Change the runtime for all examples to **Default Spark Python Yarn** (via **More options** > **Edit Runtime**)
6. Archive the old **Yields MRM runtime** via **Runtimes** > **More options** > **Archive**

:::caution
If the runtime is in use by other specifications/instances, you must change those first before archiving.
:::

---

## YfP Light Installation

YfP Light is a reduced deployment mode optimized for Kubernetes-native kernel execution, without Hadoop/YARN components.

### Key Characteristics

- Hadoop/YARN components are **disabled**
- Uses Kubernetes-native kernel execution (no YARN resource manager)
- Lightweight Python kernels with minimal resource footprint
- Kernel Image Puller (KIP) for pre-caching kernel images

### Additional Prerequisites

- **Kubernetes**: 1.30+
- **Cluster sizing**: 2–3 nodes, 4 CPU / 16GB RAM per node minimum
- **Storage**: 24Gi+ for persistent volumes

### Image Registry

YfP Light uses Google Artifact Registry:

```
europe-west1-docker.pkg.dev/chiron-application-475111/ca-images
```

Alternatively, images are available via DockerHub under `yieldsio/`.

### Installation

Follow the same secret creation steps as the standard install, then use a YfP Light-specific `values.yaml` that sets:

```yaml
jupyterhub:
  jupyter-enterprise-gateway:
    hadoop:
      enabled: false
    kip:
      enabled: true
vault:
  enabled: false
```

The kernel configuration uses `python-mini-kubernetes` containers instead of YARN-based kernels.

### Verification

Check pod status:

```shell
kubectl get pods -l app.kubernetes.io/instance=chiron
```

Expected pods include: `chiron-keycloak`, `chiron-registry`, `chiron-registry-auth`, `chiron-jupyterhub`, `chiron-jupyter-enterprise-gateway`, `chiron-y-portal`, `chiron-analysispackage-docs`, and `chiron-kernel-image-puller` (DaemonSet).

Retrieve admin credentials:

```shell
kubectl get secret k8s-keycloak -o jsonpath='{.data.keycloak-password}' | base64 -d
```

### Task Runner Configuration (YfG Integration)

When using YfP Light as a Task Runner for automations, configure the YfG integration in your `values.yaml`:

```yaml
global:
  taskRunner:
    enabled: true
    yfg:
      apiGatewayExternal: "https://your-env.yfg.k8s.yields.io/apigatewayexternal"
      wellKnown: "https://your-env.yfg.k8s.yields.io/auth/.well-known/openid-configuration"
      auth:
        clientId: "YourClientId"
        clientSecret: "your-secret"
        targetUserId: ""
        targetUsername: "your-user"
```

### Kernel Image Puller (KIP) with Workload Identity

When deploying with GKE Workload Identity, bind the kernel service account:

```hcl
resource "google_service_account_iam_binding" "kernel_image_puller_binding" {
  service_account_id = "projects/<project>/serviceAccounts/<gcp-sa>"
  members = [
    "serviceAccount:<project-id>.svc.id.goog[<namespace>/<k8s-sa-name>]",
  ]
  role = "roles/iam.workloadIdentityUser"
}
```

And annotate in the Helm chart:

```yaml
jupyterhub:
  jupyter-enterprise-gateway:
    kip:
      annotations:
        iam.gke.io/gcp-service-account: <gcp-sa-email>
```

---

## Docker Images

Released images are available on DockerHub:

```
yieldsio/y-keycloak
yieldsio/y-portal
yieldsio/y-platform-registry
yieldsio/y-registry-auth
yieldsio/y-analysispackage-docs
yieldsio/y-jupyterhub
yieldsio/y-jupyter-lab
yieldsio/y-enterprisegateway
yieldsio/y-kernel-k8s-py-3-12
yieldsio/y-hadoop-namenode
yieldsio/y-hadoop-datanode
yieldsio/y-hadoop-historyserver
yieldsio/y-kernel-yarn
yieldsio/y-vault
yieldsio/y-base-init
yieldsio/y-chiron-tests-e2e
yieldsio/y-chiron-tests-selenium
yieldsio/y-client-automation
```
