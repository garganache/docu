####################################################
Welcome to the Yields for Performance documentation!
####################################################

| Yields for Performance is Yield's scalable data science platform for Model Risk Management (MRM).
| It distinguishes itself from other data science environments because it has been designed with the main purpose of standardizing model risk management.
| Yields for Performance offers several functionalities that are essential for a best-practice in MRM, in particular:

    * **Reproducibility**: ensuring that historically obtained results can be reproduced at all times.
    * **Auditability**: creating and maintaining the relevant metadata on all the algorithm's related objects (i.e. input, output, the algorithm itself and their mutual relations, i.e. lineage)
    * **Standardization**: enabling efficient use of code by means of having 'specification templates'.
    * **Sharing** data and computations to enable efficient interactions between teams.

In this documentation, information can be retrieved on several of the above aspects of Yields for Performance.

1. If you want to learn **on how a complete end-to-end model assessment pipeline is built** in Yields for Performance,
have a look at the :ref:`chiron_workflow` under the :ref:`yfp_docs`.

2. In this same :ref:`yfp_docs`, **procedures regarding on how to create, share, run, ... the most important objects in Yields for Performance** are documented in a step-by-step approach.
These different building blocks all together will create your robust and reproducible end-to-end analytics pipelines.
Additional information regarding admin and user management functionalities can also be found.

3. For users intending to start working inside Jupyter notebooks, we have a dedicated section that **explain how the notebooks
can interact with the objects defined inside the platform** - see :ref:`library_docs`.

4. Finally, there are dedicated :ref:`release_notes` and :ref:`user_feedback` sections.

.. toctree::
   :name: yfp_docs
   :caption: Yields for Performance User Manual
   :maxdepth: 1

   general/scope_and_definitions
   general/glossary
   general/workflow
   general/procedures_artifact
   general/procedures_spec
   general/procedures_instances
   general/procedures_tags
   general/procedures_resources
   general/procedures_automations
   general/procedures_other
   general/object_organization
   general/admin
   general/user

.. toctree::
   :name: library_docs
   :caption: Python Library User Manual
   :maxdepth: 1

   general/library_general
   general/library_modules
   general/library_session
   general/library_io
   general/library_tags
   Library Reference <_library/index>

.. toctree::
   :name: use_case
   :caption: Model Risk Use Cases
   :maxdepth: 1

   general/use_cases

.. toctree::
   :name: release_notes
   :caption: Release Notes
   :maxdepth: 1

   general/release_management
   general/limitations

.. toctree::
   :name: user_feedback
   :caption: User Feedback
   :maxdepth: 1

   general/questions
