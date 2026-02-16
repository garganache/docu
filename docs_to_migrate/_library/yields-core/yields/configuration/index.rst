:py:mod:`yields.configuration`
==========================================

.. py:module:: yields-core.yields.configuration


Package Contents
----------------

Classes
~~~~~~~

.. autoapisummary::

   yields-core.yields.configuration.Configuration




.. py:class:: Configuration


   Bases: :py:obj:`pydantic_settings.BaseSettings`

   Yields configuration. It reads configuration overwrites from .env files and the environment variables.

   .. py:property:: registry_url
      :type: str


   .. py:attribute:: model_config

   .. py:attribute:: context_id
      :type:  Optional[uuid.UUID]
      :value: None


   .. py:attribute:: registry_hostname
      :type:  str
      :value: 'registry'


   .. py:attribute:: registry_port
      :type:  int
      :value: 9000


   .. py:attribute:: kernel_client_id
      :type:  str
      :value: ''


   .. py:attribute:: kernel_client_secret
      :type:  str
      :value: ''


   .. py:attribute:: kernel_oidc_host_url
      :type:  str
      :value: ''


   .. py:attribute:: refresh_token
      :type:  str

   .. py:attribute:: verbosity
      :type:  VerbosityEnum

   .. py:attribute:: yields_version
      :type:  str

   .. py:attribute:: registry_version
      :type:  str

   .. py:attribute:: statistics_import_instrumentation
      :type:  bool
      :value: False



