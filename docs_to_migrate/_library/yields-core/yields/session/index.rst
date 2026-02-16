:py:mod:`yields.session`
====================================

.. py:module:: yields-core.yields.session


Subpackages
-----------
.. toctree::
   :titlesonly:
   :maxdepth: 3

   io/index.rst
   remote/index.rst


Submodules
----------
.. toctree::
   :titlesonly:
   :maxdepth: 1

   exceptions/index.rst
   manager/index.rst
   obfuscated/index.rst
   registry/index.rst


Package Contents
----------------

Classes
~~~~~~~

.. autoapisummary::

   yields-core.yields.session.Session




.. py:class:: Session(context_id: Optional[uuid.UUID] = None)


   Bases: :py:obj:`yields-core.yields.interfaces.tag.Taggable`

   The Session object represents a Chiron platform session.

   .. py:property:: runtime
      :type: SessionRuntime


      Retrieve a session runtime object that can be used to obtain information such as runtime ID, runtime name,
      runtime tags, etc.

      :return: Session runtime.


   .. py:property:: instance
      :type: SessionInstance


      Retrieve a session runtime object that can be used to obtain information such as runtime ID, runtime name,
      runtime tags, etc.

      :return: Session instance.


   .. py:property:: io
      :type: io.IO


      Retrieve session io interface.

      :return: Interface for session io.


   .. py:property:: remote
      :type: remote.Remote


      Retrieve session remote interface.

      :return: Interface for additional services.


   .. py:property:: manager
      :type: manager.Manager


      Retrieve session manager.

      :return: Interface to manage the session.


   .. py:property:: direct
      :type: registry.Registry


      Retrieve registry API client that can be used to call the registry API directly.

      :return: Interface to API client.


   .. py:property:: configuration
      :type: yields-core.yields.configuration.Configuration


      Retrieve configuration manager that can be used to access configuration parameters.

      :return: Configuration dictionary.


   .. py:property:: name
      :type: str


      Retrieve session name.

      :return: Name of session.


   .. py:property:: id
      :type: uuid.UUID


      Retrieve object version ID.

      :return: ID of the object version.


   .. py:property:: tags
      :type: List[yields-core.yields.interfaces.tag.Tag]


      Retrieve a list of tags.

      :return: List of tags.



