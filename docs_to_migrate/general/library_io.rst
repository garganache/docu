.. index::
    %notebook%: IO

.. _library_io:

##
IO
##

As a prerequisite, the relevant modules should be loaded (see :ref:`pre_modules`).

.. _reading_param_vals:

**********
Parameters
**********

For parameters defined when creating a specification (see :ref:`create_spec`), their attributes can be retrieved inside
a notebook by the following code:

.. code:: python

    # retrieve an array of all parameter aliases as specified by the UI
    params = session.io.parameters

    # for each parameter, print the name, value, description and type
    for alias in params:
        # retrieve the actual parameter by alias
        param = session.io.parameter(alias)
        print(f"name: {param.name}, value: {param.value}, desc: {param.description}, type: {type(param.value)}")

The :code:`parameter.name` attribute is the alias defined by the user during the creation of a specification.

.. _loading_libraries:

*********
Installing libraries
*********


- When you are using the `Python Kubernetes Container` or `Python Mini Kubernetes Container` or any other Kubernetes specific kernel you can install via :

.. code:: python

    pip install <package-name> --extra-index-url https://USERNAME:PASSWORD@your-private-repo.com/simple


The --extra-index-url is optional and above is inserted just as an example.  If using it make sure that you keep the USERNAME and  PASSWORD in the :term:`Resource` object.

- When you are using `Individual Kernels`, it is possible to install libraries on the fly. You can first of all install pip packages via

.. code:: python

    yields_utils.kernel.pip_install(target, verify_install, print_stdout, no_deps, verify_install_target, upgrade, delete_from_modules)

where the attributes are
* target is a string which is the name of the package. Note that you can also add a version number such as "some_package==1.0.1".
* verify_install is a boolean which will check whether the package was installed. Default is false.
* print_stdout is a boolean to indicate whether you want to print the pip output.
* no_deps is a boolean that, when True, will stop dependencies to be installed.
* verify_install_target is an optional string that verifies the install target. This should be the name to import. Default value is empty.
* upgrade will upgrade the package even if another version is installed, see pip --upgrade option. Default is false.
* delete_from_modules takes a list of strings that will be deleted from sys.modules to allow overriding a pre installed package.

Why delete the modules from sys.modules? Some packages such as numpy will not be properly upgraded unless this is done.
This only happens for packages that are already installed at a different version on kernels that come with preinstalled packages.

Example for replacing numpy:

.. code:: python
    pip_install("numpy>=2", print_stdout=True, delete_from_modules=["numpy"])


You can also install a whl file from an artifact. This works via

.. code:: python

    yields_utils.kernel.install_from_artifact(target, print_stdout, no_deps)


.. _loading_artifacts:

*********
Artifacts
*********

In this part we cover two aspects of reading/writing data:

* Reading artifacts and artifact versions metadata as well as creating artifact versions.
* Reading and writing actual data using providers.

We offer two default methods of retrieving artifact versions, that we believe are useful in most situations. When the
user chooses an artifact version from the UI, the user can only retrieve:

* The artifact version that was chosen (see :ref:`mode_single`).
* A list of all artifact versions previous to the chosen one (see :ref:`mode_history`).

The actual reading of the data, either through an append mode or something else, is up to the user. In this regard, the
library supports the user in retrieving a list of artifact versions, i.e. to get metadata from the registry. Also, the
user is not obligated to use either of the above ways of retrieving the artifact versions of interest. These are the two
ways the library offers, but the user is free to devise their own logic.

.. _mode_single:

Retrieving a specific artifact version
======================================

The :term:`Artifact Version` that is chosen from the UI can be read as follows:

.. code:: python

    # retrieve the artifact using alias determined in the ui
    artifact = session.io.input("given_alias")

    # retrieve the first file in the given artifact version; indexed by [0]
    artifact_file = artifact.file(artifact.files[0])

.. caution::

    If the user has chosen a tag in the UI for the filter (:ref:`spec_notebook`), the following applies:

    * If the chosen artifact version has the tag: nothing happens, the artifact will be read as if no tag was chosen.
    * If the chosen artifact version does **not** have the tag: nothing will be returned (the call to retrieve will
      raise an exception).
    * In case of multiple tags selected, only artifact versions having all of them (AND tag1 AND tag2 etc.) shall be
      returned.

    The tags with serve the purpose of an additional filter over the :term:`Artifact Version`\(s) to be read.

.. _mode_history:

Retrieving all previous artifact versions
=========================================

.. seealso::

    In order to understand the behaviour of how an artifact can be read, please read carefully and understand the
    following sections as they all contribute to how the data is read:

    * :ref:`Correcting an existing artifact version`
    * :ref:`tag_procedure`
    * :ref:`spec_notebook`

Sometimes, it can be useful to have an aggregated view in which all data from all artifact versions is gathered.
Beginning from the :term:`Artifact Version` that is chosen from the UI, all previous versions can be retrieved as
follows:

.. code:: python

    # retrieve the artifact using alias determined in the ui
    artifact = session.io.input("given_alias")

    # loop over previous_versions to retrieve the previous artifact versions
    for previous_version in artifact.previous_versions():
        print("ARTIFACT")
        print(f"Name: {previous_version.name}")
        print(f"Files: {previous_version.files}")
        print(f"Signature: {previous_version.signature}")
        print(f"Version commited at: {previous_version.version.commited_at}")
        print(f"Version created at: {previous_version.version.created_at}")
        print(f"Version name: {previous_version.version.name}")

The expected behaviour is the following, taking into account the correction mechanism and tag session filter by tags
(both act as filters over the versions to be loaded):

* Any artifact version that is marked as correction will be excluded from the results.
* If the user selects filter tags, only artifact versions having those tags associated shall be returned by the previous_versions.
  However, retrieving the specific version of the artifact as mentioned earlier, will fail if the specific version does not carry the tag.
  The tags during 'open code' - see :ref:`spec_notebook` - serve the purpose of an additional filter over the
  :term:`Artifact Version`\(s) to be read.
* In case of multiple tags selected, only artifact versions having all of them (AND tag1 AND tag2 etc.) shall be
  returned.

.. caution::

    The following are considered caveats when using tags to filter over which artifact versions are read:

    * When the tags on input artifacts are used to read the data, dissociating the tag from the artifact version will
      result into non-reproducible session outcomes.
    * Same outcome as the previous bullet point applies when the name of the tag is changed.
    * The 'corrected attribute' has higher precedence as compared to the tags. For example, if there is an artifact
      version that is corrected and has a tag that is selected in the session filter, the result of using the above
      piece of code will be that the version is not included (because correction has higher precedence).

If the user only wants to get the files, and not the artifact version, the following can be used:

.. code:: python

    print(f"Previous version files: {[file.alias for file in artifact.history()]}")

It is up to the user to open the files and append them accordingly.

Getting/setting the artifact signature
======================================

.. code:: python

    output_artifact = session.io.output("given_alias")
    print(f"Old signature: {output_artifact.signature}")
    output_artifact.signature = f"{datetime.datetime.now()}"
    print(f"New signature: {output_artifact.signature}")


Copying artifact to another location
====================================

.. code:: python

   from yields_utils.io import copy_artifact_data
   from pathlib import Path

   artifact = some_artifact.save()
   copy_artifact_data(artifact, Path(session.io.parameter("copy_to")))


************
Reading data (Spark is efficient for files bigger than 100 MB)
************

.. _reading_data_fs:

From the local file system
==========================

Not using Spark
---------------

The idea of thr library is to provide the user easy access to the file. From that point onwards, it's up to the user to
actually read the data using existing open source libraries.


.. code:: python

    # retrieve the artifact using alias determined in the ui
    artifact = session.io.input("given_alias")

    # retrieve the first file in the given artifact version; indexed by [0]
    artifact_file = artifact.file(artifact.files[0])

    # retrieve a file-like object that can be used in most open-source libraries
    file_buffer = artifact_file.open()

Then, assuming some common file types, we have the following in which above file handler can be passed:

.. code:: python

    # assuming csv file
    csv_data = pd.read_csv(file_buffer)

    # assuming json file
    json_data = json.load(file_buffer)

    # assuming pickle file
    unpickled_data = pickle.load(file_buffer)


.. _ws_fs:

With Spark
----------

Say we have a datafile that is stored on the local file system, yet we want to manipulate it in a distributed fashion,
so we want to read it using Spark. Note that in the below piece of code, we assume the artifact contains only one csv
file, hence the '0' index. If artifact contains multiple files, one can select the appropriate file index by inspecting
first the artifact list attribute ('artifact.files') that will return a list of all files in the artifact.

.. code:: python

    from yields.providers.spark import ProviderFactorySpark, PersistenceFormat

    # retrieve the artifact using alias determined in the ui
    artifact = session.io.input("given_alias", ProviderFactorySpark())

    # retrieve file "some.csv" from the given artifact version
    some_csv = artifact.file(artifact.files[0])

    # retrieve a spark dataframe
    df = some_csv.dataframe(PersistenceFormat.CSV)

So, instead of using the :code:`.open()` method; the :code:`.dataframe()` should be used where the format of the file to
be read needs to be passed.

From HDFS
=========

Not using Spark
---------------

The code to read from HDFS is virtually the same as the local file system (see :ref:`reading_data_fs`).

.. _ws_hdfs:

With Spark
----------

When the user has for example a parquet file that he wants to read from HDFS, the Spark provider should be used as
Parquet files are tightly associated to Spark. The HDFS provider does not know how to handle special file formats.
Note that in the below piece of code, we assume the artifact contains only one parquet file, hence the '0' index.
If artifact contains multiple files, one can select the appropriate file index by inspecting first the artifact list
attribute ('artifact.files') that will return a list of all files in the artifact.

.. code:: python

    from yields.providers.spark import ProviderFactorySpark, PersistenceFormat

    # retrieve the artifact using alias determined in the ui
    artifact = session.io.input("given_alias", ProviderFactorySpark()))

    # retrieve file "some.parquet" from the given artifact version
    some_parquet = artifact.file(artifact.files[0])

    # retrieve a spark dataframe
    df = some_parquet.dataframe(PersistenceFormat.PARQUET)

***********************************
Appended read for migrated datasets
***********************************

During transition from 1.21.x to 2.0 the dataset object has been migrated to an artifact in which every dataset
ingestion has been mapped onto an artifact version. Where before the user could read all dataset ingestions appended, we
now leave it up to the user to actually read the data (we do provide some methods to provide a list of artifact versions
though - see :ref:`mode_history`). However, for the migrated datasets (that are persisted on HDFS), the following piece
of code can be used to read the migrated datasets (now artifacts) appended:

.. code:: python

    from urllib.parse import urlparse, urlunparse

    from yields.computation.spark import SparkOnYarn
    from yields.providers.spark import ProviderFactorySpark, PersistenceFormat

    # retrieve the artifact using alias determined in the ui
    artifact = session.io.input("given_alias_of_migrated_dataset", ProviderFactorySpark())

    # there are 2 mechanisms to read; one is using the spark api directly and another one is through the yields library
    def read_with_yields_library():
            df = None
            for version in artifact.previous_versions():
                print(version)
                version.matcher(ProviderFactorySpark())

                for ingestion in version.files:
                    if df is not None:
                       df = df.union(version.file(ingestion).dataframe(PersistenceFormat.PARQUET))
                    else:
                       df = version.file(ingestion).dataframe(PersistenceFormat.PARQUET)

            return df

    def read_with_spark_urls():
        hostname = os.environ.get("HADOOP_NAMENODE_HOSTNAME", "namenode")
        port = os.environ.get("HADOOP_NAMENODE_PORT", "8020")

        def add_hostname_port(url, hostname, port):
            parsed_url = urlparse(url)
            new_netloc = f"{hostname}:{port}"
            updated_url = urlunparse((
                parsed_url.scheme,
                new_netloc,
                parsed_url.path,
                parsed_url.params,
                parsed_url.query,
                parsed_url.fragment
            ))

            return updated_url

        versions_url = []
        for version in artifact.previous_versions():
            print(version)
            version.matcher(ProviderFactorySpark())

            for ingestion in version.files:
                versions_url.append(add_hostname_port(version.file(ingestion)._provider.url, hostname, port))

        return SparkOnYarn().session.read.parquet(*versions_url)

************
Writing data (Spark is efficient for files bigger than 100 MB)
************

While the reading of input artifacts does not depend on specific provider (with the exception of the Spark provider
which needs to be explicitly specified), for writing we always need to specify one.

To the local file system
========================

Not using Spark
---------------

.. code:: python

    # import the provider to save to the local file system
    from yields.providers.filesystem import ProviderFactoryFilesystem

    # retrieve the artifact using alias determined in the ui
    output_artifact = session.io.output("given_alias")

    # add a file "test" to the artifact version - this will show in the ui
    # .file() takes a file name and a provider and it returns a buffer that can be written to
    write_buffer = output_artifact.file("test", ProviderFactoryFilesystem())

    # write data to the buffer
    # SEE NEXT CODE BLOCK

    # save will persist the data written in the buffer to the infrastructure specified by the provider
    output_artifact.save()

Different file types can be written, assuming we have declared a file to write into.

.. code:: python

    # writing a string, bytes are used to write as this format is used for most infrastructures
    write_buffer.write(b"some string")

    # saving a pickle file
    pickle.dump(your_object, write_buffer)

    # saving a json file
    json.dump({'data': 5}, write_buffer)

    # saving a pandas dataframe as a csv file
    df.to_csv(write_buffer, index=False)

    # saving a zip file
    with zipfile.ZipFile(write_buffer, "a", zipfile.ZIP_DEFLATED, False) as zip_file:
        zip_file.writestr("file1.txt", "file value 1")
        zip_file.writestr("file2.txt", "file value 2")

With Spark
----------

See :ref:`write_to_hdfs_with_spark`.

To HDFS
=======

Not using Spark
---------------

.. code:: python

    from yields.providers.hdfs import ProviderFactoryHdfs

    # retrieve the artifact using alias determined in the ui
    output_artifact = session.io.output("given_alias")

    # add a file "test" to the artifact version - this will show in the ui
    write_buffer = output_artifact.file("test", ProviderFactoryHdfs())

    # write a simple string into the file 'test'
    write_buffer.write(bytes(f"Written at {datetime.datetime.now()}", "utf-8"))

    # transform pandas dataframe to csv
    df.to_csv(write_buffer, index=False)

    # save will persist the data written in the buffer to hdfs
    output_artifact.save()

The provider has to be passed only when creating the file. The actual writing of the csv file is identical to writing
it to the local file system as all logic is determined by the Provider.

.. _write_to_hdfs_with_spark:

With Spark
----------

When using Spark, the proper information on how where to store the file and in what format needs to be passed. The piece
of code below shows how to save a Pandas dataframe as Parquet file on HDFS.

.. code:: python

    from yields.providers.spark import ProviderFactorySpark, PersistenceFormat, PersistenceMedium

    write_buffer = output_artifact.file("file", ProviderFactorySpark())
    write_buffer.dataframe(spark_dataframe_to_save, PersistenceMedium.HDFS, PersistenceFormat.PARQUET)
    output_artifact.save()

* PersistenceFormat can be either .CSV or .PARQUET.
* PersistenceMedium can be either .HDFS or .FS (Filesystem).

**************************
BigQuery Artifact Versions Usage
**************************

**BigQueryProviderImpl** is the platform provider used to read BigQuery tables as artifacts.

1. Authentication Setup
------------------------

Before using any BigQuery provider, bind the credentials to all BigQuery providers in the session:

.. code-block:: python

    for provider in session.io.providers.by_name("BigQuery"):
        provider.bind("credentials", auth)

This ensures every **BigQueryProviderImpl** instance can access BigQuery with the given credentials.

One way to store and access the credentials (`auth` in the example above) is via **Resources**.

2. Create and Save an Output Artifact
-------------------------------------

Create an output artifact, attach a file backed by the BigQuery provider, and define a query pointing to your dataset:

.. code-block:: python

    from yields.providers.bigquery import ProviderFactoryBigQuery

    artifact = session.io.output("ds")
    file = artifact.file("query_some_table", ProviderFactoryBigQuery())
    file.query("example-project-475111", "SELECT * FROM `example.some_table`")
    new_artifact = artifact.save()

At this stage, an artifact version is persisted.
It contains a URL referencing the BigQuery query (no data is materialized yet).

- ``example-project-475111`` is the GCP project key
- ``SELECT * FROM example.some_table`` is the desired query

3. Reading Data
---------------

You can later read the data in two ways:

**a. Using the saved reference**

.. code-block:: python

    df = new_artifact.file("query_some_table").dataframe()

**b. Using an alias**

If the artifact was registered as an input alias:

.. code-block:: python

    artifact = session.io.input("input_artifact")
    df = artifact.file("query_some_table").dataframe()

``.dataframe()`` returns a **pandas DataFrame**, which can have memory overhead.
For large datasets, use the row iterator ``.rows()``:

.. code-block:: python

    for x in artifact.file("query_some_table").rows():
        print(x)

You can also pass a custom **QueryJobConfig** to both ``dataframe()`` and ``rows()``:

.. code-block:: python

    def dataframe(self, job: Optional[bigquery.QueryJobConfig] = None) -> DataFrame:
        ...
    def rows(self, job: Optional[bigquery.QueryJobConfig] = None) -> RowIterator:
        ...

For example, to disable the query cache:

.. code-block:: python

    from google.cloud import bigquery

    artifact = session.io.input("input_artifact")
    df = artifact.file("query_some_table").dataframe(
        job=bigquery.QueryJobConfig(use_query_cache=False)
    )

********************
Artifact corrections
********************

During the creation of an output artifact version, the user has the possibility to indicate this version being a
correction of a previous version (see :ref:`Correcting an existing artifact version`).

.. code:: python

    from yields.providers.filesystem import ProviderFactoryFilesystem

    # retrieve the artifact using alias determined in the ui
    output_artifact = session.io.output("given_alias")

    # create two artifact versions to illustrate that we can retrieve previous versions
    # it is required to mention which previous version the user wants to correct
    output_artifact.file("test1.txt", ProviderFactoryFilesystem()).write(b"test1 text")
    output_artifact.save()
    output_artifact.file("test2.txt", ProviderFactoryFilesystem()).write(b"test2 text")
    output_artifact.save()

    # saving a third version that is a correction of the previous one
    output_artifact.file("test2.txt", ProviderFactoryFilesystem()).write(b"test2 text corrected")

    # save using the correction_of argument. the uuid or the version of the 'to be corrected'
    # version needs to be passed, here it's done using previous_version()
    output_artifact.save(correction_of=output_artifact.previous_versions()[-1].version)

The result is shown in the screenshot below where the correction of UUID is clearly depicted.

.. figure:: figs/correction_of_python.png
    :width: 80%
    :align: center
    :alt: alternate text

|

**********************
Create a Spark session
**********************

.. note::

    Files from either the local filesystem or HDFS can already be read as Spark dataframes, see :ref:`ws_fs` and :ref:`ws_hdfs`. The code below is considered useful only in case user wants to create a Spark dataframe from scratch.


If the user wants to create a Spark session, e.g. to manually construct his own Spark dataframe, this can be done as follows:

.. code:: python

    from yields.computation.spark import SparkOnYarn
    soy: SparkOnYarn = SparkOnYarn()
    spark = soy.session

    from datetime import datetime, date
    from pyspark.sql import Row

    df = spark.createDataFrame([
        Row(a=1, b=2., c='string1', d=date(2000, 1, 1), e=datetime(2000, 1, 1, 12, 0)),
        Row(a=2, b=3., c='string2', d=date(2000, 2, 1), e=datetime(2000, 1, 2, 12, 0)),
        Row(a=4, b=5., c='string3', d=date(2000, 3, 1), e=datetime(2000, 1, 3, 12, 0))
    ])
