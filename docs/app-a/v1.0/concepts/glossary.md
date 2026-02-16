---
sidebar_label: Glossary
---

# Glossary

### Specification

A notebook in conjunction with its [Signature](#signature).
A specification should be thought of as a "template" doing some input to output transformations (an analysis). It is supposed to be generic (i.e. a template) such that the same analysis can be applied on e.g. different data input (but with the same shape). Passing concrete context for the specification I/O creates a so-called [Instance](#instance).

### Specification Version

Once happy with the notebooks you can register it under a new version. Only a registered version of a specification will be used when creating an instance. Changes that have not been registered under a new version shall thus not be taken into account during instance creation/run.

### Instance

A [Specification](#specification) for which every input and output has been given a concrete value, i.e. specification + context.
Running an instance results in one or more [Session(s)](#session).

### Runtime

Context needed to perform calculations. It typically can be thought of as a combination of libraries, dependencies and resources.

- When the user works in JupyterLab inside the application: runtime would be the default kernel coming with the deployment of the application.
- When the user chooses to perform calculations by other means, the user can create his own runtimes.

Note that we do not consider the runtime as an object along the line of an [Artifact](#artifact) (because it cannot be loaded, acted upon etc. inside a notebook).

### Resource Definition

A template object that defines the connection structure to an external service.
It specifies shared fields like URL, token, username, or password — without including user-specific credentials.
Users create [Resources](#resource) from it by filling in their own credentials.

### Resource

A user-specific configuration object that stores access credentials and connection details for an external service.
It is based on a predefined [Resource Definition](#resource-definition) and includes fields like URL, username, password, API key, etc., tailored to the user.

### Artifact

A "container object" that can contain several files. Each different file is uploaded as a new [Artifact Version](#artifact-version).

Possible use-cases for working with artifacts are:

- Loading unstructured data inside the platform.
- Trained models can be saved (and read) as artifacts which enables easy sharing of models between platform users.
- Saving/reading any object you want inside the platform.

### Artifact Version

Every time the user uploads a file under a given artifact, a new artifact version of this artifact will be created, containing the relevant metadata as well as the physical file being uploaded.
The versioning itself is on the file level. This means that, given file A, any other file B could be added into this same artifact and it will be versioned as a new version of the artifact (only containing file B).

### Session

Result of an [Instance](#instance) which is executed.
The analysis session contains enough metadata information so that it can be replayed (i.e. executed again leading to exactly the same results).

### Tag

Managed object that can be either created globally (from the tags menu) or locally (for a given object). Associating tags to an object allows to more easily retrieve the object because the search bar allows for searching by tag name (and not only free text fields).

### Fork

A copied specification aimed for specification development using git flow.

### Parameter

A possible signature input to a specification for which it is considered useful to have it controlled at the UI level.

### Automation

A set of tasks that should be run at some point in the future with a certain recurrence.

### Task

An atomic action that is part of an [Automation](#automation).

### Platform

Short for the "Yields for Performance application", with the particular meaning of the user interface. It is where the user creates and edits his objects.

### Signature

The signature of a specification describes the required inputs and outputs, meaning both the number and type. These can be a combination of any of the following objects:

- [Parameter](#parameter)
- [Artifact](#artifact)

### Graph

Visualization of the object of interest and its dependencies with other objects (if any). Particularly relevant when interested in the dataflows.

### User Group

Different users can be assigned to the same group. A group can be thought of as a specific department within the company. Note that users within the same group can have a different [User Role](#user-role---scope), which in turn defines the permissions on the objects. Depending on the settings by the administrator, users belonging to the same group can have all their objects automatically shared, i.e. without the need for explicit sharing.

### User Role - Scope

There are three default user roles defined, of which each has different permissions in the application. The available default roles are:

- **Read-only user**: user has read rights only. This user cannot act on any platform object(s), only see them. This user cannot access the administration part of the platform, not even with read access only.
- **Quant user**: this role has the permission to do anything but the platform administration rights. This role is an extension of the "read-only user" role, where now this user can also act on the objects.
- **Administrator**: an extension of the "Quant user" role in the sense that it keeps all the rights of the "Quant user". The administration part of the portal allows them to:
  - Manage roles (i.e. create/delete role)
  - Manage scope (i.e. permissions belonging to a given role)
  - Manage user's roles (i.e. what users are entitled to which role)

Note that users with a different User Role can belong to the same [User Group](#user-group). For example, one group (e.g. a single department) might have both quants and read-only users.

### Application Objects

All of the following we refer to as our application objects:

- [Specification](#specification)
- [Instance](#instance)
- [Artifact](#artifact)

### Standardization

Within the entire model risk management process, Yields for Performance allows standardization by means of the following:

- Performing the same model risk assessment **across models** belonging to the same model type (i.e. Specifications can be used as a template to create Instances)
- Performing the same model risk assessment for a given model **over time**
