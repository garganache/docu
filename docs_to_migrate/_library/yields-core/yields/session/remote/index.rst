:py:mod:`yields.session.remote`
===========================================

.. py:module:: yields-core.yields.session.remote


Submodules
----------
.. toctree::
   :titlesonly:
   :maxdepth: 1

   exceptions/index.rst
   resource/index.rst
   stream/index.rst


Package Contents
----------------

Classes
~~~~~~~

.. autoapisummary::

   yields-core.yields.session.remote.Remote




.. py:class:: Remote(session: yields-core.yields.session.Session)


   Remote facilitates access to user defined input/output and parameters.

   :param session: The Session object.

   .. py:property:: resources
      :type: List[str]


      Retrieve list of resource artifacts.

      :return: List of resource names.


   .. py:method:: resource(name: str) -> resource.Resource

      Retrieve resource artifact by name.

      :param name: Name of resource.
      :return: Output artifact.



