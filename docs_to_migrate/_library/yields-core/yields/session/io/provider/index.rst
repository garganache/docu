:py:mod:`yields.session.io.provider`
================================================

.. py:module:: yields-core.yields.session.io.provider


Module Contents
---------------

Classes
~~~~~~~

.. autoapisummary::

   yields-core.yields.session.io.provider.ProviderDictionary




.. py:class:: ProviderDictionary


   Dictionary of providers. It auto registers system-installed providers.

   .. py:method:: by_name(name: str) -> list[yields-core.yields.interfaces.provider.ProviderFactoryInterface]

      Returns a list of providers by name.

      :param name: The name of the provider.
      :return: A list of providers.


   .. py:method:: register(factory: yields-core.yields.interfaces.provider.ProviderFactoryInterface) -> uuid.UUID

      Register a factory that can generate providers.

      :param factory: Factory of provider to register.
      :return: Unique id of the registered factory.


   .. py:method:: remove(uid: uuid.UUID) -> bool

      Unregister a provider factory.

      :param uid: Unique id of factory to unregister.


   .. py:method:: provides(url: str) -> Tuple[uuid.UUID, yields-core.yields.interfaces.provider.ProviderFactoryInterface]

      Return first found provider that can open a given resource.

      :param url: Url of resource to open.



