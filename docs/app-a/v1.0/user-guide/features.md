# System Architecture

This page provides a comprehensive overview of the Yields for Performance (YfP) architecture, its deployment modes, and the purpose of each component.

## Overview

Yields for Performance is a comprehensive tool designed to generate evidence and lineage, essential for audit and validation processes. At its core, the application focuses on creating and tracking lineage, with reproducibility being a highly useful byproduct of this functionality.

### Key Features

- **Lineage Generation** — The primary function of the application. It generates detailed lineage crucial for understanding data flow and transformations within the system. This lineage information supports reproducibility and auditing.
- **Reproducibility** — Leveraging the generated lineage, the application enables interactive replay and rerunning of sessions, allowing users to reproduce data transformations and processes. This is vital for validating results and ensuring data integrity.
- **Audit and Validation** — The application empowers validators to perform thorough audits and validations. It includes off-the-shelf best practices and a curated set of tests tailored for different models (e.g. y-mrm).
- **Monitoring** — When spurious behavior is detected, the application allows users to trace and reproduce the issue using the generated lineage, facilitating quick troubleshooting.

---

## Deployment Modes

The ecosystem consists of three deployment configurations:

| Mode | Description | YARN | Kernels |
|------|-------------|------|---------|
| **YfP (Standard)** | Full deployment with YARN and all kernel types | Yes | All 4 |
| **YfP Light** | Reduced deployment without Hadoop/YARN | No | Kubernetes-native only |
| **Task Runner** | Automation-focused YfP Light integrated with YfG | No | Mini kernel with YfG client |

### Standard YfP

The default deployment includes a full YARN cluster and four kernel types:

**YARN cluster components:**
- Resource Manager
- Node Managers
- NameNode, DataNodes
- History Server

**Kernels (4 total):**

| Kernel | Description |
|--------|-------------|
| Spark kernel | Full Spark execution on YARN |
| Individual Spark kernel | Spark execution with additional dependencies |
| Python Kubernetes Container | Full Python environment with MRM dependencies |
| Python Mini Kubernetes Container | Minimal Python environment for basic execution |

### YfP Light

A reduced deployment mode optimized for Kubernetes-native kernel execution:

- **Does not** deploy any YARN components (Resource Manager, Node Managers, NameNode, DataNodes, History Server)
- Spark on YARN is not available
- Intended for lightweight execution scenarios

### Task Runner

A specialized deployment for automation that integrates with **YfG** (Yields for Governance):

- Deployed as YfP Light
- Listens for events emitted by YfG (e.g. model lifecycle changes)
- On event reception, executes automation scripts within YfP
- Scripts call back into YfG using configured API endpoints
- Does not require YARN or heavy compute — primarily runs scripts that orchestrate workflows

**End-to-end flow:**

1. A model change occurs in YfG
2. YfG emits an event
3. Task Runner (YfP Light) receives the event
4. Task Runner executes automation scripts in YfP
5. Scripts call back into YfG using the configured API endpoints and credentials

---

## Components

### Y-Portal

The user interface implemented in Angular. Acts as a consumer of the RESTful API (Registry) and hosts JupyterLab and documentation via iframes.

| | |
|---|---|
| **Technology** | Angular 14 / TypeScript, Nginx |
| **Interacts with** | Registry, Keycloak, JupyterHub, JupyterLab, Analysispackage-docs |

### Keycloak (Authentication/Authorization)

Provides authentication throughout YfP. Can be interfaced with the client LDAP system for identity management.

| | |
|---|---|
| **Technology** | Keycloak |
| **Supports** | LDAP, Active Directory, identity federation |
| **Interacts with** | Client LDAP/AD, PostgreSQL, Registry, Registry-Auth, Y-Portal, JupyterHub |

### Registry Service

The core backend. Orchestrates the platform, contains the domain model and rules, and is responsible for lineage tracking and execution context reproduction. Also handles:

- Uploading data to the platform
- Registering artifact versions
- Configuring notebooks before execution
- Managing background execution of notebooks

| | |
|---|---|
| **Technology** | Scala 2.13, Pekko HTTP |
| **Interacts with** | Y-Portal, Keycloak, PostgreSQL, Jupyter Enterprise Gateway, file volumes |

### Registry-Auth Service

Manages user authorization. Synchronizes users and groups from Keycloak and allocates roles and scopes.

| | |
|---|---|
| **Technology** | Scala 2.13, Pekko HTTP |
| **Interacts with** | Y-Portal, Keycloak, PostgreSQL |

### Secret Store (Vault)

Stores credentials securely.

| | |
|---|---|
| **Technology** | HashiCorp Vault |
| **Interacts with** | Keycloak, Registry |

### PostgreSQL Databases

Two separate PostgreSQL databases provide storage for the Registry and Registry-Auth services.

### HDFS

Distributed Hadoop file system for big data storage. An alternative to the Artifact Repository for larger files.

:::note
Not deployed in YfP Light mode.
:::

### YARN Cluster

Resource management for kernels. YARN provides user access to a Spark Session and manages resource allocation for concurrent kernel execution.

:::note
Not deployed in YfP Light mode.
:::

### Jupyter Enterprise Gateway

Manages the lifecycle of kernels — starts, stops, and monitors kernel state.

| | |
|---|---|
| **Interacts with** | Registry, YARN cluster, JupyterLab, Kernel Pods |

### Kernel Pods

An alternative to classic YARN-based execution. Kernels are launched as Kubernetes Pod objects.

### Kernel Image Puller (KIP)

DaemonSet pods that pre-cache JupyterLab and kernel images on each node, ensuring fast kernel startup times.

### Prometheus Monitoring

Monitoring and observability for session execution. Reports errors in sessions when configured.

| | |
|---|---|
| **Technology** | Prometheus |
| **Interacts with** | Registry, YARN cluster, Kernel Pods |

### JupyterLab

The development interface for writing and editing specification notebooks.

### JupyterHub

Authenticates users and manages JupyterLab pod lifecycle.

### Client-Automation

Handles automation of repetitive tasks (scheduling and running sessions).

| | |
|---|---|
| **Interacts with** | Registry, Keycloak, file system |

### Analysispackage-docs

In-app documentation service for Yields for Performance.

---

## Data Residency

YfP handles four types of data:

| Data Type | Storage Location |
|-----------|-----------------|
| **Metadata** (domain objects and state) | PostgreSQL databases |
| **Staged Data** (source data for processing) | Raw data volume |
| **Ingested/Processed Data** (process output) | Artifact FS volume, HDFS |
| **Code** (processing logic) | Artifact FS volume |
