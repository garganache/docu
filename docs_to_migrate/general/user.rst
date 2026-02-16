..
    label for referencing to this section

************
User profile
************

Check user profile
==================

Users can check their details within the platform, by means of the following steps:

1. Access "Your account" page from the upper right orange link as shown below.

   .. figure:: figs/user_profile_1.png
        :width: 80%
        :align: center
        :alt: alternate text

|

2. Navigate in the two sections of your account, namely ‘account details’ and 'authorization details'.

    *  Account details

    .. figure:: figs/user_profile_2.png
        :width: 80%
        :align: center
        :alt: alternate text

|

    *  Authorization details

       The authorization view shows you:

       *  The labels you have access to within the application (connected to one of the default :term:`User role - scope`).
       *  The possible actions you may perform on objects tagged with this label. For instance session: delete would mean that you can delete sessions generated from instances you have access to through the yields-group label.
       *  To modify account and authorization setup, please contact your platform administrator.

    .. figure:: figs/user_profile_3.png
            :width: 80%
            :align: center
            :alt: alternate text

    To return to the main view, use the green-highlighted arrow in the above view.

Change user settings
=======================

It is possible to edit the admin's user details and activate two-factor authentication by accessing the Keycloak
user interface.

As usual, login to the keycloak console and select 'manage account'.

.. figure:: figs/keycloak_admin_0.png
    :width: 80%
    :align: center
    :alt: alternate text


Then click on 'Personal info' where the admin can change email address, first name and last name.

.. figure:: figs/keycloak_admin_05.png
    :width: 80%
    :align: center
    :alt: alternate text

|

.. figure:: figs/keycloak_admin_1.png
    :width: 80%
    :align: center
    :alt: alternate text

The password can be changed, and two-factor-authentication enabled by going to 'account security' -> 'signing in'.

.. figure:: figs/keycloak_admin_2.png
    :width: 80%
    :align: center
    :alt: alternate text
