:py:mod:`yields.interfaces.registry_generator`
==========================================================

.. py:module:: yields-core.yields.interfaces.registry_generator


Module Contents
---------------

Classes
~~~~~~~

.. autoapisummary::

   yields-core.yields.interfaces.registry_generator.RegistryGenerator




.. py:class:: RegistryGenerator


   Generates registry APIs.

   .. py:method:: create_data_management() -> yields_registry.RawDataApi
      :abstractmethod:


      Create data API.

      :return: Data API.


   .. py:method:: create_instance_management() -> yields_registry.StageInstanceApi
      :abstractmethod:


      Create instance API.

      :return: Instance API.


   .. py:method:: create_session_management() -> yields_registry.StageSessionApi
      :abstractmethod:


      Create session API.

      :return: Session API.


   .. py:method:: create_artifact_management() -> yields_registry.ArtifactApi
      :abstractmethod:


      Create artifact API.

      :return: Artifact API.


   .. py:method:: create_resource_management() -> yields_registry.ResourceApi
      :abstractmethod:


      Create resource API.

      :return: Resource API.


   .. py:method:: create_tag_management() -> yields_registry.TagApi
      :abstractmethod:


      Create tag API.

      :return: Tag API.



