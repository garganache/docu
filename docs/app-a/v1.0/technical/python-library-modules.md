---
sidebar_label: "Python Library Modules"
---

# Overview of modules

For any information on the Python library, the user can do the following:

```python
%pip show yields-core

Name: yields-core
Version: 2.0.0a43
Summary: Yields Library.
Home-page: https://github.com/yields-io/y-analysis-core
Author: Edward Arghiroiu
Author-email: edward.arghiroiu@yields.io
License: Proprietary
Location: /usr/local/lib/python3.10/site-packages
Requires: loguru, pydantic, pydantic-settings, sphinx, yields-registry-api
Required-by: yields-computation-spark, yields-provider-filesystem, yields-provider-hdfs, yields-provider-spark
Note: You may need to restart the kernel to use updated packages.
```

## Initialising a session

When a notebook is opened, the first cell is automatically generated for the user and it contains the session
identifier:

```python
from yields.session import Session
session = Session("acde070d-8c4c-4f0d-9d8a-162843c10333")
```

This cell cannot be deleted by the user. Upon execution all the metadata (e.g. input metadata, output metadata, runtime
metadata, ... see [Creating a specification](../user-guide/specification-creation.md#create-a-specification)) from the current session is retrieved from the registry and exposed via this
library. From this point onwards, the user has access to a session (an instance of class Session).

Furthermore, the following holds:

* The UUID is automatically generated for the user.
* Everytime the user presses 'open code' another UUID is generated.

## Code documentation

Once a session is instantiated via the aforementioned automatically generated code block it's possible to view the
docstrings documentation by using `help()`.

```python
help(session)
help(session.io)
help(session.io.input("input1"))
```

## Available modules

* `session` - Starting point of the library.
* `session.io` - Interface for accessing input and output artifacts, parameters, and more.
* `session.manager` - Interface to manage the current session such as tagging objects, and more.
* `session.direct` - Direct access to the registry API.

## Providers

We currently support the following [providers](../concepts/library-concepts.md#providers):

```python
from yields.providers.filesystem import ProviderFactoryFilesystem
from yields.providers.hdfs import ProviderFactoryHdfs
from yields.providers.spark import ProviderFactorySpark
```

For working examples on how to actually use these providers, see [Python I/O Operations](python-io-operations.md).
