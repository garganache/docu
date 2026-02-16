---
sidebar_label: "Folder Management"
---

# Organizing your objects

The platform enables the user to manage their objects with some degrees of freedom.
Folders can be created/deleted while the object's themselves can be moved from one location to the other.

## Create a folder

1. Select folder creation action in the menu in the upper-right part of your screen (green-highlighted in below screenshot)

![Folder create step 1](/img/app-a/folder_create_1.png)

2. Insert name in the view that has just popped up and click on the 'Create folder' button

![Folder create step 2](/img/app-a/folder_create_2.png)

3. Your new folder shall now appear in the folder view you started this procedure from (green-highlighted in the below screenshot)

![Folder create step 3](/img/app-a/folder_create_3.png)

:::note
Folder creation is allowed for certain object's only - see [Limitations](known-limitations.md).
:::

## Delete folder

To avoid operational accidents, a folder can be deleted at the moment only once it is empty.
The folder can be emptied by moving the items and deleting the subfolders. Once it is empty, we can delete it by taking the following steps:

1. Selecting the 'Delete' action from the 'to be deleted' card (green-highlighted in the below screenshot)

![Folder delete step 1](/img/app-a/folder_delete_1.png)

2. Confirm deletion

![Folder delete step 2](/img/app-a/folder_delete_2.png)

If the folder is not empty, an error message shall appear to remind the user about the above-explained constraint.

![Folder delete error](/img/app-a/folder_delete_3.png)

## Sharing a folder

There are two ways a folder can be shared with another user

* Explicitly: a folder can be shared in a manner analogous to sharing an object - see [Sharing an object](object-operations.md#sharing-an-object)
* Implicitly: when an object is shared from within a folder, this folder will also be visible to the receiving user

### 1. Explicit sharing

A folder can be shared in a manner analogous to sharing an object - see [Sharing an object](object-operations.md#sharing-an-object). Note that the followings rules apply

* If no object in the folder has ever been shared with the 'to be shared with' users, this folder sharing action will also automatically share all existing child objects and subfolders that exist in the folder at the time the folder is shared
* If some objects in the folder have already been shared with the 'to be shared with' users, this means that the folder itself is already shared with the 'to be shared with' users and only some objects are already visible by the 'to be shared with' users
* Parent folders will also be shared, but no parent object(s) will be shared
* If new objects are created in the already shared folder, these objects will not be shared automatically with the 'to be shared with' users. The 'sharing' user should intentionally and explicitly share these objects separately
* Unsharing the folder will require that the folder is either empty or any child object in the folder has been intentionally and explicitly unshared before folder can be unshared. This follows for the moment the same logic as folder deletion action prerequisites. If the prerequisites are not met, an error message will pop up as shown in below screenshot

![Unsharing error](/img/app-a/unsharing_error.png)

As a consequence of the above rules and in order to ensure consistency: if the 'to be shared with' users, say users B, decide to share the just shared folder with other users, say users C, only the child objects users B can see will be shared with users C.

In terms of sharing authorization,

* A new 'FolderShare' scope exists
* If the sharing user has a role that includes the 'FolderShare' scope but not the other individual objects sharing scopes (e.g. StageShare, SessionShare, ArtifactShare, SpecificationShare, BaseRuntimeShare or RuntimeShare) the result of sharing the folder would simply appear as an empty folder to the 'to be shared with' user
* Be aware that a 'ShareAny' scope also exists. It includes all the sharing scopes mentioned above.

### 2. Implicit sharing

When an object is shared from within a folder

* This folder will also be visible to the receiving user, together with only the shared object. This means that all other objects that are not shared inside this same folder, will not be visible.
* Any other operations that are performed on a shared object by the user with whom the object is shared (e.g. moving to different folders) will be
  reflected immediately on the owner's side.

## Moving an object between folders

One may want to move an item or a folder from one parent's location to another one. To do so,

1. Select the 'Move to' action (blue-highlighted in below screenshot) of the folder or item card you want to move

![Folder move step 1](/img/app-a/folder_move_1.png)

2. A new page shall open where you can browse into the full tree structure of the portal section you are in.

   ![Folder move step 2](/img/app-a/folder_move_2.png)

The folder indicated in **bold** is the one in which the object shall be moved.

   ![Folder move step 3](/img/app-a/folder_move_3.png)

:::note
Moving objects between folders can only happen between folders in the same object's menu.

For example, one can move a [Artifact](../concepts/glossary.md#artifact) into any other folder under the 'Artifact menu' pane, but one cannot
move this artifact into a folder created inside e.g. the 'Instance menu' - see [Limitations](known-limitations.md).
:::

## Searching for an object

To enable an efficient retrieval of the object of interest a search field is present in the platform.

* Only objects within the current context are returned. E.g. when doing a search in the 'artifact menu', only artifacts are returned.
* The search is performed within the current folder including all children folders.
* Different objects allow for different attributes that can be searched for:

    * Folders: Name
    * Artifacts: Name, Artifact Version Name, Description, Artifact Version File Name
    * Specifications: Name, Description, Status, Runtime name
    * Instances: Name, Notebook name, Runtime name, RuntimeTechnicalID
    * Sessions: Name, State (Success, Error, Pending)
    * Runtimes: Name, Description, BaseRuntimeID, ExtensionURLs

Any search happens across all attributes simultaneously, meaning, for example that matches for both name and description will be returned.

## Sorting objects

We allow the users to sort different objects by means of attributes specific to those objects. The attributes depend on the context the user is in.
This means that, for example, specifications can be sorted by 'number of inputs', while this attribute does not make sense for artifacts (so this attribute will not show).

In order to sort, the user clicks on the top right hand side and chooses the attribute to sort by. Clicking the arrow reverses the sorting.

![Sorting attributes](/img/app-a/sorting_attributes.png)

* The default is sorting by name (ascending).
* In the screenshot, we show the sorting for specifications. Since the attributes depend on the context, it will be clear to the user what other attributes can be sorted by for other objects.
* The sorting happens on both the folders and items simultaneously. Since folders can only be sorted by folder name, if any other attribute is sorted by for the items, the folders are sorted alphabetically by name, the order as determined by the user. For example, if the user sorts by 'number of artifact versions ascending (descending)', the folders will be sorted alphabetically ascending (descending).

## List view

We allow the user to choose a list view of objects instead of the default object card / grid view. The view can be changed by toggling the icon as shown in the screenshot.

![Grid to list view](/img/app-a/grid_to_list.png)

* The sorting attributes ([Sorting objects](#sorting-objects)) will be carried over to the column headers.
* Any primary / secondary action button translates into a dedicated icon. Hoovering over it will show the action.
* Other actions can be found under the triple dots.
* The list view is paginated and the user can choose how many objects/lines to render.
* User preferences are stored as long as browser cache is not cleared.

![List view](/img/app-a/list_view_1.png)
