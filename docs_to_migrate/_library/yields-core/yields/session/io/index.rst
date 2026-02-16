:py:mod:`yields.session.io`
=======================================

.. py:module:: yields-core.yields.session.io


Submodules
----------
.. toctree::
   :titlesonly:
   :maxdepth: 1

   artifact/index.rst
   exceptions/index.rst
   parameter/index.rst
   provider/index.rst


Package Contents
----------------

Classes
~~~~~~~

.. autoapisummary::

   yields-core.yields.session.io.IO




.. py:class:: IO(session: yields-core.yields.session.Session)


   IO facilitates access to user defined input/output and parameters.

   :param session: The Session object.

   .. py:property:: providers
      :type: provider.ProviderDictionary


      Retrieve dictionary of providers.

      :return: Provider dictionary.


   .. py:property:: parameters
      :type: List[str]


      Retrieve list of parameters.

      :return: List of parameter aliases.


   .. py:property:: inputs
      :type: List[str]


      Retrieve list of input artifacts.

      :return: List of input aliases.


   .. py:property:: outputs
      :type: List[str]


      Retrieve list of output artifacts.

      :return: List of output aliases.


   .. py:method:: parameter(alias: str) -> Optional[parameter.Parameter]

      Retrieve parameter by alias.

      :param alias: Alias of the parameter.
      :return: Parameter if valid.


   .. py:method:: input(alias: str, match_provider: Optional[artifact.ProviderMatcher | yields-core.yields.interfaces.provider.ProviderFactoryInterface] = None, filter_resolver: Optional[artifact.FilterResolver] = None) -> Optional[artifact.ArtifactInput]

      Retrieve input artifact by alias. If the artifact has no files, None will be returned.

      :param alias: Alias of the input.
      :param match_provider: Override the normal provider matching behaviour.
      :param filter_resolver: Callable that can override the mechanism that filters tags.
      :return: Input artifact if valid.


   .. py:method:: output(alias: str) -> artifact.ArtifactOutput

      Retrieve output artifact by alias.

      :param alias: Alias of output.
      :return: Output artifact.



