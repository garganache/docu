..
    label for referencing to this section

.. index::
   %tags%: Tag procedure

.. _tag_procedure:

Tag procedures
##############

The user can tag different objects, the relevant use cases being:

* bringing additional (business) information/logic onto the object, on top of the name and/or description.
* allow easier retrieval of objects:

    * by searching for the object based on the name of the tag;
    * by having an API in place by which the objects can be retrieved inside the notebooks - see :ref:`tag_management`.

Global tags management
======================

.. _create_tags_globally:

**********************************
Creating tags from within the menu
**********************************

In order to allow for a centralized management of tags, i.e. that impacts all objects having something to do with a given tag, we have a dedicated tags menu.

1. Access the 'Tags' menu page and click on 'new'.

.. figure:: figs/create_tag_1.png
    :width: 80%
    :align: center
    :alt: alternate text

|

2. Fill in the tag name (A maximum of 15 characters is allowed) and click 'Create tag'.

.. figure:: figs/create_tag_2.png
    :width: 60%
    :align: center
    :alt: alternate text

|

3. The tag is now shown in the tag menu, together with the user having created - and thus owning - that tag.

.. figure:: figs/create_tag_3.png
    :width: 80%
    :align: center
    :alt: alternate text

|

If the user creating the tag has the "Create As" set to it's group (see :ref:`automatic_sharing`), this group is shown as the owner of the tag.

.. note::

    Being 'owner of a tag' implies you have the rights to delete the tag.

As from this moment onwards, the created tag can be associated to certain objects. Also, tags that are created 'locally', i.e. through tag management on the object, will appear in this menu. See :ref:`associate_tag`.

***********************
Deleting a tag globally
***********************

In order to remove a tag globally, meaning it will no longer be associated to any object carrying this tag, go tho the tags menu, choose the tag you want to delete. Then click on the three vertical dots and press delete.

.. figure:: figs/tag_delete_global_1.png
    :width: 80%
    :align: center
    :alt: alternate text

|

.. note::

    As can be seen from the screenshot, tags themselves cannot be shared between users. However, the tags will automatically be seen by the users with whom the object is shared.
    They are not *shared* since the user does not see them in the Tag management menu.

.. _associate_tag:

*********************************
Sharing tags from within the menu
*********************************

Tags can be shared from the UI as any other object

.. figure:: figs/tag_sharing_main.png
    :width: 80%
    :align: center
    :alt: alternate text

The following rules and consequences apply when sharing a tag

* The user should see all the tags (owned and shared) in his/her tags menu.
* When selecting a tag to link (in Manage tag menu) the user should see also the shared with him tags.
* If a tag is shared with a user/group that user/group can unlink the tag from an object (as it can already) and it can also delete the tag even though it’s not his/hers
* If two tags coming from distinct owners/users but with same name exist and are accessible by a given user, the owner is displayed in UI so that the end user can differentiate them and use the appropiate one. This is shown in below screenshot

.. figure:: figs/tags_same_name.png
    :width: 80%
    :align: center
    :alt: alternate text

* In python API, a labelId attribute is available to indicate who the owner/creator of the tag is

In terms of authorization, a new TagShare scope exists to manage this tags sharing functionality.

Associating a tag to an object
==============================

1. Go to the object you want to tag. Choose 'Manage tags'.

.. figure:: figs/obj_tag_1.png
    :width: 80%
    :align: center
    :alt: alternate text

2. The tag you want to associate to the object can either be:

    * a new tag that you create 'locally' by typing its name in the grey bar. Once a new tag has been created locally, it also appears in the tags menu.

    .. figure:: figs/obj_tag_2.png
        :width: 80%
        :align: center
        :alt: alternate text

    * an existing tag that has been created from the tags menu - see :ref:`create_tags_globally`. By autocompletion it will be retrieved.

    .. figure:: figs/obj_tag_3.png
        :width: 80%
        :align: center
        :alt: alternate text

3. The tag will show into the list of tags associated to the current object and it will also show on the object card.

.. figure:: figs/obj_tag_see_tags_on_object.png
    :width: 80%
    :align: center
    :alt: alternate text

|

Multiple tags (no restriction on the number) can be associated to a single object.
The first 5 tags will show on the object card where the most recently associated tag shows left, second most recent second left etc. So in the screenshot below 'tag4' has been associated most recently.
When there are more than 5 tags, the other ones are hidden behind the '+...tags'. By clicking on this '+...tags' the user is brought to the 'Manage tags' menu in which he can see/edit all tags as usual.

.. figure:: figs/obj_tag_many.png
    :width: 80%
    :align: center
    :alt: alternate text

|

.. note::

    We currently support the association of tags on artifacts, artifact versions, instances and sessions.

|

Dissociating an existing tag from an object
===========================================

Tags can be dissociated from a given object by going to the 'Manage tags' menu and clicking the cross on the labels.

.. figure:: figs/obj_tag_7.png
    :width: 80%
    :align: center
    :alt: alternate text

|

.. note::

    Dissociating a tag 'locally' doesn't imply the tag itself has been deleted. Indeed, the tag is still present in the (global) tags menu. This means that if the user wants to associate again this tag it would appear by autofill.

.. _tag_sharing::

Sharing of objects with tags
============================

The expected behaviour is the following:

* Sharing an object also shares the tags associated to it.
* The user with whom the object is shared should be able to dissociate the tag from the object, but he should not be able to delete the tag.
* The user with whom the object is shared, is able to create tags with the same name as tags appearing on the shared object.

.. index::
   %tags%: Searching object by tag

Searching objects by tag
========================

The searchbar has been enhanced as to support searches based on the associated tags. The user can either search:

* by using strings only (as usual)
* by selecting tags only
* a combination of the above

By default, all tags associated to a given object (e.g. instances) are presented once the user clicks inside the searchbar.

.. figure:: figs/search_tag_1.png
    :width: 80%
    :align: center
    :alt: alternate text

|

The user can click the tag of interest which should return all objects having this tag.

.. figure:: figs/search_tag_2.png
    :width: 80%
    :align: center
    :alt: alternate text

|

* Selecting multiple tags returns the objects having those tags associated (AND tag1, AND tag2).
* When searching on tags inside a folder, all tags, including those associated on objects outside this folder, are initially presented. The search however only deals with the current folder and an appropriate message is returned in case no matching results were found.
