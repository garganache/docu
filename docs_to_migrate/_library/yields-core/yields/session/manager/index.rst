:py:mod:`yields.session.manager`
============================================

.. py:module:: yields-core.yields.session.manager


Module Contents
---------------

Classes
~~~~~~~

.. autoapisummary::

   yields-core.yields.session.manager.Manager




.. py:class:: Manager(session: yields-core.yields.session.Session)


   The Manager interface provides tools to manage the current session.

   :param session: The Session object.

   .. py:method:: message(message: str)

      Set a status message for the current instance. This can be called multiple times. The last message is displayed
      in the UI.

      :param message: Message to be displayed.


   .. py:method:: retrieve_tags(target: uuid.UUID | yields-core.yields.interfaces.tag.Taggable, object_type: Optional[str] = None, child_object_type: Optional[str] = None, child_object_id: Optional[uuid.UUID] = None) -> List[yields-core.yields.interfaces.tag.Tag]

      Retrieve tags from target taggable object. Target can be UUID or Taggable object. If Taggable object is given
      there's no need to specify object_type. If UUID is given optional object_type, child_object_type and
      child_object_id can be provided.

      :param target: Target taggable object.
      :param object_type: Type of the target object.
      :param child_object_type: Type of the child object.
      :param child_object_id: UUID of the child object.
      :return: List of Tags.


   .. py:method:: clone_tags(source: uuid.UUID | yields-core.yields.interfaces.tag.Taggable, target: uuid.UUID | yields-core.yields.interfaces.tag.Taggable)

      Clone tags from source taggable object to target taggable object. Source and target can be UUID or Taggable
      object.

      :param source: Source taggable object.
      :param target: Target taggable object.


   .. py:method:: remove_tag(tag: str | uuid.UUID | yields-core.yields.interfaces.tag.Tag, target: Optional[uuid.UUID | yields-core.yields.interfaces.tag.Taggable] = None)

      Remove tag from taggable object. Tag can be a string, tag UUID or Tag object. Target can be UUID or Taggable
      object. Target is optional if a Tag object is given.

      :param tag: Tag to remove.
      :param target: Target taggable object.


   .. py:method:: link_tag(tag: str | uuid.UUID | yields-core.yields.interfaces.tag.FreeTag, target: uuid.UUID | yields-core.yields.interfaces.tag.Taggable)

      Link tag to a taggable object. Tag can be a string, tag UUID or Tag object. Target can be UUID or Taggable
      object.

      :param tag: Tag to link.
      :param target: Target taggable object.


   .. py:method:: find_tag(tag: str) -> yields-core.yields.interfaces.tag.FreeTag

      Retrieve a tag by name.

      :param tag: Tag name.
      :return: Tag if found.



