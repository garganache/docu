---
sidebar_label: "End-to-End Examples"
---

# General

In this section we enable the user to start using Yields for Performance by providing some use cases,
including the relevant datasets, jupyter notebook, readme etc. The main goal is to offer some
specific end-to-end use cases such that the user gets familiar with all steps to be taken in creating
his own model risk assessments in Yields for Performance.

:::note
All notebooks are implemented and documented such that they can be generically applied onto any given
input of the same 'family', i.e. 'specification as a template'. We encourage the users to use those notebooks as a
starting point for further analyses.
:::

## Datasets

Many of the notebooks offered below have been tested on the following datasets (and those should also work on any other dataset).
The datasets can be found <a href="/downloads/DataSets.zip" download>here</a>.

## Assessment (validation) of a binary target model

### Vanilla model assessment of a binary target model

This is in fact what is happening in the [end-to-end example](getting-started.md).

### Model assessment including representativeness

In this example you will add another step as compared to the basic workflow. Specifically, we will calculate some preliminary metrics on the train dataset and store those inside a [Artifact](../concepts/glossary.md#artifact).
During the second step, the model assessment, we will load this precalculated metrics to assess the representativeness between our application data (i.e. the data on which
the model is applied in production) and the original dataset on which the model has been trained.

You will learn the following (on top of the basic example):

* how to save / load artifacts (including .csv and .json file)
* some methodologies to assess the similarity between datasets.

![Validation Binary Medium workflow](/img/app-a/Validation_Binary_Medium_workflow.png)

All relevant files are stored here: <a href="/downloads/Binary_Target_Medium_Assessment.zip" download>click here to download</a>.

### Model assessment including a benchmark model

In this example you will add another step as compared to the previous workflow.
Specifically, we will create a benchmark (challenger) model and save it.
During the second step, the model assessment, we will load this trained challenger model during our model assessment to compare the performance of both the model at hand and the challenger model.

You will learn the following (on top of the previous flows):

* training a basic benchmark model using scikit-learn.
* saving / loading the trained model (.pickle file) into an artifact.

![Validation Binary Full workflow](/img/app-a/Validation_Binary_Full_workflow.png)

All relevant files are stored here: <a href="/downloads/Binary_Target_Full_Assessment.zip" download>click here to download</a>.

:::note
It is up to the user to define the workflows as per the needs. For example, in the above set-up, the model assessment template contains
duplicate pieces of code, in which certain metrics are calculated for both the model at hand at the benchmark model. This has the benefit that the figures can be placed on top of each other,
making the comparison between the models easier. The drawback off course is duplicate code. An alternative workflow is depicted in the figure below, where both the model at hand and the benchmark model are fed separately to the same
template that now does not contain duplicate code. The disadvantage here is that both models are overlayed only at monitoring time, but on the other hand the model assessment can be used more generically (i.e. not all datasets contain a
benchmark model prediction, meaning that certain pieces of code cannot be used in the more general setting).

![Validation Binary Full workflow alternative](/img/app-a/Validation_Binary_Full_workflow_ALTERNATIVE.png)
:::

## Data quality assessment of a tabular dataset

The quality of any model (prediction) relies heavily on the quality of the data that is fed into the model (both for training the model and application). This is the
often-heard 'garbage-in, garbage-out' statement. A notebook providing some DQ checks is provided.
The 6 dimensions of data quality are described and the generic tests are provided. Use-case specific tests (e.g. validity or accuracy) are to be scripted by the user.
We will save a data quality dictionary, as well as an enriched dataset with additional outlier information. The latter can be used fo example to conduct a model performance analysis on the inliers/outliers (see [Vanilla model assessment of a binary target model](#vanilla-model-assessment-of-a-binary-target-model)).

![Workflow Outlier DQ](/img/app-a/Workflow_Outlier_DQ.png)

All relevant files are stored here: <a href="/downloads/DataQuality.zip" download>click here to download</a>.

## Model transparency (explainability)

As many model predictions nowadays are the result of complex underlying methodologies (e.g. deep neural networks) it is of
utmost importance that both the end-user making decisions based on this prediction and the model developer
are comfortable that those complex models behave in an manner that can be compared with human intuition.

We offer a notebook in which we can upload any given model trained as a scikit-learn pipeline. The question 'why the given model does make certain predictions' - explainability - is then
analyzed by all of the following techniques (of which the pro's and con's are discussed in the notebook itself):

* Feature importance: which model variables do contribute most in making a prediction?
* Individual Condition Expectation and partial dependency: how do predictions change as we change one feature value at a time. This is sometimes also named a 'sensitivity test'.
* Shapley values: how much does each model variable contribute to a given prediction (as compared to the average model prediction)?

As many of the above methods are model agnostic, they can be equally well applied to more simple models such as linear regression, logistic regression, ... In fact we strongly encourage to try these techniques
onto any model within a model assessment exercise.

![XAI workflow](/img/app-a/XAI_workflow.png)

All relevant files are stored here: <a href="/downloads/XAI.zip" download>click here to download</a>.
