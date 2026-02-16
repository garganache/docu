:py:mod:`yields.session.remote.resource`
====================================================

.. py:module:: yields-core.yields.session.remote.resource


Module Contents
---------------

Classes
~~~~~~~

.. autoapisummary::

   yields-core.yields.session.remote.resource.Resource




.. py:class:: Resource(session: yields-core.yields.session.Session, name: Optional[str] = None, resource_id: Optional[uuid.UUID] = None)


   Resource for accessing fields within platform defined resources.

   :param session: The Session object.
   :param name: Name of resource.
   :param resource_id: ID of the resource.

   .. py:property:: name
      :type: str


      Retrieve resource name.

      :return: Name of the resource.


   .. py:property:: description
      :type: str


      Retrieve resource description.

      :return: Description of the resource.


   .. py:property:: id
      :type: uuid.UUID


      Retrieve resource ID.

      :return: ID of the resource.


   .. py:property:: fields
      :type: List[str]


      Retrieve a list of fields available in the resource.

      :return: List of fields inside the resource.


   .. py:method:: hide(text: AnyStr) -> AnyStr
      :classmethod:


      Obfuscates protected values in given text.

      :param text: The text to obfuscate protected values in.
      :return: The obfuscated text.


   .. py:method:: list(session: yields-core.yields.session.Session) -> List[str]
      :classmethod:


      Retrieve a list of available names.

      :param session: The Session object.
      :return: List of names.


   .. py:method:: field(name: str) -> HiddenStr | str

      Retrieve a field from the resource.

      :param name: Name of the field to retrieve.
      :return: Value of field inside the resource.



