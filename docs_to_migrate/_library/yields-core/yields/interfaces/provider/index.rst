:py:mod:`yields.interfaces.provider`
================================================

.. py:module:: yields-core.yields.interfaces.provider


Module Contents
---------------

Classes
~~~~~~~

.. autoapisummary::

   yields-core.yields.interfaces.provider.ProviderFileInterface
   yields-core.yields.interfaces.provider.ProviderInInterface
   yields-core.yields.interfaces.provider.ProviderOutInterface
   yields-core.yields.interfaces.provider.ProviderDeleteInterface
   yields-core.yields.interfaces.provider.ProviderFactoryInterface




.. py:class:: ProviderFileInterface(provider: ProviderInInterface)


   Can be used to access the underlying resource.

   :param provider: The input provider that generated this resource.

   .. py:property:: url
      :type: str


      Shortcut to retrieve the url of this resource from the provider.

      :return: Url of the resource.


   .. py:property:: aliases
      :type: List[str]


      Shortcut to retrieve the aliases of this resource from the provider.

      :return: Alias of the resource.


   .. py:property:: alias
      :type: str


      Shortcut to retrieve the first alias of this resource from the provider.

      :return: First alias of the resource.


   .. py:property:: artifact_id
      :type: uuid.UUID


      Shortcut to retrieve the artifact ID from the provider.

      :return: ID of the artifact.


   .. py:property:: version_id
      :type: uuid.UUID


      Shortcut to retrieve the artifact version ID from the provider.

      :return: ID of the artifact version.


   .. py:method:: open() -> Any
      :abstractmethod:


      Retrieve an object that can be used to access the data of this resource. Preferably a file-like object.

      :return: Resource access object.



.. py:class:: ProviderInInterface(artifact_id: uuid.UUID, version_id: uuid.UUID, url: str)


   Infrastructure abstraction layer for reading from input artifacts.

   :param artifact_id: ID of the artifact.
   :param version_id: ID of the version.
   :param url: Url of the resource.

   .. py:property:: url
      :type: str


      Returns the url of the resource.

      :return: Url of the resource.


   .. py:property:: aliases
      :type: List[str]

      :abstractmethod:


      Returns a list aliases of the registered resource.

      :return: Alias of the resource.


   .. py:property:: alias
      :type: str

      :abstractmethod:


      Returns first alias of the registered resource.

      :return: Fist alias of the resource.


   .. py:property:: artifact_id
      :type: uuid.UUID


      Retrieve artifact ID.

      :return: ID of the artifact.


   .. py:property:: version_id
      :type: uuid.UUID


      Retrieve artifact version ID.

      :return: ID of the artifact version.


   .. py:method:: retrieve(alias: str) -> ProviderFileInterface
      :abstractmethod:


      Attempts to open a resource from a given url. Returns a provider file that can be used to access the underlying
      data regardless of the infrastructure the provider encapsulates.

      :param alias: Alias to retrieve.
      :return: Provider file for resource.



.. py:class:: ProviderOutInterface(artifact_id: uuid.UUID, alias: str)


   Infrastructure abstraction layer for writing to output artifacts.

   :param artifact_id: ID of the artifact.
   :param alias: Alias of the resource.

   .. py:property:: alias
      :type: str


      Returns the alias of the registered resource.

      :return: Alias of the resource.


   .. py:property:: artifact_id
      :type: uuid.UUID


      Retrieve artifact ID.

      :return: ID of the artifact.


   .. py:method:: retrieve_temporary_resource() -> Any
      :abstractmethod:


      Create or return a previously created temporary internal buffer object that can be filled with data. The
      temporary data buffer can later be persisted by calling `persist()`.

      :return: Buffer object.


   .. py:method:: persist_temporary_resource(version_id: uuid.UUID) -> str
      :abstractmethod:


      Persist the created temporary resource.

      :param version_id: ID of version.
      :return: Url of the resource.



.. py:class:: ProviderDeleteInterface(url: str)


   Infrastructure abstraction layer for deleting resources.

   :param url: Url of the resource.

   .. py:property:: url
      :type: str


      Returns the url of the resource.

      :return: Url of the resource.


   .. py:method:: delete()
      :abstractmethod:


      Attempts to delete the resource from a given url.



.. py:class:: ProviderFactoryInterface


   Factory for generating input and output providers.

   .. py:property:: name
      :type: str


      Name that describes the factory.

      :return: Name of the factory.


   .. py:method:: bind(parameter: str, value: Any) -> None
      :classmethod:


      Bind a parameter/value to the factory.

      :param parameter: Parameter name.
      :param value: Parameter value.


   .. py:method:: parameter(parameter: str, default: Optional[Any] = None) -> Optional[Any]
      :classmethod:


      Read a parameter from the factory. Can return None or default if parameter is undefined.

      :param parameter: Parameter name.
      :param default: Default value.


   .. py:method:: for_in(artifact_id: uuid.UUID, version_id: uuid.UUID, url: str) -> ProviderInInterface
      :abstractmethod:


      Create a new provider for input artifacts.

      :param artifact_id: ID of the artifact.
      :param version_id: ID of the version.
      :param url: Url of the resource.
      :return: Input provider.


   .. py:method:: for_out(artifact_id: uuid.UUID, alias: str) -> ProviderOutInterface
      :abstractmethod:


      Create a new provider for output artifacts.

      :param artifact_id: ID of the artifact.
      :param alias: Alias of the resource.
      :return: Output provider.


   .. py:method:: for_delete(url: str) -> ProviderDeleteInterface
      :abstractmethod:


      Create a new provider for deleting resources.

      :param url: Url of the resource.
      :return: Delete provider.


   .. py:method:: can_provide_for(url: str) -> bool
      :abstractmethod:


      Verifies whether this factory can generate a provider that is capable of working with a url.

      :param url: Url to match.
      :return: True if provider is compatible.


   .. py:method:: provider_matcher(session: yields-core.yields.session.Session, artifact: yields-core.yields.session.io.artifact.ArtifactDTO, version: yields-core.yields.session.io.artifact.ArtifactVersionDTO, urls: List[str]) -> List[ProviderInInterface]
      :abstractmethod:


      Shortcut to allow a provider to be used as a matcher. The providers have the option to expose a provider_matcher
      which artifacts call to match urls.

      :param session: The Session object.
      :param artifact: Artifact DTO to match.
      :param version: Version DTO to match.
      :param urls: Urls to match.
      :return: List of the input providers.



