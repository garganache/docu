---
sidebar_label: "Admin Guide"
---

# Admin functionalities

## Users and user groups

### Create a new user

When a new user needs to be granted access to the application, we first need to create such user. This can be
done following the steps below.

1. Log in to the Keycloak administration console by navigating to https:// **your_application_platform_URL** /y-keycloak/admin/#/yields. Fill in the admin username and password.

![Keycloak login](/img/app-a/keycloak_new_user_3.png)

2. Click on the "Users" button. Make sure you are on the Yields realm, but this should be already the case if the above URL is used.

![Users button](/img/app-a/keycloak_new_user_35.png)

3. Click on the "Add user" button.

![Add user button](/img/app-a/keycloak_new_user_375.png)

4. Fill out user data and save it.

The user has to fill out the "Username" and click on the Save button.
The "Username" is the only mandatory field, but it is also recommended to fill out the "Email",
"First Name" and "Last Name" fields.

![Fill out user data](/img/app-a/keycloak_new_user_6.png)

5. Set a temporary password.

Navigate, for the given user to the 'credential' tab and add a password.

![Credential tab](/img/app-a/keycloak_new_user_70.png)

Fill in the "Password" and "Password Confirmation" fields. Keep the "Temporary" flag "ON" to
force the user to set a new password when logging in for the first time.

![Set temporary password](/img/app-a/keycloak_new_user_7.png)

### Disable/delete a user

In case the admin does not longer want a user to be able to access the application, he should do the following:

1. Access keycloak admin console - https:// **your_application_platform_URL** /y-keycloak/admin/#/yields
2. Go to users and select the user to be deactivated.

To **disable a user**:

* Switch the toggle button 'User Enabled' to off.
* Save at the bottom of the page.

![Disable user toggle](/img/app-a/user_deactivate_1.png)

The user can indeed no longer access the application.

![User disabled confirmation](/img/app-a/user_deactivate_2.png)

After the keycloak synchronization, the admin can still see the user in the list of people inside the application, however with the status 'Suspended'.

![Suspended user status](/img/app-a/user_deactivate_3.png)

To **delete a user**:

1. Go the user's menu and click on 'delete' for the user you want to delete.

![Delete user menu](/img/app-a/user_deactivate_4.png)

2. After doing so:

    * This user is entirely removed from keycloak.

    * After keycloak synchronization, the admin can no longer see the user in the 'people' menu inside the application, i.e. the user is deleted inside the application as well.

    * Trying to login as the deleted user, a message is shown that either the username or password is invalid, indicating this user does not exist (which is different from disabling the user as shown before).

![Deleted user login attempt](/img/app-a/user_deactivate_5.png)

### Create a new group

For the meaning of the concept group, see [User group](../concepts/glossary.md#user-group).

1. Access the Keycloak user interface (https:// **your_application_platform_URL** /y-keycloak/admin/#/yields).
Access the 'groups' page and click on the "create group" button.

![Create group button](/img/app-a/new_group_1.png)

2. Fill in the group name and save it.

* In keycloak itself the group is seen to exist immediately.
* In the application UI, the group will be seen after synchronization period.

![Group created](/img/app-a/new_group_3.png)

### Assign user to a group

Any user should be assigned to a given [User group](../concepts/glossary.md#user-group). This can be done as follows:

1. Access the Keycloak user interface (https:// **your_application_platform_URL** /y-keycloak/admin/#/yields). Go users and look for the user
you want to assign to a group, see screenshot below.

![Find user](/img/app-a/group_user_2.png)

Click on the user, go to tab 'groups'. From there, you can choose which group(s) you want to assign the user to by clicking 'join' and select the group.

![User groups tab](/img/app-a/group_user_1.png)

![Select group](/img/app-a/group_user_3.png)

As an alternative, one can also navigate to the group of interest, and go to the 'members' tab to inspect current members and also add new members to this group.

![Group members tab](/img/app-a/group_user_4.png)

### Enable automatic sharing of objects within a group

Once the administrator assigned the users to some groups in keycloak (see [Assign user to a group](#assign-user-to-a-group)),
he can allow the users within a single group to have all the objects shared automatically (i.e. without the need to share the object manually as explained in [Sharing an object](../user-guide/object-operations.md#sharing-an-object)).
This can be done as follows:

1. From the platform UI, go to the organization menu -> people. Look for the user of which you want that the objects he will be creating should be automatically shared ('user1' in the screenshot below).
Click on the three vertical dots and choose 'view groups'.

![View groups menu](/img/app-a/share_with_group_1.png)

2. By default, the objects are *not* shared automatically but can only be seen by the user himself.

![Default sharing off](/img/app-a/share_with_group_2.png)

3. By clicking the radio button next to the group of interest all objects created by this user will then be shared automatically with all the members of this group.
Note that only a single group can be selected at a time.

![Enable automatic sharing](/img/app-a/share_with_group_3.png)

## Roles & scopes

### Creating a new role

Besides the available default [User role - scope](../concepts/glossary.md#user-role---scope)(s), as an administrator, one is free to create customized roles.
This can be done as follows:

1. Go to 'create role' on the top right-hand-side, to be found under 'organization/roles' menu. Click on this button.

![Create role button](/img/app-a/create_role_1.png)

2. Enter a new role name and a description. The latter probably already hints towards the scope (permissions) this role will be assigned.

![Enter role details](/img/app-a/create_role_3.png)

3. Press 'create role' an the newly defined user will show between the other roles.

![Role created](/img/app-a/create_role_4.png)

### Assign role to a user

Before a user is able to login into Yields for Performance - see [Create a new user](#create-a-new-user) - he needs to be assigned a specific role.
Every user role implies its own user permissions (through their 'scope') on what can be done in the platform.

To alter a user's permission by assigning him to a different (or new) role, take the following steps:

1. Click on 'people' under the 'Organization' menu. Select the user of interest and click on the three dots at the right-hand-side and choose 'change role'.

![Change role menu](/img/app-a/assign_role_1.png)

2. Select a role for the user.

![Select role](/img/app-a/assign_role_4.png)

:::note

* Upon a fresh installation of the application (no upgrade), new users are assigned the read-only role by default.
* If a user is assigned a new role, he will be removed automatically from the current role.

:::

### Change scope, download role logs and active users

The administrator can change the scope of the different roles,
meaning that also the user's permission of the roles of having this scope will change.

To change the scope of a given role, take the following steps:

1. Go to the role of which you want to change the scope.
It can be found under the 'organization/roles' menu. Click on 'manage scopes' (see screenshot below).

![Manage scopes button](/img/app-a/change_scope_1.png)

2. All possible permissions for every role are shown, but one can toggle the switches to
allow or deny permission to some functionalities.
Note that the names of the permissions are assumed to be speaking for themselves.

Once you are satisfied with the defined scope, exit the page with the cross on the top right hand side.

![Toggle permissions](/img/app-a/change_scope_2.png)

:::note

Companies might want to leverage internally existing groups and roles instead of having this managed separately in Yields for performance.
We allow for such a solution, please contact helpdesk@yields.io

:::

### Download the role logs

A file can be downloaded that contains logging information regarding the users in the application and their (change of) status
over a given period of time. To get to this file, do the following:

1. Go to the roles menu (within the organization pane), click on the three vertical dots
on the role that you want to get the logging info from and choose 'Download role logs'.

![Download role logs menu](/img/app-a/change_scope_1.png)

2. A screen shall open with two fields depicting the time period over which you want retrieve the logged information.
By default, the End Time is the current date, and the Start Time is End Time - 10 days. So logging info over the past 10 days is retrieved.
Once happy with the time period, click on 'get log'.

![Select time period](/img/app-a/download_role_logs_2.png)

3. A .json file shall be automatically downloaded to your local machine with the relevant info. For example,
the startTime reflects the date at which the user has been assigned the given role. For users that are no longer assigned
a particular role, also the terminationTime is available.

![Downloaded JSON](/img/app-a/download_role_logs_3.png)

### Active users

At any point in time, a file can be downloaded that contains information (user details, scope) regarding the current active users in the application for a given role.
To get to this file, go to the roles menu (within the organization pane), click on the three vertical dots
on the role that you want to get the active users from. Finally, click on 'Active users'. A .json file shall be
automatically downloaded to your local machine.

![Active users menu](/img/app-a/change_scope_1.png)

## Other

### Configure the frontend URL

1. Access the Keycloak user interface (https:// **your_application_platform_URL** /y-keycloak/admin/#/yields) and login to the Keycloak administration console using the admin username and password.

2. Access the "Realm Settings" page and configure the frontend URL and save.

![Configure frontend URL](/img/app-a/configure_url_4.png)

### Change authorized session length

In order to determine after which amount of time the user is being logged out from the application, there's 2 relevant tokens with their corresponding lifetimes:

* Access token: typically short-lived. Default value = 10 minutes.
* Refresh token: long-lived. Default = 2 hours.

A refresh token is used to periodically get a new access token to keep the user authenticated to the relevant services (so user is not logged out).

Each time a user connects to Keycloak with its login and password, this creates a new session, i.e. both an access token and refresh token is issued to the user.

The **expected behaviour** is the following (let's take above default values as an example):

* If the user enters the UI and is inactive (does not 'click') for longer than refresh token lifespan, the user gets logged out.
* If the user enters the UI, does some things and stops being active before access token expires, the user will be logged out after refresh token - time of activity. For example, user logs in and is inactive from 7th minute onwards (< access token which is 10'), user will be logged out after 2hours - 7 minutes = 1h 53 minutes.
* If the user enters the UI, and is active for more than access token lifespan, then the refresh token ensures a new access token and refresh token are issued. This means, for example, user works 20 minutes in the app (longer than access token). After 20' user is inactive. User will be logged out after refresh token (2hours), which at this point is similar to the 1st bullet point.

On top of the above we have the following behaviour:

* When the user enters the Jupyter lab, a heartbeat mechanism ensures that the users is still being logged in into the application (UI). This means that the user can spend more time than the refresh token (2hours) in the Jupyterlab, and is still able to navigate back to the UI without getting logged out.

:::note

* Having a Jupyterlab session opened is sufficient to keep the heartbeat mechanism in place. Meaning the kernels can become idle without impacting heartbeat.
* All of the above holds for single browser session, for a single tab.
* There should be no difference between white UI and user being in a modal.

:::

One may want to adapt the default times defined for each of the above as follows (Note that changing the token maximum validity period may also imply some re-direction of the user to the login page when the token is not updated because of some lack of activity):

1. Change Yields realm settings

To change any of these three parameters, go first to the Yields Realm Settings (red-highlighted in below screenshot) and different settings can be found both under the Tokens and Sessions tabs.

![Yields Realm Settings](/img/app-a/change_al_1.png)

This shall show you the following view where the following (next to others) can be adapted to your preferred settings.

   * the maximum 'idle' time ('refresh token') allowed before the inactive user is logged out = 'SSO Session Idle'
   * the maximum validity period of an authentication token = 'Access Token Lifespan'

2. Change Yields realm settings

To change the 'maximum validity period of an authentication token', one may also override the above-explained realm's default variable using the corresponding variable in the y-portal client view. To do so, go to the "y-portal" client view by clicking on the Clients item in the left bar (red-highlighted in below view) and then select the "y-portal" item (green-highlighted in below view)

![y-portal client view](/img/app-a/change_al_3.png)

At this point, you should get the below view where you must select the 'Advanced Settings' section (red-highlighted in the below view)

![Advanced Settings section](/img/app-a/change_al_4.png)

You can here override the default token validity period defined for the Yields realm (see below screenshot)

![Override token validity](/img/app-a/change_al_5.png)

### Configure the number of simultaneous UI sessions per user

#### Regular users

We can limit each user only to login into the application from a single webbrowser at the time.
For general information, please check https://www.keycloak.org/docs/latest/server_admin/#_user_session_limits
but we do provide an elaborated example here.

1. Navigate to the Keycloak user interface (https:// **your_application_platform_URL** /y-keycloak/admin/#/yields) and login to the Keycloak administration console using the admin username and password. Go to 'authentication' and press 'Create Flow'.

![Create Flow button](/img/app-a/single_session_per_user_1.png)

2. Fill in the details. Choose 'basic flow' for the flow type.

![Flow details](/img/app-a/single_session_per_user_2.png)

3. The flow will appear amongst the other flows.

![Flow listed](/img/app-a/single_session_per_user_3.png)

4. Press the name of your flow to set it up. Try to create the flow as shown in the screenshot below.

* Mind the indentation of the different steps.
* Steps surrounded with a squared box are 'Steps' and can be chosen from a limited set of alternatives (maybe user has to look for the name of the step using the search)
* Steps with no boxes are sub-flows that need to be added.

![Flow setup part 1](/img/app-a/single_session_per_user_4.png)

![Flow setup part 2](/img/app-a/single_session_per_user_5.png)

Make sure to configure the 'User session count limiter config' as per the screenshot below.

![Session count limiter config](/img/app-a/single_session_per_user_session_count_limiter.png)

5. In order to apply this flow, we need to change the y-portal client to use the flow we have created. Inside Keycloak admin console, navigate to Clients -> y-portal -> advanced-> scroll to the bottom -> Browser flow. There, select the above flow name that has been created.

![Enable flow on y-portal](/img/app-a/single_session_per_user_enable_1.png)

6. Going back to the different flows, it can indeed be seen that the flow is applied.

![Flow applied](/img/app-a/single_session_per_user_enable_2.png)

As a test, the user can e.g. login to the application using the browser. Then, an new incognito session can be started in which te user also tries to login. This should give the following view:

![Single session test](/img/app-a/single_session_per_user_test.png)

#### Google SSO

1. Setup a new flow (see above steps 1-5) that has only one step.

![Google SSO flow](/img/app-a/single_session_per_user_SSO_1.png)

2. To enable it, navigate to Identity Providers -> Google -> scroll -> Post Login flow

![Enable Google SSO flow](/img/app-a/single_session_per_user_SSO_2.png)
