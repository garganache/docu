.. index::
    %notebook%: General

#######
General
#######

.. _library_scope_def:

*******************
Scope & definitions
*******************

The :ref:`chiron_docs` shows how to create, share, edit, the :term:`Application objects` from the user interface of the
application.

However, in order to perform some model risk analyses (see :ref:`chiron_workflow` and :ref:`specification_procedures`)
the user should know how to make use of these objects and their contents inside the Jupyter notebooks, such that the
model assessment they want to carry out can be scripted.

To enable this read/write communication between the application, the notebooks and any data storage provider and
computation provider, Yields has developed its own :term:`Python Library`. The following principles have been followed
for it's development:

* Main focus to use Yields for Performance is to manage metadata, and it should do this while the scripts are impervious to the
  particular technologies used for either datastorage or computation. This implies the following:

  * The way data is read/written is up to the user. The library offers easy ways to get file handlers for input data
    operations as well as buffers for data output operations regardless of the storage medium.
  * We allow the user to integrate with different kinds of datastorage providers (e.g. local file system, HDFS, ...), as
    well as the possibility to extend the library and implement their own storage providers.
  * We don't wrap around existing open source code.

* Readability is a core principle of the library; the methods used should clearly reflect what is to be expected from
  them.
* Easily accessible documentation is another core focus; meaning more information can be retrieved from docstrings using
  :code:`help()` in the Jupyter notebook.
* Maintainability, portability and reusability; as long as the user doesn't go outside of the intended scope of the
  library and sticks to the publicly available methods it is reasonable to expect high levels of maintainability,
  portability and reusability. It is irrelevant to the library what and how the data within the accessed objects is used
  as long as it is done via the proper methods.

In this part of the user manual, we will document a dedicated list of possible operations a notebook user would like to
perform on the objects. This has a consequence that it's more of a technical nature and therefore only deemed
relevant for quant-users eager to write their own notebooks.

As a general note, a user opening the JupyterLab view
* will only see the folder he owns in the folder pane on the left hand side
* will have a dedicated environment for code execution; this implies the user may modify the environment distribution without impacting any other user who is running some code in JupyterLab too

The following :ref:`library_glossary` describes commonly used terms within the notebook and library context.

.. _library_glossary:

****************
Library Glossary
****************

.. glossary::

    Python Library
        Interactions with the :term:`Application objects` have to be done via the :term:`Registry API`. The Python library is
        the interface via which these interactions can be done in a controlled and reproducible manner.

    Registry API
        Backend API that allows the user to perform many operations that could go beyond our intended domain model, yet
        might be needed. The user has to navigate to **AppURL/y-api/swagger**, to consult the documentation.

    Registry
        Backend inventory containing all kinds of information on the different objects and their status, as well as
        interdependencies between them. It can be thought of as the user-interface in some abstract fashion. The
        registry itself does not carry out any computations but keeps track of and generates metadata.

    Providers
        The read and write operations are abstracted behind what we call providers. These providers offer the same
        interface regardless of the target infrastructure. Meaning that saving and reading data from artifacts is the
        same for any technology used to store the actual data.
