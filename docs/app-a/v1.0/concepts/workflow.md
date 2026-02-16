---
sidebar_label: Workflow
---

# Workflow in Yields for Performance

## General

The ultimate purpose for using Yields for Performance is to carry out quantitative model risk assessments and enable monitoring of the overall model's fit-for-purpose, while ensuring reproducibility and [Standardization](glossary.md#standardization).

On the one hand, Jupyter notebooks are used that define *how* the model should be assessed (i.e. which tests). These notebooks are to be scripted by the user and depend on the particular use case (model).

On the other hand, Yields for Performance takes care of the reproducibility, i.e. the relations between and versioning of the different [Application Objects](glossary.md#application-objects) used in a testing pipeline.

The screenshot below shows how a model risk expert might approach a model validation when using Yields for Performance.

![Yields for Performance Workflow](/img/app-a/Chiron_app_workflow.png)

Basically, what happens is the following:

1. The user creates an [Artifact](glossary.md#artifact) under which they can upload a datafile as an [Artifact Version](glossary.md#artifact-version).

2. The expert defines which analyses/tests they might want to run on any given combination of Artifacts. For this, Python notebook(s) are to be scripted. To get to a satisfying result, some iterations might be performed such that the notebook works correctly and according to expectations.

   The specifications serve as a user-defined template that can be applied on a multitude of comparable inputs. For example, a model's performance might be assessed on different geographies (countries). To allow standardization and a fair comparison between the model's performance on these different countries, the same template will be used and executed on data containing either country 1 data or country 2 data (these correspond to the two instances in the above figure).

   Note that this concept — i.e. specification as a blueprint to be applied for similar models — also paves the way to better standardization as it requires the data to be delivered in a robust and methodological manner.

3. To create tangible outputs from a specification, the notebooks should be executed, which means that the specification shall be executed onto their defined inputs. This creates an [Instance](glossary.md#instance) that can be run to get results.

   The output of the instance run — a so-called [Session](glossary.md#session) — is also stored inside an artifact.

:::note

- The output of one instance can easily be used as input for another instance (this is where the loop closes in the figure). Indeed, because these outputs are stored inside the datalake they can also easily be retrieved from it by other specifications.
- In case one wants to execute the pipeline on a recurrent basis, it suffices to add new data. If then all registered instances are executed one automatically gets to the model assessment report.

:::
