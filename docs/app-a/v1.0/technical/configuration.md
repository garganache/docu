# Configuration

This guide covers configuration topics for Yields for Performance (YfP), including YARN cluster sizing, runtime customization, timeouts, certificates, Keycloak tokens, scopes, Spark integration, and custom registries.

## YARN Cluster Sizing

YfP includes a YARN cluster for resource management, ensuring all data processing functions can run concurrently according to client needs.

### Types of Work

There are two types of processing work:

- **Interactive Sessions** — Users in interactive sessions (Interactive Report, Open Code on Specification, Interactive Replay). One user can start multiple interactive sessions at the same time. These sessions should be free to grow or shrink.
- **Platform Sessions** — Background sessions that run in parallel at instance level (one per instance at a time), but sequential inside an instance. The amount that can run is fixed but configurable.

### YARN Concepts

YARN allocates resources through **containers**. These have a minimum size, and all other sizes are multiples of that minimum. A job may have one or multiple containers. Containers are scheduled on **queues** which allow splitting and allocating types of work.

### Default Configuration

YfP comes with two YARN queues:

| Queue | Dedicated Work Type |
|-------|-------------------|
| `sessions` | Interactive Sessions |
| `platform_sessions` | Platform Sessions |

Default minimum container size: **1024 MB**.

Default queue sizing (based on a non-scalable cluster of **32 GB** RAM):

| Queue | Percent of Cluster |
|-------|-------------------|
| `sessions` | 80% |
| `platform_sessions` | 20% |

This guarantees 2 platform sessions running simultaneously and supports ~5 concurrent interactive users.

### Sizing Formula

```
Interactive Users × Sessions per User × Session Size + Platform Sessions × Users × Session Size
```

Where session size ≈ 3 containers × 1.5 GB = 4.5 GB.

**Example:** 40 users with 5 kernels each and 2 parallel platform sessions:

```
40 × 5 × (3 × 1.5) + 40 × 2 × (3 × 1.5) = 1260 GB
```

### Configuring the NodeManager

**1. Pod resource limits** in your `values.yaml`:

```yaml
nodemanager:
  resources:
    requests:
      cpu: 1
      memory: 2Gi
    limits:
      cpu: 2
      memory: 10Gi
```

**2. YARN resource allocation** (should match the pod limits):

```shell
--set jupyterhub.jupyter-enterprise-gateway.hadoop.yarn.scheduler.maximumAllocationMb=8192
--set jupyterhub.jupyter-enterprise-gateway.hadoop.yarn.scheduler.maximumAllocationVcores=8
--set jupyterhub.jupyter-enterprise-gateway.hadoop.yarn.nodemanager.resource.memoryMb=8192
--set jupyterhub.jupyter-enterprise-gateway.hadoop.yarn.nodemanager.resource.cpuVcores=8
```

**3. Autoscaling:**

```yaml
nodemanager:
  autoscaling:
    enabled: true
    minReplicas: 1
    maxReplicas: 5
    targetCPUUtilizationPercentage: 80
    targetMemoryUtilizationPercentage: 80
```

### Queue Configuration

- **Queue capacity**: `yarn.scheduler.capacity.root.QUEUE.capacity` — set as percentage (e.g. 10, 20)
- **User limit per queue**: `yarn.scheduler.capacity.root.QUEUE.minimum-user-limit-percent` — e.g. 20 means ~5 users
- **Minimum container size**: `yarn.scheduler.minimum-allocation-mb` in `yarn-site.xml` (default 512)

### Monitoring the YARN Cluster

Port-forward the ResourceManager web UI:

```shell
kubectl port-forward chiron-hadoop-yarn-resourcemanager-0 8088:8088
```

Other useful ports:
- **NodeManager**: 8042 — container logs and resources
- **History Server**: 8188 — completed application logs

To investigate a specific NodeManager:

```shell
kubectl port-forward chiron-hadoop-yarn-nodemanager-N 8042:8042
```

---

## Modifying Default Runtime Attributes

When executing intensive jobs, you may need to allocate more resources to the Spark cluster.

Edit the `chiron-jupyter-enterprise-gateway` ConfigMap:

```shell
kubectl edit cm chiron-jupyter-enterprise-gateway
```

Add Spark configuration values to the `SPARK_OPTS` key for the kernel you want to modify. See the [Spark Configuration Reference](https://spark.apache.org/docs/latest/configuration.html) for available options.

You can also pass custom environment variables to the kernel through this ConfigMap.

---

## Timeout Configuration

Depending on file sizes and network speed, timeouts may occur during automation execution or file uploads. These can be adjusted at three levels:

### Registry (Akka HTTP)

In the Registry ConfigMap:

```
akka.http.server.idle-timeout
akka.http.client.idle-timeout
akka.http.server.request-timeout
```

### Y-Portal (Nginx)

In the Y-Portal ConfigMap for `/y-api`:

```
proxy_connect_timeout <number>;
proxy_send_timeout <number>;
proxy_read_timeout <number>;
```

### Ingress (Nginx Annotations)

```yaml
nginx.ingress.kubernetes.io/proxy-connect-timeout: "<number>"
nginx.ingress.kubernetes.io/proxy-send-timeout: "<number>"
nginx.ingress.kubernetes.io/proxy-read-timeout: "<number>"
```

---

## Self-Signed Certificates

To use self-signed certificates:

1. Generate a private key:

   ```shell
   openssl genrsa -out key.pem 4096
   ```

2. Create a CSR:

   ```shell
   openssl req -new -key key.pem -out csr.pem
   ```

3. Generate a self-signed certificate:

   ```shell
   openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
   ```

4. Add the certificate as a Kubernetes secret:

   ```shell
   kubectl create secret tls chiron-tls-secret --cert=./cert.pem --key=./key.pem
   ```

5. Modify the Ingress to use the secret:

   ```yaml
   tls:
     - hosts:
         - your-host-here.com
       secretName: chiron-tls-secret
   ```

### For version 2.3.x and later

Ensure the Keycloak deployment uses `KC_HOSTNAME` (not `KC_HOSTNAME_URL`) and add the following environment variable:

```yaml
- name: KC_HOSTNAME_BACKCHANNEL_DYNAMIC
  value: "true"
```

---

## Keycloak Token Lifespans

During release, YfP is tested against a given configuration of token lifespans (access token lifespan, session idle time, etc.). These values are documented on the release page.

If you need to adjust token lifespans, refer to the [Keycloak documentation on timeouts](https://www.keycloak.org/docs/latest/server_admin/#_timeouts).

---

## Reserved Scopes

Reserved scopes restrict certain actions so that only specific roles can perform them. Configure them in `charts/registry-auth/values.yaml`:

```yaml
reservedScopes:
  - StageEdit
  - FolderRename
  - StageCommitChanges
  - FolderMove
  - StageMove
  - ArtifactMove
  - SessionDelete
  - StageDelete
  - FolderDelete
  - SpecificationDelete
  - ArtifactDelete
  - ArtifactEdit
  - UploadFile
  - ArtifactUpload
  - SpecificationLightEdit
  - SpecificationEditRuntime
  - SpecificationMove
  - SpecificationEditCode
  - SpecificationEditIO
  - SpecificationEditParameters
  - SpecificationRegister
  - SpecificationCommitChanges
  - BaseRuntimeEdit
  - BaseRuntimeArchive
  - RuntimeEdit
  - RuntimeArchive
  - StageEditRuntime
  - TagLink
```

Add or remove scopes from this list and redeploy `registry-auth`, then restart the Registry once it is up.

:::note
Only the scopes listed above can be reserved. Other scopes (e.g. share, copy, or reserve itself) cannot be reserved.
:::

---

## Adding a Spark JAR

### Method 1: Modifying HDFS Directly

Suitable for development when you are not sure which JARs you need.

1. Download the JAR (ensure it matches your Spark and Scala versions)
2. Create a directory in HDFS:

   ```shell
   kubectl exec -ti chiron-hadoop-namenode-0 -- hdfs dfs -mkdir /spark/company_name
   ```

3. Copy the JAR:

   ```shell
   kubectl cp file.jar chiron-hadoop-namenode-0:/home/yields
   kubectl exec -ti chiron-hadoop-namenode-0 -- hdfs dfs -copyFromLocal /home/yields/file.jar /spark/company_name
   ```

4. Update the `chiron-jupyter-enterprise-gateway` ConfigMap to include the JAR path:

   ```
   spark.yarn.jars='hdfs://chiron-hadoop-namenode:8020/spark/jars/*.jar,hdfs://chiron-hadoop-namenode:8020/spark/company_name/*.jar'
   ```

5. Restart the Enterprise Gateway pod and verify the JAR is loaded.

### Method 2: Modifying a Docker Image

For production use after establishing the required JARs:

1. Create a Dockerfile based on the Enterprise Gateway image
2. Copy the JARs into the image
3. Reference the location in the runtime ConfigMap:

   ```
   --conf spark.yarn.jars=hdfs://chiron-hadoop-namenode:8020/spark/jars/*.jar,file:///home/yields/${FOLDER_NAME}/*.jar
   ```

---

## Runtimes as Virtual Environments

For rapid iteration during development, you can create YARN-based runtimes using virtual environments without building an image each time.

:::caution
HDFS is not secured — environments can be accidentally overridden or deleted. Tracking what was used during execution is more difficult with this approach.
:::

1. Create, install, archive, and upload the environment:

   ```shell
   kubectl exec -ti chiron-hadoop-yarn-nodemanager-0 -- bash -c \
   'export KERNEL_NAME=test && cd /home/yields && \
   python3 -m venv $KERNEL_NAME --system-site-packages --symlinks --upgrade-deps && \
   $KERNEL_NAME/bin/pip install iredis && cd $KERNEL_NAME && \
   tar -cvf $KERNEL_NAME.tar . && \
   /opt/hadoop/bin/hdfs dfs -copyFromLocal $KERNEL_NAME.tar /data/'
   ```

2. Configure the custom kernel in your Helm values:

   ```yaml
   customKernels:
     enabled: true
     kernels:
       - name: "KERNEL_NAME"
         overrides:
           --archives hdfs://chiron-hadoop-namenode:8020/data/KERNEL_NAME.tar#environment
           spark.yarn.appMasterEnv.PYSPARK_PYTHON: "./environment/bin/python3"
   ```

---

## Installing a .whl Inside the Kernel

As an alternative to creating a dedicated runtime, wheel files can be provided as an artifact and installed at runtime using the following helper:

```python
import shutil
import tempfile
import subprocess
import sys
import site
import importlib
from pathlib import Path

from yields.session.io.artifact import ArtifactInput

def pip_install(target: str, verify_install: bool = True, print_stdout: bool = False):
    args = [sys.executable, "-m", "pip", "install", "--no-cache-dir",
            "--force-reinstall", target]
    with subprocess.Popen(args, stdout=subprocess.PIPE,
                          stderr=subprocess.STDOUT) as process:
        for line in process.stdout:
            if print_stdout:
                print(line.decode('utf8'))

    path = site.getusersitepackages()
    if path not in sys.path:
        sys.path.append(path)

    if verify_install:
        spec = importlib.util.find_spec(target)
        if not spec:
            raise RuntimeError(f"Couldn't install {target}")


def install_from_artifact(artifact: ArtifactInput, print_stdout: bool = False):
    for dependency in artifact.files:
        temporary_directory = tempfile.mkdtemp()
        file = Path(temporary_directory) / dependency
        file.touch()
        file.write_bytes(artifact.file(dependency).open().read())
        pip_install(str(file), verify_install=False, print_stdout=print_stdout)
        shutil.rmtree(temporary_directory)
```

Call `install_from_artifact(session.io.inputs["your_artifact_alias"])` in your notebook.

---

## Custom Artifact Registry (pip Index)

To make pip installs use a different index, configure environment variables on the NodeManager.

### 1. Set the Environment Variable

```shell
kubectl edit sts chiron-hadoop-yarn-nodemanager
```

Under `template.spec.containers.env`, add:

```yaml
- name: PIP_INDEX_URL
  valueFrom:
    secretKeyRef:
      key: pip-index-secret
      name: k8s-registry-kernel
```

- `PIP_INDEX_URL` — overrides the default PyPI index
- `PIP_EXTRA_INDEX_URL` — adds an additional index alongside PyPI

### 2. Whitelist the Variable in YARN

```shell
kubectl edit cm chiron-hadoop
```

Under `yarn-site`, add:

```xml
<property>
  <name>yarn.nodemanager.env-whitelist</name>
  <value>PIP_INDEX_URL,PIP_EXTRA_INDEX_URL,JAVA_HOME,HADOOP_COMMON_HOME,HADOOP_HDFS_HOME,HADOOP_CONF_DIR,YARN_HOME</value>
</property>
```
