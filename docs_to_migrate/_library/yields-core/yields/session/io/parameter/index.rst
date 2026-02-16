:py:mod:`yields.session.io.parameter`
=================================================

.. py:module:: yields-core.yields.session.io.parameter


Module Contents
---------------

Classes
~~~~~~~

.. autoapisummary::

   yields-core.yields.session.io.parameter.Parameter




.. py:class:: Parameter(session: yields-core.yields.session.Session, alias: str)


   Parameters are user defined input variables.

   :param session: The Session object.
   :param alias: Alias of the parameter.

   .. py:property:: name
      :type: str


      Retrieve parameter name.

      :return: Name of the parameter.


   .. py:property:: value
      :type: float | int | str | bool


      Retrieve parameter value.

      :return: Value of the parameter.


   .. py:property:: description
      :type: str


      Retrieve parameter description.

      :return: Description of the parameter.


   .. py:method:: list(session: yields-core.yields.session.Session) -> List[str]
      :classmethod:


      Retrieve a list of available aliases.

      :param session: The Session object.
      :return: List of aliases.



