:py:mod:`yields.registry.online.online_registry`
============================================================

.. py:module:: yields-core.yields.registry.online.online_registry


Module Contents
---------------

Classes
~~~~~~~

.. autoapisummary::

   yields-core.yields.registry.online.online_registry.OnlineRegistry




.. py:class:: OnlineRegistry(refresh_token: str, client_id: str, client_secret: str, registry_url: str, kernel_oidc_host_url: str)


   Bases: :py:obj:`yields-core.yields.interfaces.registry_generator.RegistryGenerator`

   Generates registry APIs.

   .. py:method:: create_data_management() -> yields_registry.RawDataApi

      Create data API.

      :return: Data API.


   .. py:method:: create_instance_management() -> yields_registry.StageInstanceApi

      Create instance API.

      :return: Instance API.


   .. py:method:: create_session_management() -> yields_registry.StageSessionApi

      Create session API.

      :return: Session API.


   .. py:method:: create_artifact_management() -> yields_registry.ArtifactApi

      Create artifact API.

      :return: Artifact API.


   .. py:method:: create_resource_management() -> yields_registry.ResourceApi

      Create resource API.

      :return: Resource API.


   .. py:method:: create_tag_management() -> yields_registry.TagApi

      Create tag API.

      :return: Tag API.



