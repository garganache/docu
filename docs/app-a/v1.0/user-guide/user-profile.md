---
sidebar_label: "User Profile"
---

# User Profile

## Check User Profile

Users can check their details within the platform, by means of the following steps:

1. Access "Your account" page from the upper right orange link as shown below.

   ![Access your account page](/img/app-a/user_profile_1.png)

2. Navigate in the two sections of your account, namely 'account details' and 'authorization details'.

   - Account details

   ![Account details](/img/app-a/user_profile_2.png)

   - Authorization details

     The authorization view shows you:

     - The labels you have access to within the application (connected to one of the default [User role - scope](../concepts/glossary.md#user-role---scope)).
     - The possible actions you may perform on objects tagged with this label. For instance session: delete would mean that you can delete sessions generated from instances you have access to through the yields-group label.
     - To modify account and authorization setup, please contact your platform administrator.

   ![Authorization details](/img/app-a/user_profile_3.png)

   To return to the main view, use the green-highlighted arrow in the above view.

## Change User Settings

It is possible to edit the admin's user details and activate two-factor authentication by accessing the Keycloak
user interface.

As usual, login to the keycloak console and select 'manage account'.

![Keycloak admin console](/img/app-a/keycloak_admin_0.png)

Then click on 'Personal info' where the admin can change email address, first name and last name.

![Keycloak personal info](/img/app-a/keycloak_admin_05.png)

![Keycloak personal info form](/img/app-a/keycloak_admin_1.png)

The password can be changed, and two-factor-authentication enabled by going to 'account security' -> 'signing in'.

![Keycloak account security](/img/app-a/keycloak_admin_2.png)
