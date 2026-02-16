---
sidebar_label: Library Concepts
---

# Python Library Concepts

## Scope and Definitions

The [User Guide](../user-guide/getting-started.md) shows how to create, share, and edit the [Application Objects](glossary.md#application-objects) from the user interface of the application.

However, in order to perform model risk analyses, the user should know how to make use of these objects and their contents inside Jupyter notebooks, such that the model assessment they want to carry out can be scripted.

To enable this read/write communication between the application, the notebooks and any data storage provider and computation provider, Yields has developed its own Python Library. The following principles have been followed for its development:

- **Metadata management first** — the main focus is to manage metadata, and it should do this while the scripts are impervious to the particular technologies used for either data storage or computation. This implies:
  - The way data is read/written is up to the user. The library offers easy ways to get file handlers for input data operations as well as buffers for data output operations regardless of the storage medium.
  - We allow the user to integrate with different kinds of data storage providers (e.g. local file system, HDFS, ...), as well as the possibility to extend the library and implement their own storage providers.
  - We don't wrap around existing open source code.

- **Readability** — the methods used should clearly reflect what is to be expected from them.

- **Accessible documentation** — more information can be retrieved from docstrings using `help()` in the Jupyter notebook.

- **Maintainability, portability and reusability** — as long as the user doesn't go outside of the intended scope of the library and sticks to the publicly available methods, it is reasonable to expect high levels of maintainability, portability and reusability. It is irrelevant to the library what and how the data within the accessed objects is used as long as it is done via the proper methods.

:::note
As a general note, a user opening the JupyterLab view:
- Will only see the folder they own in the folder pane on the left hand side.
- Will have a dedicated environment for code execution; this implies the user may modify the environment distribution without impacting any other user who is running some code in JupyterLab too.
:::

## Library Glossary

### Python Library

Interactions with the [Application Objects](glossary.md#application-objects) have to be done via the [Registry API](#registry-api). The Python Library is the interface via which these interactions can be done in a controlled and reproducible manner.

### Registry API

Backend API that allows the user to perform many operations that could go beyond our intended domain model, yet might be needed. The user has to navigate to `AppURL/y-api/swagger` to consult the documentation.

### Registry

Backend inventory containing all kinds of information on the different objects and their status, as well as interdependencies between them. It can be thought of as the user-interface in some abstract fashion. The registry itself does not carry out any computations but keeps track of and generates metadata.

### Providers

The read and write operations are abstracted behind what we call providers. These providers offer the same interface regardless of the target infrastructure. Meaning that saving and reading data from artifacts is the same for any technology used to store the actual data.
