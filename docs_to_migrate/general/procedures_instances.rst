..
    label for referencing to this section

.. _instance_procedures:

Instances & Sessions
####################

As a prerequisite, the user should be able to:

* Get his dataset(s) into the platform - see :ref:`artifact_procedures`.
* Create the analysis of interest by means of defining an I/O structure and a notebook that carries out the analysis - see :ref:`specification_procedures`.

| So far, no persistence of results did come into play as all of the above steps were merely concerning the overall set-up of an appropriate 'analysis pipeline'.
| Enter the :term:`Instance` where the notebooks are run against some dataset of interest, thereby producing the analyses outcomes the user is been looking for!

.. index::
   %instance%: How to create an instance

.. _instance_creation:

******************
Create an instance
******************

An instance can be created in the following way:

1. Access the "Instances" menu and click on the "New" button and select 'Instance'
   (you can choose any folder to create the instance in - the example shows the 'myfolder' folder in purple. One can also
   move the instance to another folder afterwards - see :ref:`create_folder`).

.. figure:: figs/instance_create_1.png
    :width: 70%
    :align: center
    :alt: alternate text

|

2. A new wizard screen will be displayed where the user has to select the :term:`Specification` he wants to use. Press the 'use' button.
   Remember that by choosing the :term:`Specification` the I/O structure and the underlying notebooks are also determined.

.. figure:: figs/instance_create_2.png
    :width: 70%
    :align: center
    :alt: alternate text

|

.. warning::
   A specification only shows in the list when it has been 'marked as registered' - see :ref:`spec_mark_as_registered`.

|

Since the above requires the user to remember the name of the specification, which can be hard in case there are many of them, there is also the possibility to create an instance starting from the specification itself. This will immediately take the user to the next step of defining inputs.

.. figure:: figs/instance_create_21.png
    :width: 70%
    :align: center
    :alt: alternate text

|

3. Define the instance inputs.

   | Note that there are no degrees of freedom here, as it is the specification of choice that determines the I/O. We cannot longer change the ordering of the inputs, however, we still enable a collapsed view.
   | In fact, the user should do here exactly the same as he used to do when :ref:`spec_notebook`. The main difference is that at the level of the specification this input is temporarily, it now becomes versioned inside the platform.

.. figure:: figs/instance_create_3.png
    :width: 70%
    :align: center
    :alt: alternate text

|

   Let's briefly go over the meaning/structure of the information found in the input sections:

    * Blue frame:
      I/O technical type inside the platform from most generic to most specific.
      The most generic level is about being either an output or an input. The second level refers to one of the :term:`Application objects`.

    * Green frame:
      The object tag or alias as it was defined by the user at the time of the creation of the specification.
      This is also the name one shall use inside the specification script to retrieve from the backend.

    * Orange frame: dropdown field that allows user to select the actual object, already existing within the application.

      .. figure:: figs/instance_create_4.png
        :width: 70%
        :align: center
        :alt: alternate text

|

    Once all data has been defined, the user must click on the 'Next' button in the above screenshot.

4. Define the output.

   The only information the platform needs in this case is the name of the artifact that is going to be created once the instance is created. As long as the user didn't run the session (see :ref:`instance_running`), there will be no artifact *versions* created in this artifact.

  .. figure:: figs/instance_create_6.png
    :width: 100%
    :align: center
    :alt: alternate text

5. Define instance name and description and save.

   This is the name of the instance. A default naming is provided but the user can change this. By default, the :term:`Runtime` is also displayed.

  .. figure:: figs/instance_create_7.png
    :width: 80%
    :align: center
    :alt: alternate text

|

6. Organize your outputs

Once the user has clicked 'save' the following screen is shown, where the user is asked to organize the output artifacts into some dedicated folder(s).

  .. figure:: figs/instance_organize_output_1.png
    :width: 80%
    :align: center
    :alt: alternate text

|

If the user clicks 'maybe later', he will be shown the created instance.

  .. figure:: figs/instance_create_8.png
    :width: 80%
    :align: center
    :alt: alternate text

|

Checking the I/O tab, we can indeed see which artifacts will be used as input and which ones are created as output.

  .. figure:: figs/instance_create_9.png
    :width: 80%
    :align: center
    :alt: alternate text

|

If the user clicks 'organize now' - the following page is shown, where the user has the possibility to move either any of the outputs or all of them into some specific (already existing) folder.
By default, the artifacts will be created in the root folder.

  .. figure:: figs/instance_organize_output_2.png
    :width: 80%
    :align: center
    :alt: alternate text

|

Moving all outputs artifacts into the 'my_folder' folder makes it such that indeed the user does not have to move those artifacts at a later stage, helping him to better organize objects.

  .. figure:: figs/instance_organize_output_3.png
    :width: 80%
    :align: center
    :alt: alternate text

|

Moving all outputs artifacts into the 'my_folder' folder makes it such that indeed the user does not have to move those artifacts at a later stage, helping him to better organize objects.

  .. figure:: figs/instance_organize_output_4.png
    :width: 80%
    :align: center
    :alt: alternate text

|

If the user changes his mind and wants to reorganize all outputs associated to a given instance, he can navigate to the instance, click the triple dots and choose 'Organize outputs' - bringing the user back to the screen as shown before.

  .. figure:: figs/instance_organize_output_5.png
    :width: 80%
    :align: center
    :alt: alternate text

|


.. warning::
    Once the instance is created, the inputs can no longer be changed, except for the :term:`Parameter` input, see :ref:`edit_instance_param`.

|

.. _optional_inputs:

***************
Optional inputs
***************

When a given specification/instance has e.g. N inputs, it is no longer mandatory to associate/select a value for all N of them.

At the specification level
==========================

In the example below, one can open the specification in all of the following situations:

* artifacts chosen for ds1 and ds2 (=as previous);
* no artifact chosen for either ds1 or ds2;
* no artifacts chosen for both ds1 and ds2;

If, however, an artifact is chosen, it is required (this is validated) to select a corresponding version.

  .. figure:: figs/optional_inputs_1.png
    :width: 80%
    :align: center
    :alt: alternate text

|

On the Python side, when trying to access the optional (empty) artifact, it will say the artifact was **undefined**.

  .. figure:: figs/optional_inputs_2.png
    :width: 80%
    :align: center
    :alt: alternate text

|


At the instance level
=====================

During the creation of an instance, the number of inputs having actual values (and correspondingly the number of optional inputs) has to be chosen once and for all and is fixed from then onwards.
This means, once an instance is created, for every run of the instance, the user can only choose artifact versions for those artifacts that have been defined during instance creation.
Stated otherwise, the number of empty (it's no longer optional, since the choice has been made) inputs never changes between different sessions of a given instance.

As an example, take a spec with two inputs, and we create 4 instances from it, with all possible combinations of (optional) inputs.

  .. figure:: figs/optional_inputs_3.png
    :width: 80%
    :align: center
    :alt: alternate text

|

Taking the instance 'second_input_empty' in the example, one can see on the I/O that the artifact corresponding to alias 'ds2' has been chosen to stay empty - it says 'Not configured'.
Indeed, when trying to run the instance, the user is only provided version selection for the Titanic artifacts because the other input is indeed empty hence irrelevant.

  .. figure:: figs/optional_inputs_4.png
    :width: 80%
    :align: center
    :alt: alternate text

|

  .. figure:: figs/optional_inputs_5.png
    :width: 80%
    :align: center
    :alt: alternate text

|

.. _edit_instance_param:

************************
Edit instance parameters
************************

Parameters are often used to analyze the impact of a change in their values onto the analysis outcome. Examples of these are:

* sensitivity testing;
* changing ML hyperparameters.

In order to be able to keep a versioning of the change in parameters, the application allows the user to change the parameter values as compared to their default setting.
To do this click on the icon as shown in the screenshot. Change the parameter's values at will and click 'save changes'.

.. figure:: figs/edit_instance_param_1.png
    :width: 80%
    :align: center
    :alt: alternate text

|

The changes from the default values are then shown as in the screenshot below

.. figure:: figs/edit_instance_param_2.png
    :width: 80%
    :align: center
    :alt: alternate text

|

How the parameter value itself can be used inside the notebook is documented in :ref:`reading_param_vals`.

.. index::
   %instance%: How to run an instance

.. _instance_running:

**********************
Running of an instance
**********************

Selecting inputs
================

An instance can be run once it's created (see :ref:`instance_creation`), creating a so-called :term:`Session`. Following steps should be taken:

1. Access the "Instances" menu page and browse towards the instance you want to run.

2. The user has to click on the "Run" button.

.. figure:: figs/instance_run_1.png
    :width: 60%
    :align: center
    :alt: alternate text

|

| You will be presented with a screen that allows you to provide more details on the inputs that have been chose during instance creation time.
| For example, the user can now choose what version of the artifact should be used inside code. Note that at this point, the user is only passing metadata to the notebooks. It depends on the underlying code how this version is used for reading data - see also :ref:`library_io`.
| By default the freshest information is chosen for you automatically.
| Note that also for the other required inputs, the user needs to select proper values (for the :term:`Runtime`, the default runtime is prefilled).

.. figure:: figs/instance_run_2.png
    :width: 50%
    :align: center
    :alt: alternate text

|

3. When you finished you can click the blue Run Instance button and a :term:`Session` will be generated.


.. figure:: figs/instance_run_3.png
    :width: 40%
    :align: center
    :alt: alternate text

|

Then a second message will show when the job has succeeded. At this point, a session (failed or successful) appears within the instance card, as shown in the below screenshot.

.. figure:: figs/instance_run_4.png
    :width: 60%
    :align: center
    :alt: alternate text

|

.. note::

    * The :term:`Platform` will run the most recent version of the script registered as a version on the specification that you used to create the instance.
      If you need to modify the code you need to open the specification.
      Once the session has run, the results can then be inspected by following the steps described at :ref:`session_inspect`.

    * A user can stop all pending sessions and delete all existing sessions.

    .. figure:: figs/instance_run_5.png
        :width: 80%
        :align: center
        :alt: alternate text

|

    * A user can kill a session that is in execution

    .. figure:: figs/instance_run_6.png
        :width: 80%
        :align: center
        :alt: alternate text

|

.. index::
   %instance%: Instance sessions

***************************
Instance results: sessions
***************************

| The :term:`Session`\(s) created by the platform are now readily visible to the user and have their proper versioning.
| One can perform several actions on these so-called 'session cards'.

.. _session_inspect:

Inspect session
===============

Once the user has created an instance (see :ref:`instance_creation`) and ran it (see :ref:`instance_running`) the generated results (sessions) can be inspected.

1. Navigate to the instance of interest and click on its name to enter the instance details page. A list of all sessions generated by that instance will be displayed.

.. figure:: figs/job_inspect_2.png
    :width: 70%
    :align: center
    :alt: alternate text

|

2. Inspect the session of interest by clicking on the name of the session (by default this is the time of execution).

.. figure:: figs/session_inspect_0.png
    :width: 60%
    :align: center
    :alt: alternate text

|

3. The user can see session details, such as the attributes and the session UUID.

.. figure:: figs/session_inspect_1.png
    :width: 60%
    :align: center
    :alt: alternate text

|

4. The user can also inspect the UUID's of input and output artifact, the actual parameter value being used etc.

.. figure:: figs/session_inspect_2.png
    :width: 60%
    :align: center
    :alt: alternate text

|

In the figure below we depict most typical actions taken on a given session (blue primary, and secondary white buttons). Also, by clicking on the lightning bolt we have additional, sessions specific, actions.
We'll discuss all of them below.

.. figure:: figs/job_inspect_.png
    :width: 80%
    :align: center
    :alt: alternate text

|

.. index::
   %instance%: Interactively replaying a session

.. _interactive_replay:

Interactive replay of a session
===============================

This functionality is particularly useful for debugging purposes. When the user clicks on 'interactive replay', the underlying notebook that produced the session result shall be opened (in Jupyterlab).
This button is to be used to investigate interactively the results of the session, meaning that only the session data is loaded.
(as opposed to having the notebook opened under the specification where by default all dataset is loaded).

.. warning::
    The interactive session results are not saved once the notebook is closed.

|

HTML report
===========

When clicking on the session 'report', the user can choose to get an HTML report with or without code. The report itself will be rendered as a iframe.

.. figure:: figs/html_iframe.png
    :width: 60%
    :align: center
    :alt: alternate text

|

When the user wants to export the html outside the application, the user should go to Jupyterlab (e.g. by clicking on interactive replay).
Then, choose 'file' -> 'Save and export notebook as ' -> HTML. An HTML report will be downloaded to your local system.

.. figure:: figs/export_to_html.png
    :width: 60%
    :align: center
    :alt: alternate text

|

.. note::

    The code will be present in the generated report.

|

.. index::
   %instance%: Rerunning a session

.. _rerun_session:

Rerun a session
===============

This button is to be used when the specification's code has been adapted and the session outcome needs to be updated (edited).
In this way, it is avoided that the entire instance (and thus all sessions) need to be recreated.
Note that a new session will be created so the original is also kept (if not deleted by the user himself).

The subtle difference with 'interactive replay' is that 'Rerun' does create new sessions in the platform (and does also potentially writes into existing artifacts etc. - depending on the underlying I/O structure).

|

.. _view_logs:

View logs
=========

In case of having an error as the output of a session, the logs can be seen by clicking on the "Logs" option, under the lightning bolt

.. index::
   %instance%: Reviewing a session

.. _review_session:

Review a session
=================

When the user clicks on 'review' under the lightening bolt, the underlying notebook that produced the session result shall be opened (in Jupyterlab).
This notebook can then further be modified by the user, but **only in the markdown cells**. The cells in which any calculation
happened cannot be modified. In this sense, the review functionality is more restrictive as compared to the interactive replay (see :ref:`interactive_replay`).
This review functionality is particularly handy when the user wants to change his/her report although without the risk of contaminating the analyses results.


.. index::
   %instance%: Other instance properties and methods

*************************************
Other instance properties and methods
*************************************

Many other things can be done at the :term:`Instance`, similar to what is described in the :ref:`other_objects_methods` section.

1. Access the "Instance" menu page.
2. Either do one of the following:

    * Find the instance you want to edit and click on the three vertical dots.

      .. figure:: figs/instance_other_1.png
        :width: 50%
        :align: center
        :alt: alternate text

    * Click on the instance itself and find on the top right-hand side the same options, but now in a pictorial way.

      .. figure:: figs/instance_other_2.png
        :width: 50%
        :align: center
        :alt: alternate text

Things that can be performed:

    * viewing the :term:`Graph` to inspect the instance's relationship with other :term:`Application objects` - see :ref:`graph_view`.
    * sharing an instance with other users - see :ref:`sharing_an_object`.
    * copying an instance - see :ref:`copying_an_object`.
    * checking the instance's audit trail - see :ref:`viewing_audit_trail`.
    * deleting an instance - see :ref:`deleting_object`.
    * moving an instance - see :ref:`organizing_objects`.
    * reserving an instance - :ref:`reserve_object`.
    * organizing the instance outputs - :ref:`instance_creation`.
