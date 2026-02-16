---
sidebar_label: "Object Operations"
---

# Other object-related procedures

In previous sections it has been explained how the different objects are created with a specific focus
on their particular nature (e.g. creating an [Artifact](../concepts/glossary.md#artifact) is different as compared to creating an [Instance](../concepts/glossary.md#instance)).

Off course, many of these objects have similar methods that can be used of which:

* [Viewing an object's audit trail](#viewing-an-objects-audit-trail)
* [Viewing an object's dependencies](#viewing-an-objects-dependencies)
* [Sharing an object](#sharing-an-object)
* [Copying an object](#copying-an-object)
* [Folder management](folder-management.md)
* [Sorting objects](folder-management.md#sorting-objects)
* [Reserving an object](#reserving-an-object)

## Viewing an object's audit trail

Users can check an object's audit trail.
This audit trail contains the various events that applied to object and impacted it during its lifetime.

1. Either do one of the following:

   * Find the object you want to check the audit trail from and click on the three vertical dots.

     ![Object options via dots](/img/app-a/instance_other_1.png)

   * Click on the object itself and find on the top right-hand side the same options, but now in a pictorial way.

     ![Object options via detail](/img/app-a/instance_other_2.png)

3. Click on 'Audit' button where the 'Details' link shall enable you to see an event impact on the object.

   ![Audit trail](/img/app-a/audit_trail_1.png)

## Viewing an object's dependencies

Users can check an object's dependencies in a [Graph](../concepts/glossary.md#graph) view by following the steps below:

Either do one of the following:

   * Find the object you want to check the dependencies from and click on the three vertical dots.

     ![Object options via dots](/img/app-a/instance_other_1.png)

   * Click on the object itself and find on the top right-hand side the same options, but now in a pictorial way.

     ![Object options via detail](/img/app-a/instance_other_2.png)

3 Click on the "View graph" option.

A new screen pop up with the first level dependencies displayed:

   * the area of the circle of the main object is twice as large as that of dependencies
   * the circle is fully colored when all object's dependencies are displayed
   * the circle is not completely colored when an object's dependencies are not explored
   * the arrow direction indicates the relationship (input, output) between two objects

   ![Graph view first level](/img/app-a/model_graph_3.png)

The user can further perform the following actions:

   * Explore next-level dependencies by clicking on the nodes

   ![Graph view next level](/img/app-a/model_graph_4.png)

   * Access object details by selecting it

   ![Graph view object details](/img/app-a/model_graph_5.png)

   * The user can immediately go to the object of interest by clicking on the name of the node under the object details (red box in screenshot).

   ![Graph view navigate to object](/img/app-a/model_graph_55.png)

   * Show/Hide object details, exporting the graph or resetting it.

   ![Graph view export/reset](/img/app-a/model_graph_6.png)

## Copying an object

Users can copy any object by means of the following steps:

Either do one of the following:

   * Find the object you want to copy and click on the three vertical dots.

     ![Object options via dots](/img/app-a/instance_other_1.png)

   * Click on the object itself and find on the top right-hand side the same options, but now in a pictorial way.

     ![Object options via detail](/img/app-a/instance_other_2.png)

3. Click on the "Create a copy" option.

A new screen will pop-up where the user can adjust the values of the attributes and save the new object.

## Sharing an object

By default, all of the folders/objects a user is working in/with are only accessible for this user. In this way
access by other - potentially unauthorized - users is prevented.

Off course, at any point in time, one may want to explicitly share an item or a folder with a person or a group, for example:

* to foster collaboration within/outside a given team;
* to allow some auditor (who we assume is also using Yields for Performance) to have access to the analyses one might have performed,
  without having to share them through other means (e.g. mail).

:::warning
If your business model requires the object sharing ability, please ask the platform administrator to enable it.
:::

To share a given object, one does either of the following:

   * Find the object you want to share and click on the three vertical dots.

     ![Object options via dots](/img/app-a/instance_other_1.png)

   * Click on the object itself and find on the top right-hand side the same options, but now in a pictorial way.

     ![Object options via detail](/img/app-a/instance_other_2.png)

3. Select the person/group you want to share the current folder with and click on the 'Add' button.

![Folder share step 1](/img/app-a/folder_share_2.png)

The object shall now be visible to all listed persons/groups.

3. Unsharing may be performed with the same procedure by removing the person/group by clicking on the 'Remove' button.

![Folder share step 2](/img/app-a/folder_share_3.png)

By sharing an object you also share its dependencies. To see the dependencies the user should clock on 'See how' in the UI (see previous screenshot).

![Folder share dependencies](/img/app-a/folder_share_4.png)

The 'sharing perimeter' is also shown in the figure below, where each object and corresponding sharing perimeter are depicted in the same colour. So,
for example:

* user wants to share an [Instance](../concepts/glossary.md#instance) : all downstream and upstream dependencies are shared as well.

![Sharing perimeter](/img/app-a/sharing_perimeter.png)

## Deleting an object

Users can delete an object and all its related dependencies at once.
Moreover, any associated data in the backend (data-lake HDFS and/or registries) are deleted too.
In order to delete a model user has to perform either of the following steps:

* Find the object you want to delete and click on the three vertical dots.

  ![Object options via dots](/img/app-a/instance_other_1.png)

* Click on the object itself and find on the top right-hand side the same options, but now in a pictorial way.

  ![Object options via detail](/img/app-a/instance_other_2.png)

3. Click on "Delete" option.

A new screen will pop-up where the user can confirm or cancel deletion by clicking on the confirmation button
or close window button. All dependencies that are about to be deleted are listed in two sections:
Instance dependencies and Session dependencies.

If the user confirms the object's deletion, it will not be displayed anymore in the object's page.

## Reserving an object

Imagine a situation in which user A (say a quant-user) creates a specification and shares this specification with user B (also a quant-user). At this point in time, user B can also edit this specification, change the code etc. (we assume quant-user has these scopes).
If now user A only wants user B to have some limited access to this object (e.g. to disallow code changes), user A can reserve the specification for himself.

In general, the reserved functionality allows a user to reserve an object, either for himself or for one of the group(s) he belongs to.
Upon reservation of an object:

* any user that does not belong to the group and with whom the object is shared, will only have a limited set of actions available for this reserved object, that override the authorized actions as determined by the scope. The actions that are reserved are set application wide in a configuration file.
* any member of the group (if reserved for group) can take all the actions on this object, according to the user's scope.

In order to reserve an object (in the example below, we show an artifact), take the following steps:

1. Go to the common actions found under the triple dots. Select 'Reserve' as indicated by a lock.

![Object reserve step 1](/img/app-a/object_reserve_1.png)

2. Choose for whom you want to reserve the object:

* Either for the user himself: this implies that any other users only have access to a restricted set of actions on this particular object (as determined per the configuration file).
* Either for one of the groups the user belongs to. An object can be reserved only for one group at a time.

![Object reserve step 2](/img/app-a/object_reserve_2.png)

The scopes (actions) that are still actionable for everyone after reservation can be inspected by clicking 'see more'. Note that only the actions which are NOT in the list below are allowed for after reservation.

![Object reserve scopes](/img/app-a/object_reserve_5.png)

3. Upon reservation:

* the allowed actions are restricted for users with whom the object has been shared (in the example, M is a quant-user but only 'view graph' and 'audit trail' are allowed).
* it is clear that the object has been reserved as the object card shows a 'reserved' label (only for card view).
* the 'info' button provides information who reserved the object, for whom and when the reservation happened.

![Object reserve result](/img/app-a/object_reserve_7.png)

![Object reserve info](/img/app-a/object_reserve_3.png)

4. Unreserving can be done by either the user that originally reserved the object or by any of the group members for which the object has been reserved. Unreserving leads back to the original state of the object in which 'all' actions are available to the users, according to their role (and thus scope).
Now imagine a case in which an object has been shared with user B, and this user B reserves the object. Now, the object can be unshared automatically undoing the reservation this user did.

## Setting Spark configuration from a custom runtime

The Spark driver settings can be set from the UI by creating a custom runtime.
During this process, the user has to pass a URL.

![Runtime URL](/img/app-a/runtime_url.png)

In order to change the spark settings, the user can pass for example:

```console
env://SPARK_OPTS?param=--conf spark.driver.memory=2G & param=--conf key=value & ...
```

where for each configuration parameter the user has to provide some 'key-value' pairs, i.e. which parameter to set to what value.
