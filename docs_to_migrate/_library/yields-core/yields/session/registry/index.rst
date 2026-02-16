:py:mod:`yields.session.registry`
=============================================

.. py:module:: yields-core.yields.session.registry


Module Contents
---------------

Classes
~~~~~~~

.. autoapisummary::

   yields-core.yields.session.registry.Registry




.. py:class:: Registry(session: yields-core.yields.session.Session, context_id: Optional[uuid.UUID] = None)


   The Registry interface provides direct access to the Registry API.

   :param session: The Session object.
   :param context_id: ID of the context.

   .. py:property:: data_management
      :type: yields_registry.RawDataApi


      Direct access to data API.

      :return: Data API.


   .. py:property:: instance_management
      :type: yields_registry.StageInstanceApi


      Direct access to instance API.

      :return: Instance API.


   .. py:property:: session_management
      :type: yields_registry.StageSessionApi


      Direct access to session API.

      :return: Session API.


   .. py:property:: artifact_management
      :type: yields_registry.ArtifactApi


      Direct access to artifact API.

      :return: Artifact API.


   .. py:property:: resource_management
      :type: yields_registry.ResourceApi


      Direct access to resource API.

      :return: Artifact API.


   .. py:property:: tag_management
      :type: yields_registry.TagApi


      Direct access to tag API.

      :return: Tag API.


   .. py:property:: context_id
      :type: Optional[uuid.UUID]


      Retrieve ID of the current context.

      :return: ID of the context.


   .. py:property:: instance_id
      :type: uuid.UUID


      Retrieve ID of the current instance.

      :return: ID of the instance.


   .. py:property:: session_id
      :type: uuid.UUID


      Retrieve ID of the current session.

      :return: ID of the session.


   .. py:property:: is_save_enabled
      :type: bool


      Verify if save is enabled.

      :return: True if save is enabled.


   .. py:property:: is_interactive
      :type: bool


      Verify if running in open code mode.

      :return: True if instance is open code.


   .. py:property:: is_open_code
      :type: bool


      Verify if running in open code mode.

      :return: True if instance is open code.


   .. py:property:: is_interactive_replay
      :type: bool


      Verify if running in interactive replay mode.

      :return: True if instance is interactive replay.


   .. py:property:: context
      :type: yields_registry.SessionConfigDTOV2m3


      Retrieve context configuration of the current session.

      :return: Context configuration of current session.


   .. py:property:: session
      :type: yields_registry.StageSessionDTOV2m3


      Retrieve instance session configuration of the current session.

      :return: Configuration of current instance session.


   .. py:method:: check_is_open_code_incompatible(eve_to_use: loguru.logger) -> bool

      Returns true if change is incompatible and issues warning.

      :return: True if incompatible.



