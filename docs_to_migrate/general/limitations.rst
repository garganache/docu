..
    label for referencing to this section

.. _limitations:

Limitations
###########

Here, we offer a list of functionalities that limit to some extent the functionality that could be at disposal. Reasons for having these limitations
are one of the following:

* Third-party services limitations that are not known to the user
* Yields-owned limitations:

    * To disallow large operational incidents;
    * Temporarily limitations because of new feature that will get greater support during future releases.

We divide the limitations into different functionalities.

.. index::
   %dataset%: How to upload data?

***********
Data upload
***********

* Yields for Performance offers two different standardized ways of uploading .csv files to the server (either by the 'upload' functionality or through an SFTP-server).
  The **upload of .csv files through the Jupyter lab upload function (see screenshot) is not recommended**, since it does not guarantee the completeness of the file after upload.

    .. image:: figs/jupyter_upload.PNG
        :width: 50%
        :align: center
        :alt: alternate text

|

* Maximum size allowed of .csv files to be uploaded through 'upload' functionality is 4GB.

****************
Objects creation
****************

* For parameters, only type 'double', 'integer' and 'string' are allowed. If the user wants to use a dictionary as parameter
  he should have to create as string and do the conversion to a Python dictionary inside the notebook.


************
Session runs
************

* Maximum 2 sessions are executed in parallel on the platform. More sessions will have status 'pending'.
