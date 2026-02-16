:py:mod:`yields.interfaces.tag`
===========================================

.. py:module:: yields-core.yields.interfaces.tag


Module Contents
---------------

Classes
~~~~~~~

.. autoapisummary::

   yields-core.yields.interfaces.tag.FreeTag
   yields-core.yields.interfaces.tag.Tag
   yields-core.yields.interfaces.tag.Taggable




.. py:class:: FreeTag(tag_id: uuid.UUID, name: str)


   Tag that can be linked to an object.

   :param tag_id: ID of the tag.
   :param name: Name of the tag.

   .. py:property:: id
      :type: uuid.UUID


      Retrieve tag ID.

      :return: ID of the tag.


   .. py:property:: name
      :type: str


      Retrieve tag name.

      :return: Name of tag.



.. py:class:: Tag(tag_id: uuid.UUID, object_id: uuid.UUID, name: str)


   Bases: :py:obj:`FreeTag`

   Tag that belongs to an object. Can be used to unlink it from its object, link it to additional objects, etc.

   :param tag_id: ID of the tag.
   :param object_id: ID of the object.
   :param name: Name of the tag.

   .. py:property:: object_id
      :type: uuid.UUID


      Retrieve ID of the linked object.

      :return: ID of the tags parent.



.. py:class:: Taggable(object_type: str, child_object_type: Optional[str] = None, parent_id: Optional[uuid.UUID] = None)


   Can be used to mark a resource as taggable.

   :param object_type: Type of the object.
   :param child_object_type: Type of the child object if applicable.
   :param parent_id: ID of the parent object if applicable.

   .. py:class:: TaggableInformation(object_type: str, child_object_type: Optional[str] = None, parent_id: Optional[uuid.UUID] = None)


      Provides information about an object type. This is used as a shortcut to provider information to the tagging
      mechanism.

      :param object_type: Type of the object.
      :param child_object_type: Type of the child object if applicable.
      :param parent_id: ID of the parent object if applicable.

      .. py:property:: object_type
         :type: str


         Retrieve the type of the object.

         :return: Type of the object.


      .. py:property:: child_object_type
         :type: Optional[str]


         Retrieve the type of the child object.

         :return: Type of the child object.


      .. py:property:: parent_id
         :type: Optional[uuid.UUID]


         Retrieve the parent ID.

         :return: ID of the parent.



   .. py:property:: id
      :type: uuid.UUID

      :abstractmethod:


      Retrieve object version ID.

      :return: ID of the object version.


   .. py:property:: tags
      :type: List[Tag]

      :abstractmethod:


      Retrieve a list of tags.

      :return: List of tags.


   .. py:property:: taggable_information
      :type: TaggableInformation


      Retrieve information about the taggable object.

      :return: Taggable object information.


   .. py:method:: tag(name: str) -> Optional[Tag]

      Retrieve a tag if it exists.

      :param name: Name of the tag.
      :return: Tag object if found.



