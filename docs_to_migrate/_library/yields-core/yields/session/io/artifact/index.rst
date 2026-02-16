:py:mod:`yields.session.io.artifact`
================================================

.. py:module:: yields-core.yields.session.io.artifact


Module Contents
---------------

Classes
~~~~~~~

.. autoapisummary::

   yields-core.yields.session.io.artifact.ArtifactInput
   yields-core.yields.session.io.artifact.ArtifactOutput




Attributes
~~~~~~~~~~

.. autoapisummary::

   yields-core.yields.session.io.artifact.ArtifactDTO
   yields-core.yields.session.io.artifact.ArtifactVersionDTO
   yields-core.yields.session.io.artifact.ProviderMatcher
   yields-core.yields.session.io.artifact.FilterResolver


.. py:type:: ArtifactDTO
   :canonical: yr.ArtifactDTO | yr.SessionExecutionInputArtifactDTO | yr.SessionExecutionOutputArtifactDTO


   Artifact DTO.


.. py:type:: ArtifactVersionDTO
   :canonical: yr.ArtifactVersionDTO | yr.SessionExecutionArtifactVersionDTO


   Artifact version DTO.


.. py:type:: ProviderMatcher
   :canonical: Callable[['Session', ArtifactDTO, ArtifactVersionDTO, List[str]], List[ProviderInInterface]]


   Provider matcher callable.


.. py:type:: FilterResolver
   :canonical: Callable[['Session', Dict[str, List[str]], 'ArtifactInput'], bool]


.. py:class:: ArtifactInput(session: yields-core.yields.session.Session, alias: Optional[str] = None, artifact_id: Optional[uuid.UUID] = None, version_id: Optional[uuid.UUID] = None, match_provider: Optional[ProviderMatcher | yields-core.yields.interfaces.provider.ProviderFactoryInterface] = None, filter_resolver: Optional[FilterResolver] = None)


   Bases: :py:obj:`Artifact`

   Input artifact for accessing data within the artifact.

   :param session: The Session object.
   :param alias: Alias of artifact.
   :param artifact_id: ID of the artifact.
   :param version_id: ID of the artifact version.
   :param match_provider: Callable that can override the mechanism that matches urls to providers.
   :param filter_resolver: Callable that can override the mechanism that filters tags.

   .. py:property:: alias
      :type: str


      Retrieve artifact alias.

      :return: Alias of the artifact.


   .. py:property:: name
      :type: str


      Retrieve artifact name.

      :return: Name of the artifact.


   .. py:property:: id
      :type: uuid.UUID


      Retrieve artifact ID.

      :return: ID of the artifact.


   .. py:property:: signature
      :type: Dict[str, Any]


      Retrieve artifact signature.

      :return: Signature of the alias.


   .. py:property:: files
      :type: List[str]


      Retrieve a list of the available files inside artifact.

      :return: List of files.


   .. py:property:: tags
      :type: List[yields-core.yields.interfaces.tag.Tag]


      Retrieve a list of tags.

      :return: List of tags.


   .. py:property:: version
      :type: ArtifactVersion


      Retrieve the artifact version object that can be used to obtain information such as creation time, commit time,
      version ID, version name, version tags, etc.

      :return: Artifact version.


   .. py:method:: list(session: yields-core.yields.session.Session) -> List[str]
      :classmethod:


      Retrieve a list of available aliases.

      :param session: The Session object.
      :return: List of aliases.


   .. py:method:: file(alias: str) -> yields-core.yields.interfaces.provider.ProviderFileInterface

      Retrieve a representation of the file inside the artifact.

      :param alias: Alias of the file to retrieve.
      :return: Provider file that can access the specified file alias inside the artifact.


   .. py:method:: previous_versions(filter_resolver: Optional[FilterResolver] = None) -> List[ArtifactInput]

      Retrieve a list of previous versions of this artifact taking into account corrections and filter tags.

      :param filter_resolver: Callable that can override the mechanism that filters tags.
      :return: List of previous versions.


   .. py:method:: history() -> List[yields-core.yields.interfaces.provider.ProviderFileInterface]

      Retrieve the files inside the artifact including the previous versions taking into account corrections.

      :return: List of files inside artifact including previous versions.


   .. py:method:: matcher(match_provider: ProviderMatcher)

      Re-matches the urls with a given provider.

      :param match_provider: Callable that can override the mechanism that matches urls to providers.



.. py:class:: ArtifactOutput(session: yields-core.yields.session.Session, alias: Optional[str] = None, artifact_id: Optional[uuid.UUID] = None)


   Bases: :py:obj:`Artifact`

   Output artifact for writing data to the artifact.

   :param session: The Session object.
   :param alias: Alias of the artifact.
   :param artifact_id: ID of the artifact.

   .. py:property:: alias
      :type: str


      Retrieve artifact alias.

      :return: Alias of the artifact.


   .. py:property:: name
      :type: str


      Retrieve artifact name.

      :return: Name of the artifact.


   .. py:property:: id
      :type: uuid.UUID


      Retrieve artifact ID.

      :return: ID of the artifact.


   .. py:property:: signature
      :type: Dict[str, Any]


      Retrieve artifact signature.

      :return: Signature of the alias.


   .. py:property:: files
      :type: List[str]


      Retrieve a list of the available files inside artifact.

      :return: List of files.


   .. py:property:: tags
      :type: List[yields-core.yields.interfaces.tag.Tag]


      Retrieve a list of tags.

      :return: List of tags.


   .. py:method:: list(session: yields-core.yields.session.Session) -> List[str]
      :classmethod:


      Retrieve a list of available aliases.

      :param session: The Session object.
      :return: List of aliases.


   .. py:method:: file(alias: str, provider_factory: Optional[yields-core.yields.interfaces.provider.ProviderFactoryInterface] = None) -> Any

      Returns a buffer that can be written to. The provider factory is used to later persist the data.

      :param alias: Alias of the file.
      :param provider_factory: Provider factory to use.
      :return: Buffer object that can be written to.


   .. py:method:: previous_versions() -> List[ArtifactInput]

      Retrieve a list of previous versions of this artifact taking into account corrections.

      :return: List of previous versions.


   .. py:method:: save(name: Optional[str] = None, correction_of: Optional[ArtifactVersion | uuid.UUID] = None) -> Optional[ArtifactInput]

      Persists all date in output artifacts created via `file()` call. Automatically saves changes made to the
      signature. Can be called multiple times to create more than one version given that is at least one file created
      between each call.

      :param name: Name of the artifact version.
      :param correction_of: ID of the version this is a correction of.
      :return: The resulting artifact.


   .. py:method:: save_signature()

      Save changes made to the signature without creating a new artifact version.



