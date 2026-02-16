---
sidebar_label: "Changelog"
---

# 2.13.0

Release date: January 30th 2026

## Bugs fixed

- YA-1925: Fix for pip_install for ephemeral kernels
- YA-1888: Kernel shutdown takes too long on YARN in 2.11
- YA-1960: Cannot delete trigger instances/sessions

## New features

- YA-1919: YfP session & health monitoring service
- YA-1910: Add ipylab library in Jupyter notebook
- YA-1899: Default roles should be created from the application.conf (except Admin)
- YA-1897: Add JSON as a parameter type to YfP
- YA-1894: Default runtimes should be parametrized by configuration

## Other tasks

None

## Retired features

None

# 2.12.0

Release date: December 5th 2025

## Bugs fixed

- YA-1760: inputs 'Not Configured' showing - UI needs refreshing

## New features

- YA-1837: Implement a Task Runner for Automated Job Execution - YfP slim version
- YA-1903: Mechanism to disable images through helm charts
- YA-1885: Python 3.10 kernel
- YA-1858: Mini Kernel new kernel option

## Other tasks

None

## Retired features

None

# 2.11.0

Release date: November 12th 2025

## Bugs fixed

None

## New features

- YA-1767: Add scheduling options in YfP UI for automated instance runs
- YA-1816: Automation script - transfer variables between steps
- YA-1825: Upgrade keycloak to latest version

## Other tasks

- Various vulnerabilities fixed.

## Retired features

- sas7bdat read support for Spark

# 2.10.0

Release date: October 27th 2025

## Bugs fixed

- YA-1798: jupyterlab - git change tab - git diff gets 404

## New features

- YA-1803: Upgrade base image to debian trixie

## Other tasks

- Various vulnerabilities fixed.

# 2.9.0

Release date: September 26th 2025

## Bugs fixed

- YA-1771: previous_versions doesn't return previous version of artifact
- YA-1773: Files downloaded from artifacts has different name than supposed to
- YA-1786: Default Kernel - stays in unknown status for a long period when started.

## New features

- YA-1764: BigQuery Data Provider Integration for YfP
- YA-1766: Collaborative editing of specifications in JupyterLab using git branching
- YA-1784: Git integration should use most recent jupyter git extension.
- YA-1813: Parametrize terminals config in jupyterlab config
- YA-1721: Upgrade Python dependencies

## Other tasks

Various vulnerabilities fixed.

# 2.8.0

Release date: September 2nd 2025

## Bugs fixed

- YA-1701: Unable to open interactive session- Jupyter
- YA-1695: Backend should respond with the correct header when answering a download request of a file.

## New features

- YA-1571: Kernel Image for Kernel as a Pod
- YA-1572: Kernel Image with required dependencies.
- YA-1570: Helm charts required to start a kernel as a pod
- YA-1711: Review helm charts for JEG are according to requirements.
- YA-1710: Custom kernels configuration for kernels as pods
- YA-1717: KIP cannot be used unless we have imagePullSecrets
- YA-1657: kubespawner tolerations
- YA-1578: Creation of kernel specific objects with default environment setup.
- YA-1577: Custom Kernel as Pod procedure.
- YA-1543: Compliance with AzurePolicies - azurepolicy-k8sazurev3readonlyrootfilesyst
- YA-1542: Compliance with AzurePolicies - azurepolicy-k8sazurev3allowedcapabilities
- YA-1529: Postgresql passwordless authentication with managed identity

## Retired features

None

## Other tasks

# 2.7.0

Release date: July 29 2025

## Bugs fixed

- YA-1684: Downloading not completely working for version 2.5.x

## New features

- YA-1688: application.conf of registry-auth and registry should be moved to values file.
- YA-1685: Add extra volume mounts to deployments / statefulsets.
- YA-1604: Smoke tests with setAcceptInsecureCerts on true
- YA-1541: Inconsistence in keycloak securityContext
- YA-1538: Compliance with AzurePolicies - azurepolicy-k8sazurev2blockautomounttoken
- YA-1527: Automate AD integration in Keycloak

## Retired features

None

## Other tasks

# 2.6.0

Release date: June 25 2025

## Bugs fixed

- YA-1472: inputs 'Not Configured' showing - UI needs refreshing
- YA-1667: Individual runtime config not rendering properly
- YA-1616: Initial cell cannot be ran after session idle timeout.

## New features

- YA-1131: Uploading large files - Request timeout encountered for request

## Retired features

None

## Other tasks

Fixing of vulnerabilities, sonarqube fixes and dependency upgrades as mentioned on the Service Desk.

# 2.5.2

Release date: May 21 2025

## Bugs fixed

None

## New features

- YA-1619: Do not show menu if resourcesShow is set to false in production.json. Default is True

## Retired features

None

## Other tasks

Fixing of vulnerabilities as mentioned on the Service Desk.

# 2.5.1

Release date: May 15 2025

## Bugs fixed

- YA-1469: (Re) running an instance does not show correct underlying specification
- YA-1566: Allow resource definition listing also for ResourceCreation Scope
- YA-1525: Open code selectors duplicate open of dropdowns
- YA-1482: Open code fails
- YA-1388: Runtime parsing url issues for enterprisegateway

## New features

- YA-1393: Choosing location for a copy of the output artifact
- YA-1338: Download artifact version scope
- YA-1432: Automatic reservation of draft specifications when opening code.
- YA-1521: YfP should work with Self-signed certificates

## Retired features

None

## Other tasks

Fixing of vulnerabilities as mentioned on the Service Desk.

# 2.5.0

Release date: April 25 2025

## Bugs fixed

- YA-1522: All pods have liveness and readiness
- YA-1552: Pip_install sometimes requires parameter verify_install = False

## New features

- YA-1314: Resources
- YA-1408: Warning when saving a file without an extension
- YA-1421: Ability to check used libraries in notebook.

## Retired features

- YA-1534: TOC for html report was removed

## Other tasks

Fixing of vulnerabilities as mentioned on the Service Desk.

# 2.3.2

Release date: February 14 2025

## Bugs fixed

- YA-1300: Copyright timestamp is outdated
- YA-1297: Specification not found exception when re-running a session
- YA-1282: Downloading a large csv in interactive replay fails.
- YA-1280: Instance run fails but in interactive replay it doesn't
- YA-1279: Artifact cannot be selected in case path is longer than width of dropdown window
- YA-1274: Image yieldsio/y-chiron-tests-selenium:2.3.6 not available on dockerhub
- YA-1271: e2e tests tests issues
- YA-1261: Search of instances and sessions is very slow.
- YA-1303: Renaming of Chiron App to Yields for Performance

## New features

None - since this is a hotfix.

However, with this new hotfix we have also released a new version of the Helm charts. These allow for adding Kubernetes secrets to environment variables that can be used in Specifications. See Helm Chart documentation on the Service Desk.

## Retired features

None - since this is a hotfix.

## Other tasks

Fixing of vulnerabilities as mentioned on the Service Desk.

# 2.3.1

## Enhancements/bug fixes

- Backward compatibility of the registry API with 2.1 version to ease migration process of python scripts and integrability with other Yields products
- Turn off python code highlighting when it does not follow some specific formatting. In previous version, allmost all code was yellow underlined because it was not obey some formatting rules
- Plotly figure rendering in Jupyter scripts is fixed
- Fix ability to rerun interactively a successful session of a reserved (or pre-installed) instance
- Fix ability to download an output artifact file from UI after creating it from instance run
- Change the default artifact version view to paginated views

## Backend / infrastructure

- Remove dummy users created when adding out of the box specifications
- Repository for JupyterLab is now exposed as Helm chart parameter and not hardcoded anymore
- Vulnerability fix for CVE-2024-29857, GHSA-xgfv-xpx8-qhcr, GHSA-5rxp-2rhr-qwq, CVE-2024-29857, CVE-2023-44487, CVE-2023-50387, various SENSITIVE DATA issues, GHSA-xpw8-rcwv-8f8p

# 2.3

## New features

- Share tags in the same way any other object can be shared
- Automated folder content sharing once folder is shared
- Define retention date for artifact version automated backend cleanup

## Enhancements/bug fixes

- When running code in JupyterLab, each user has its own dedicated environment where he/she can install any additional dependency without impacting any other user's session
- For artifact version creation, platform now only shows the files with accepted extension as explained in the documentation available in product UI
- List of tags displayed on a given object does not contain duplicate display of same tag anymore
- Application pentest access control remediation
    - Multiple Access Control Issues
        - GET POST /y-api/raw_data are secured with UploadFile scope
        - GET /y-api/sessions/&#123;id&#125;/seed_details is modified to validate session access to get session seeds
    - Access to other users files in JupyterHub/Lab: the end user can only see his/her own folders in the JupyterLab view and not other users' folders.

## Backend / infrastructure

- psand top utilities (commands) have been added to keycloak and analysis-package-docs images
- Akka is replaced by Pekko

# 2.2

## New features

- A wizard has been implemented that allows the user to define the location of the output artifacts belonging to an instance. All output artifacts can be moved simultaneously into a dedicated folder of choice, either during instance creation or afterwards.
- The same input artifact (including version + tags) can be associated to multiple aliases as input to a single specification or instance. Previously, each input had to be unique. Aliases should remain unique.
- Input artifacts have become optional, meaning one can pass empty values during 'open code' or instance run. This allows the same specification to be re-used in situations where the expected number of inputs cannot be anticipated upfront. Without this possibility the user would have to create new specifications for every combination of possible inputs making it difficult to manage.
- All description fields allow for markdown, including syntax highlighting for code.
- To run an instance, the user can select a particular version (git commit) of the underlying specification. The information of the specification 'minor' version is also displayed on the session attributes.
- During selection of artifacts, runtimes, specification versions ... a paginated selector combined with local search functionality is provided to easily find the artifact (version) you're interested in.
- Upon viewing the html report, a button is shown to enable the user to show the Table-of-Contents. By default, no ToC is shown.
- An extra 'run' button has been added on top of the page of the 'run instance dialog'. This is particularly useful if there are many inputs and the user agrees with the default values (most recent artifact version selected and parameter values as determined by the specification) and does not want to scroll down.
- When logging out of the application, the user is asked for confirmation and has the freedom to eventually go back to the application.
- Spark configuration can be changed from the UI by creating custom runtimes.

## Enhancements/bug fixes

- When an [Instance](glossary.md#instance) is shared amongst the users, the associated runtime is shared as well with the users (previously, the runtime had to be shared separately).
- Specification names can be changed from the UI without impacting the subsequent opening of the notebook in Jupyter lab.

## Backend / infrastructure

- Angular framework has been upgraded from v14 to v17 for enhanced security and more enhanced capabilities.
- Upgrade of entire Jupyter stack.
- When a new user is created in Keycloak, this user can immediately login into the application without having to wait for a given synchronization time between Keycloak and registry-auth.
- Security implementations as a result of application pentest.

# 2.1.1

## Enhancements/bug fixes

### Functional

- More documentation has been provided in which situations users can or cannot download files from the UI when clicking on the URL.
- More explicit documentation on expected behaviour in context of access tokens and refresh tokens.
- Fixed inconsistent behaviour between token exchange while in white UI vs being in a modal causing the user to be logged out when being long inside a modal. Related to previous bullet point.
- Some validation checks on uniqueness of artifact version names have been relaxed.
- While choosing your inputs during 'open code', the search when choosing an artifact version has been fixed.
- When clicking 'open code' again after first time (e.g. to choose different versions) the latest chosen values are prefilled automatically.
- The log format sent by the backend has been changed to have more clear logs.

### Other

- Vulnerability fixes

# 2.1

## New features

- To enable users to take further ownership of their data (e.g. clean-up, satisfy with GPDR regulation, save disk space etc.), we allow the deletion of artifact versions. Having the capability of deleting only versions, and not the entire artifact, means that existing instances that use some particular input artifacts can continue to be used (instead of having to recreate instances after deleting an entire artifact).
  All of the following is supported:

    - Single versions can be deleted;
    - Multiple artifact versions can be deleted in batch;
    - Deletion both from the local file system and HDFS are supported;
    - The possible impact on session reproducibility is also considered;

- We enable the users to limit the number of allowed actions on objects that they share with other users by having the capability to reserve an object.
  The main use case for this functionality is to keep better/more restrictive control on shared objects, for example:

    - within a group of quants, there's a single person responsible for a given notebook that shouldn't be touched by others quants. In theory, quant roles have the capability to edit code, but the reservation can restrict this action on the object that is reserved.
    - sharing code/results (sessions) between first line model developers and second line model validators.

  Reserved scopes are to be set application-wide from the backend.

- We allow the possibility to restrict the number of simultaneous UI sessions per user to 1. Meaning, if user A has logged in into the application using Google Chrome Browser, that same user will be disallowed to login from another webbrowser while still logged in into the other. This is particularly relevant from a security point of view. The configuration is optional and needs to be done by an admin.

## Enhancements/bug fixes

- Redesign of UI to make it consistent with Yields for Governance.
- Search by tags returns the objects when those are in a given subfolder.
- Multilevel folder bug fixed that lead to inability to 'open code'.

## Backend / infrastructure / domain model

- Upgrade of Keycloak to version 23 to allow for the limitation of the number of concurrent UI sessions per user to 1.

## Known issues and caveats

### Caveats of using tags for filtering

- risk of non-reproducibility: if tags are being used to produced certain outcomes, the same outcome will not be reproduced if the tag on an artifact version that is used for reading the data is deleted.
- The correction of the read of the data relies on the user being correct about the association of the tags to the versions.
- The user should understand the precedence of the filters and understand that the correction mechanism has higher precedence.
- Another problem of using tags to replace batchkey values is that a tag is associated to a user and a tag has a uuid - so we might end up in a situation where we have 2 tags with the same name belonging to 2 different users.

# 2.0

The CA 2.0 release is a major release aiming for a large simplification by reconsidering obsolete and/or duplicate concepts and simplifying the overall domain model.
For existing clients a migration path is established to cover for business continuity upon moving some already used concepts to the remaining ones.

## New features

- The user has the possibility to toggle between the default object card view and a list view of objects, rendering more objects on a single page in a paginated, tabular format.
- We extended the attributes that the objects can be sorted by. This should allow the user to navigate more easily amongst the objects.
- The total count of objects is now shown.
- The user can create an instance starting directly from a given specification object card (secondary action button). In this case, the user doesn't have to remember the specification's name to choose from when navigating to the instance menu and selecting the required specification.
- During the registration of an artifact version, the user has the option to mark a given version as being a correction of another - deemed erroneous - version. This 'correction attribute' can then be used to read only 'corrected' artifact versions. This to replace the sample level versioning that is removed by getting rid of Hudi.
- During instance run, the user has the possibility to select tags that can be interpreted by our Python API only to provide those artifact versions having all the tags associated.

## Enhancements/bug fixes

- The Python API has been redesigned to make it more user-friendly and readable. It's focus is more on reading metadata from the registry and not so much on loading actual data, for which open source capabilities can be leveraged. Moreover, the new API does abstract over over the underlying infrastructure, paving the way forward to better integration capabilities of 'Yields for Performance' with other technologies.
- A tooltip showing the full object name (including folder path) appears when hovering over an objects name when selecting it from a dropdown list. This is useful in case the full name - including the path - doesn't fit the screen.
- Autofill when sharing an object with a group is now working.
- Objects inside a folder structure with more than 3 levels render properly during 'open code' / 'run instance'.
- A message is thrown when the html report to be viewed (or an interactive session) is larger than xMB.
- The menu's 'Jupyter' and 'Help' have an icon indicating the user is navigating to a new tab in the browser.
- During the 'open code' the user can choose any particular artifact version for the selected artifact. Previously, the version could not be chosen. Also, now this is consistent with the 'run instance'.

## Backend / infrastructure / domain model

- Upgrade of services/libraries.

    - spark & pyspark = 3.4.1
    - hdfs= 3.3.6
    - python= 3.10
    - scala =2.13
    - pandas = 2.1.0
    - pyarrow = 13.0.0
    - tensorflow =2.11.1

- Datalake service is removed
- Removal of Hudi library that allowed to perform actions on the sample level.
- The following domain model objects have been removed:
    - model
    - data model mapping
    - dataset (artifacts should be used). For migrated datasets, the dataset validation, previously done by the datalake service, is now replaced by an instance run, taking an input and output artifact (the output corresponding to an actual 'ingestion' as it was called before). This allows for more transparency and enables the user to script his own pieces of code to be deemed relevant while uploading a file (e.g. technical schema, dimension check, ...)
    - freeform artifact (only 1 artifact type remains).
    - model instance artifact (only 1 artifact type remains).

- Removal of Python API allow reading/writing datasets.

## Known issues and caveats

### Caveats of using tags for filtering

- risk of non-reproducibility: if tags are being used to produced certain outcomes, the same outcome will not be reproduced if the tag on an artifact version that is used for reading the data is deleted.
- The correction of the read of the data relies on the user being correct about the association of the tags to the versions.
- The user should understand the precedence of the filters and understand that the correction mechanism has higher precedence.
- Another problem of using tags to replace batchkey values is that a tag is associated to a user and a tag has a uuid - so we might end up in a situation where we have 2 tags with the same name belonging to 2 different users.

# 1.21

## New features

- Users can tag objects ([Artifact](glossary.md#artifact) (including artifact versions), [Instance](glossary.md#instance) (including sessions)), that can be used to filter over when searching or retrieving a given object. Tags can be used both from within the UI as well as in a programmatically manner.
- The html-report of a session contains a table-of-contents to allow easier navigation for larger notebooks. It's up to the user to populate the ToC by using markdown cells prevailed with one or more #.

## Enhancements

- The user-interface design has been improved:

    - The top-action bar, in conjunction with the object's location, is fixed, so that scrolling down a page still enables the user to see the current folder location.
    - The menu-pane has been reordered such that 'similar' objects are more close one to another (e.g. dataset and artifact).
    - The initials of the first name and last name associated to the username are shown in the top-right-hand-side to better reflect as which user you ar logged in.
    - Redesign of object cards:

        - Typical object specific actions are depicted by either blue primary or secondary white buttons (e.g. 'register specification' is no longer hidden behind the triple dots).
        - Actions common to different objects (e.g. share, delete, copy, ...) on the object cards are put behind the triple dots.

    - breadcrumbs have been made consistent. From 4 levels onwards, the breadcrumbs will show.

- The user journey has been simplified/enhanced on the following points:

    - When creating a [Specification](glossary.md#specification), the user should no longer select an 'accepted model type' but can immediately start defining inputs.
    - When an [Instance](glossary.md#instance) is created, this instance should no longer be registered. It can immediately be executed ('run').
    - A Data Model Mapping can now be registered on itself (previously, a DMM could be registered only at the time of registering an instance).
    - The 'IsComparable' column is removed from the hybrid schema of a Data Model Mapping.
    - When importing a specification from json or copying an existing object, this object is created in the current folder (and no longer in the root folder).
    - When the user is working in Jupyterlab, this user remains logged in into the application (previously, after some time the user had to login again when going back to the UI).

## Backend / infrastructure

- Highest risk pentest vulnerabilities have been addressed.

- Following services have been upgraded:

    - Spark: 3.3.1
    - Hadoop: 3.3.4
    - Java: 11
    - Python: 3.10

- With spark 3.3.1 there is a new inference of timestamp and date formats. The formats that we test for and that previously were inferred as String and now are inferred as Timestamp are:

    - yyyy-MM-ddTHH:mm:ss.SSS
    - yyyy-MM-dd
    - yyyy-MM-dd HH:mm:ss
    - yyyy-MM-dd HH:mm:ss.S

- Following API's have been removed:

    ```
    /stages/&#123;id&#125;/register
    ```

- An image that executes the automated smoke test on the customer's site (on-prem) is now available.

## Known issues

- A user can unshare an object from himself. This on itself is as expected. However, after unsharing himself, the object that has been unshared still shows amongst the other objects. Refreshing the page solves the issue.

# Best practices

## Python scripting

Some of the steps taken when creating a pipeline should be seen as tools helping to achieve overall
transparency and robustness / lineage of your data and analyses flows.
Examples are:

- The data model mapping, with the hybrid schema. It gives a visual aid of what's input, output and target.
- The inference step when creating a dataset helps to define the technical types of the variables inside your dataset.

:::note
Both the technical types as well as the hybrid schema can be overruled inside the Jupyter notebooks.
While not strictly a problem for the reproducibility of the results (i.e. the notebooks themselved are stored under the sessions),
we do not recommend to bypass either the technical types or the hybrid schema as it obscures the data lineage from the UI.

For example, the user might inspect the hybrid schema from the DMM and think variable 'A' is an input. However, when inspecting the notebook
it turns out that the quant user has defined his own list of model inputs and it does not contain 'A'.

**Advice** if the user is intending to bypasss the DMM, we advice not to use a DMM at all.
:::

## Performance related

### Clear notebook outputs before running the instance

When the user is satisfied on the notebook content, probably by having it executed several times interactively,
the user might save the notebook before running it as an instance. However, before doing so, we strongly recommend to clear all the notebook outputs
that have been created during the interactive execution. In order to do so, in Jupyterlab and having the notebook opened, go to 'edit' -> 'clear all outputs'.
Then save the notebook.

### Close all kernels before closing the notebook

We strongly recommend to shut down the kernels before closing the notebooks such that those kernels are released
and at the disposal of other users (as from 1.20.0 onwards all kernels are automatically killed after 10 minutes of inactivity ) - see figure below.

![Close all kernels before closing the notebook](/img/app-a/kill_kernels.png)

### Setting the spark configuration

:::note
As from release 1.20 onwards the settings below are managed by the YARN configuration settings in the backend. This means the piece of code below shall be overruled by the YARN resource manager.
:::

When the Spark engine is used for computations, the user has the ability to change several
parameters in the configuration, by means of the code below.

As a prerequisite, the relevant modules should be loaded.

```
io.spark_config.update({
    "spark.cores.max":'4',
    "spark.driver.memory":'16g',
    "spark.driver.maxResultSize":'16g',
    "spark.executor.memory":'16g',
    "spark.executor.cores":'4',
    "spark.kryo.registrationRequired":'false',
    "spark.kryoserializer.buffer.max":"1024m"
})
```

:::warning
Unless the user experiences performance issues, it is not recommended to change the default configuration.
:::
