---
sidebar_label: "Specification Creation"
---

# Specification procedures

To carry out quantitative analyses Yields for Performance uses Jupyter notebooks using the Python programming language.
In this context, creating a specification means that the user should define the inputs the notebook is taking, the output
it is creating, i.e. the so-called signature. Also the notebook itself is considered as part of the specification object.

## Create a specification

### 1. Defining a specification's signature

There are two ways of creating a specification's I/O:

* Starting [from scratch](#from-scratch)
* [From a .json file](#from-a-json-file)

#### From scratch

1. Click on the Specification menu item in the main left panel and click either the green new button or create a specification directly (only seen when no specifications exist yet on the page).

![Create specification step 1](/img/app-a/create_spec_1.png)

2. Select the input(s) your specification will be taking.

A first screen shows where the user has to click the '+' to add inputs.

![Create specification add inputs](/img/app-a/create_spec_40.png)

Your specification can take any combination of objects the following input types
(Note that we do not assign specific values for them at this stage - see [Open a specification's notebook](#2-open-a-specifications-notebook)).

   * [Parameter](../concepts/glossary.md#parameter)
   * [Artifact](../concepts/glossary.md#artifact)

Now, the user should fill in the details of the selected input (The working example contains a single artifactd and a parameter - in green):

* Fill in the alias - in blue: this is the string to be used when you want to retrieve the object (artifact or parameter) from within the notebook).
* Fill in the description - in black: this description will be shown in the UI later on.
* For parameters (orange) the user has to choose a 'type' (string, double, integer or boolean) and provide a default value. This default value will be prefilled when creating instances during the next step but can be overwritten as well.
* There is also a possibility of adding more inputs (red circle). Then click 'next' to proceed.
* The user has the possibility to order the inputs according to wishes by using the arrows (in red). This ordering can only be done during this configuration stage (i.e. as long as we did not mark the specification as registered - see [Mark as registered](#mark-as-registered)).
* Also, we offer a collapsed view of the inputs (the 'eye' icon in red). In case there should be many inputs, this might be more convenient.

![Create specification input details](/img/app-a/create_spec_4.png)

3. Choose zero, one or more output artifacts.

Use the plus sign ( + ) to add more outputs if needed. The same remarks as for the inputs hold.

![Create specification outputs](/img/app-a/create_spec_5.png)

4. Name and describe the specification. Regarding the [Runtime](../concepts/glossary.md#runtime), by default, the base runtime Spark Python YARN is prefilled.

![Create specification name](/img/app-a/create_spec_6.png)

:::note
**Understanding the Runtime Choices**

Use the following guidelines to select the appropriate kernel for your task:

* **Default Spark Python Yarn:** Best for standard Spark jobs without custom library requirements. Spark versions are automatically managed and updated with the platform.
* **Individual Spark Python Yarn:** Ideal for Spark jobs requiring custom Python libraries. Supports on-the-fly Python library installations.
* **Python Kubernetes Container:** Recommended for non-Spark workloads. Comes pre-loaded with common Python libraries and allows for additional dynamic installations.
* **Python Mini Kubernetes Container:** A "blank slate" lightweight environment. Use this when you need absolute control to install a specific set of libraries from scratch.
:::

At this stage, only the I/O is defined and the specification is still in 'draft' (see [Mark as registered](#mark-as-registered)). Next to this,
when clicking on the 'attributes' tab, the user is presented the relevant attributes - see screenshot below.

![Specification attributes](/img/app-a/create_spec_final_2.png)

Also when clicking on the 'I/O' tab
an overview of the inputs and outputs the user defined is shown in the UI. The screenshot in the example shows a specification taking in two datasets
and outputting another dataset.

![Specification I/O overview](/img/app-a/create_spec_final.png)

Off course, something should happen on the inputs, which is what the underlying notebook will do,
see [Open a specification's notebook](#2-open-a-specifications-notebook).

#### From a .json file

When a specification is created - see [From scratch](#from-scratch) - it can be exported/downloaded as a .json file (also see [Export a specification as .json file](#export-a-specification-as-json-file)).<br/>
This .json file on itself can be used in turn to create a new specification on itself.

The main benefits of having this functionality is:

   * in case a large number of inputs/output is used, one does not always want to define these from scratch because it's time consuming
   * in case only some minor modification to the original specification is needed (note that also copying an existing specification could help here)
   * most importantly, as a .json file is a widely used format, it enable easy sharing of the specification's signature outside the platform.

In order to create a specification from a .json file, the following steps should be taken:

1. Go to the specification menu item and click on the New button on the top right corner and choose 'Specification from json'.

![Create spec from JSON step 1](/img/app-a/create_spec_json_1.png)

2. Click on 'Choose file' and browse towards the .json file of interest ('json_example.json' in the screenshot).

![Create spec from JSON step 2](/img/app-a/create_spec_json_2.png)

If a valid .json file is chosen, this is confirmed in the screenshot and click 'next'. The following screen that appears is the same as if you were
creating a specification from scratch, however, now the inputs, outputs, descriptions and all other parameters are already filled in.

![Create spec from JSON step 3](/img/app-a/create_spec_json_3.png)

If an invalid .json file is chosen (e.g. because it's not a .json file at all, or it's content is corrupted in some sense) a warning is shown.

![Create spec from JSON invalid](/img/app-a/create_spec_json_5.png)

### 2. Open a specification's notebook

Next to the I/O that determines the specification, the underlying notebook that will carry out the analyses,
should also be defined. To get access to and determine the underlying notebook there are two options (see green squares):

* Click on 'open code' on the specification card.

![Open specification code card](/img/app-a/open_spec_01.png)

* Click on the specification name itself which takes you to the detailed page of the specification (e.g. here you can see the I/O, attributes etc.). On this page, you will also find the 'Open code' button.

![Open specification code detail](/img/app-a/open_spec_1.png)

By following either of the two previous options a menu shows where the user should give some **temporary** context to the abstract
I/O he defined until then.

![Open specification context](/img/app-a/open_spec_23.png)

:::note
At this stage the user needs to choose concrete inputs for the notebook to have something to work with.
Note that these are NOT yet the final inputs on which the [Instance](../concepts/glossary.md#instance) will run.
In fact, we are here creating an 'interactive instance' - see [Instance management](instance-management.md) for more information on creating an instance.

To give a dummy example, if the final application of our notebook would be to calculate the average value of
all numerical columns of a given dataset, the notebook itself would take the same form, whatever the specific dataset might be.
It is, the specification notebooks are intended to serve as **generic templates** and therefore enabling a standardized approach in which the same code can be executed against many different inputs.
:::

:::note
When opening code on a Draft specification, the specification will be [reserved](object-operations.md#reserving-an-object) automatically to your user. You can disable this by clicking on the checkbox.
:::

The screenshots below shows a working example in which a single artifact is taken as input. A dropdown menu appears from which the user
can choose from any of the registered or temporary artifacts inside the platform.

* Select the artifact and the artifact version that the user might want to use inside the notebook. During the selection, the user is free to use either:

    * only the dropdown and scrolls to the version of interest.
    * fill in a custom string that should retrieve the matching artifact version (useful in case of many artifact versions). Attributes that are searched by are the artifact version id, name, correctionOf (uuid), sessionID (uuid) and creationTime. In case user wants to search by creationTime, it's currently mandatory to provide it as a string matching the backend format (e.g. type 03 for March).

* Next to choosing a particular [Artifact Version](../concepts/glossary.md#artifact-version) for every input artifact, we offer the possibility to read only certain [Artifact Version](../concepts/glossary.md#artifact-version)(s) of the given input artifact versions as defined per tags. The artifact version selected only serves the purpose of providing a pointer to the given version inside the notebook. The user can read any artifact version(s) he wants, we only provide the selected version as a handle. Next to this, our Python API covers two use cases:

    * reading only the chosen artifact version;
    * reading artifact version up till the chosen version, where the tags chosen are an additional filter - see [Loading artifacts](../technical/python-io-operations.md).
      Please read the API documentation carefully to understand the loading behaviour and the potential drawbacks using this mechanism - see [Python library I/O](../technical/python-io-operations.md).

![Open specification select artifact](/img/app-a/open_spec24.png)

The user enters into Jupyterlab (if is the first time he enters, do 'sign in with Yields for Performance' and 'Launch server'). In Jupyterlab
the same attribute information as illustrated in [From scratch](#from-scratch) can be found:

* green: the specification's name
* orange: the name of the notebook
* red: the runtime

![Jupyterlab specification](/img/app-a/open_spec_4.png)

### 3. Changing a specification's notebook

#### Writing a notebook from scratch

Once the user enters into Jupyterlab he finds a standard Jupyter notebook in which he can do whatever he wants:

* change/add/delete code
* change/add/delete cells

Once the user is happy with the script's current state, **he must save it** (Ctrl-S).

:::note
The user is free to do whatever he/she wants in the Python notebooks. Off course, it should be mentioned that these notebooks
'live inside' the application and that for example, in order to be able to read/write datasets from and to the platform we refer to the
[Python library I/O](../technical/python-io-operations.md).
:::

#### Choosing an existing notebook

When the user has no notebooks at his disposal yet, he should start working onto the notebook content itself from scratch, see previous section.
However, as time evolves it might happen that the user has some 'notebook inventory' (e.g. somewhere offline) that he might want to use. In order to use these notebooks, do the following steps:

1. Inside Jupyterlab, choose the 'upload' file functionality highlighted in red.
2. Browse through your inventory for the notebook you would like to see appear.
   Note that the name of notebook should be identical to the one that is already present in Jupyterlab (and from which the name itself is automatically taken from the specification name).
   An 'overwrite file' question pops up: click 'yes'. The content of the notebook from your offline inventory will
   appear inside Jupyterlab, however with the name as determined by the specification.

   If the name of the uploaded Jupyter notebook is different from the one that is opened an error will be thrown. Reason for this is some underlying
   consistency checks with the (name of the) json file that is created at the time you push 'create specification'.

![Offline notebook upload step 1](/img/app-a/offline_notebook_1.PNG)

![Offline notebook upload step 2](/img/app-a/offline_notebook_2.PNG)

## Running a specification in interactive mode

When the Jupyter notebook has been opened inside Jupyterlab one can execute it against the chosen inputs
and finetune the content of the notebook according to wishes.

Note that even in interactive mode we allow the saving of artifacts, see the example in below screenshot.
Furthermore - those artifacts can in turn be used as inputs in some other specification as input for 'Open Code'. This enables
the possibility to build interactive end-to-end pipelines and hence a faster iteration between the different stages of this pipeline.

To retrieve the interactively saved object in the UI, one can use the 'name' attribute of the output object, see the screenshots below.

1. Inspect the name of the output object through the configuration.

![Save artifact interactive step 1](/img/app-a/save_artifact_interactive.png)

2. This interactively saved object will be available from the user-interface, where it's name as from the previous screenshot will appear.

![Save artifact interactive step 2](/img/app-a/save_artifact_interactive_2.png)

The following principles hold:

* a new object will be saved interactively (and thus appears in the UI) when at least one of the inputs of the specification that generates the object is changed (i.e. before you do 'open code').
* the interactively saved objects will be deleted whenever the entire platform is restarted, i.e. those are temporarily available. This is to be contrasted with the objects that are saved during a registered instance run. The latter are permanently stored inside the platform.

## Register version

When the user is satisfied with the notebook, he needs to save the notebook after which it can be registered as a version (not saving will simply register the latest saved version). The versioning implies the following:

* After registering it as a version, the notebook content shall be used when an instance is created from this notebook (see [Instance management](instance-management.md)).
* When the notebook is only saved (but not registered) these changes are **not** taken into account when this specification shall be used to create an instance.
* A notebook can be 'version registered' under multiple versions, basically it's committing your code and ensuring it will be picked up by instances using this specification.

To register a version, click on 'register version' on top right hand side inside Jupyterlab.

![Register version step 1](/img/app-a/spec_register_1.png)

You can add any free comment to this version, which shall also be visible in the specification's attributes - see screenshots.

![Register version step 2](/img/app-a/spec_register_2.png)

![Register version step 3](/img/app-a/spec_register_3.png)

## Change specification signature (I/O)

While a specification is in Draft we can change the structure of the inputs and outputs.
Press the 'Configure I/O' button, highlighted in red (also to be found on any specification in the listing page).

You will be presented with the previous structure of the specification which you can change
( add /remove inputs or outputs ), see [From scratch](#from-scratch).

![Change specification I/O](/img/app-a/spec_change_io_1.png)

## Mark as registered

Once the user is happy with the state of the notebook and he does not intend to do any other changes,
the specification might get marked as registered. The actual meaning of this is
that 'the specification is ready to be used as a source/template for an instance'.

:::warning
* Registering a specification can only be done after the user went into Jupyterlab and committed the code ('register version').
* once a specification is registered, the *signature* can no longer be changed (as it might impact downstream instances)!
* only after a specification is marked as registered, it can be used to create an instance.
:::

In order to mark a specification as registered, press the white 'Register' button on the top right-hand-side.

![Mark as registered step 1](/img/app-a/mark_as_registered_1.png)

After doing so, the specification says it's registered (red box). Secondary, other actions that can be taken on this specification are shown in the green box.

![Mark as registered step 2](/img/app-a/mark_as_registered_2.png)

:::note
Please note the subtle difference between [Register version](#register-version) and [Mark as registered](#mark-as-registered).

* Register version: committing a current's state *notebook*. Can be done without 'marking as registered'.
* Mark as registered: fixing the I/O *structure* of the specification. I/O *values* and content of the notebook can still be changed.
:::

## Export a specification as .json file

One of the key benefits of Yields for Performance is that it enables easy sharing of objects between different users. Therefore, often a .json
file is used as it can be easily interpreted and used also by other applications.

To export or download a specification, take the following steps:

1. Access the "Specification" menu page and find the specification of interest.
2. Click on 'export as JSON' - see previous screenshot. A .json file will be downloaded onto your local desktop.

## Other specification properties and methods

Many other things can be done to the specification object, similar to what is described in the [Object operations](object-operations.md) section.

1. Access the "Specification" menu page.
2. Either do one of the following:

   * Find the specification you want to edit and click on the three vertical dots.

     ![Specification other options via dots](/img/app-a/spec_other_1.png)

   * Click on the name of the specification itself and find on the top right-hand side the same options, but now in a pictorial way.

     ![Specification other options via detail](/img/app-a/spec_other_2.png)

Things that can be performed:

   * viewing the [Graph](../concepts/glossary.md#graph) to inspect the specification's relationship with other [Application objects](../concepts/glossary.md#application-objects) - see [Viewing an object's dependencies](object-operations.md#viewing-an-objects-dependencies).
   * sharing a specification with other users - see [Sharing an object](object-operations.md#sharing-an-object).
   * copying a specification - see [Copying an object](object-operations.md#copying-an-object).
   * checking the specification's audit trail - see [Viewing an object's audit trail](object-operations.md#viewing-an-objects-audit-trail).
   * deleting a specification - see [Deleting an object](object-operations.md#deleting-an-object).
   * moving a specification - see [Folder management](folder-management.md).
   * reserving a specification - [Reserving an object](object-operations.md#reserving-an-object).

# Development Workflow for Specifications

There are two users involved in the development process:

* **John** -- the owner and maintainer of the source specification. He has full access and editing rights.
* **Amy** -- a developer who does not have access to the source specification directly. She works on *development copies* derived from it.

## 1. Create a Development Copy

Since Amy cannot edit the source specification (as it is [reserved](object-operations.md#reserving-an-object) for John),
she starts by creating a **development copy** of John's specification.

![Creates a fork of a specification](/img/app-a/fork_button.png)

The development copy is a **clone** of the original source specification.
The system automatically names it following the pattern:

```
<original_name>_<5 chars>_<number>
```

For example:

```
risk_model_5f42g_1
```

Amy can rename this cloned specification at any later time.

:::note
The development copy includes the same inputs, outputs, and notebook as the source specification.
:::

## 2. Open the Development Specification

Amy opens the code for her cloned specification, which launches **JupyterLab**.

The notebook associated with the cloned specification opens automatically. It has the same name as the original since Amy is working on a **git fork** of the source repository.

A dedicated **branch** is automatically created and checked out. Its name matches the cloned specification, e.g.:

```
risk_model_5f42g_1
```

:::note
This isolation ensures that Amy's work remains independent of the source specification. She may create additional branches if required, but this is optional.
:::

## 3. Implement Code Changes

Amy performs her development inside her dedicated branch. She can:

* Modify code cells.
* Add or remove notebook cells.
* Commit her progress regularly.

Each commit represents a **logical change** in the notebook's evolution.

She may iterate multiple times until the notebook behaves as expected.

## 4. Prepare for Review

When Amy is satisfied with her updates, she prepares her work for review.

The following steps must be followed:

1. **Pull** the latest changes from the master branch of the source specification.
   The default merge strategy is *rebase*, so her branch's commits are replayed on top of master.
2. **Merge** these changes into her working branch.
3. **Resolve conflicts** if any occur.
4. **Validate** that the notebook executes correctly after the merge.
5. **Push** her branch to the remote repository.

:::warning
While performing *Git actions* (Pull, Push, Refresh), do **not** keep the notebook open in JupyterLab.
The notebook may be temporarily modified during these operations, which can cause inconsistencies.
:::

## 5. Review and Merge by John

Once Amy has pushed her branch, she notifies John.

John accesses the source specification and checks out the **branch pushed by Amy**.
He performs the following:

* Reviews code and validates it against project standards.
* If approved, merges Amy's branch into the **master branch** of the source specification.
* Registers a new version of the specification, making it the latest official version.

:::note
Registering creates a new version of the notebook within the platform.
See also: [Register version](#register-version).
:::

## Behavioural Notes

**Automatic Naming**

* Development copies automatically receive a `_5chars_` suffix and an incremented number.
* They can be renamed at any time.

**Notebook Duplication**

* Cloned specifications include the same notebook name as the source.
* This consistency comes from the git fork structure of the repository.

**Branching Strategy**

* Each forked specification creates a **dedicated branch**.
* Only forked specifications show the **Pull** and **Push** controls.
* These controls allow:

  - Pulling from remote (source specification)
  - Pushing to remote
  - Refreshing remote changes

![Buttons used for Pushing/Pulling/Refresh](/img/app-a/merge_buttons.png)

## Merging Notebooks (Using nbdime)

A Jupyter notebook consists of multiple cells, stored as JSON.
Merging notebooks is handled by the **nbdime** library, which enables comparison and merge operations on notebook structure and metadata.
While performing these operations, do not keep the notebook open for editing. The notebook may change several times during Git actions, making it temporarily unreadable.

:::note
The first cell of each notebook defines the **session context** (inputs and outputs).
This cell usually changes automatically when you click *Open Code*.
:::

**Merge Procedure**

1. **Switch to the master branch.**
   Pull the latest changes from the source specification to ensure your environment is up to date.

![View of master pull](/img/app-a/merge_master.png)

2. **Switch back to your development branch.**

3. **Merge master into your development branch.**

![View of merging master](/img/app-a/merge_master_back.png)

4. **If conflicts occur, click the button next to the exclamation mark icon** in the Jupyter toolbar.
   A conflict resolution screen appears.

![Example view of conflict in Git](/img/app-a/merge_conflict.png)

![Example of conflict resolution in notebook merge](/img/app-a/merge_conflict_screen.png)

The conflict view is divided into four sections:

* **Top left**: your current branch.
* **Top center**: the base value from the common ancestor.
* **Top right**: the incoming branch you are merging.
* **Bottom**: the resulting cell.

Use the **arrows** to select which content to include in the result.
Manual editing of the result is also allowed.

Metadata follows the same rules. In general, ignore metadata changes unless you see nbdime conflict markers. Remove those entries.

![Example of conflict resolution in notebook merge - metadata](/img/app-a/merge_conflict_metadata.png)

When the same cell is added twice, a conflict pane appears. In this case, two new cells replaced two existing ones. You can choose to keep all cells or discard some. When finished, click Resolve Conflict.

![Example of conflict resolution in notebook merge - cells](/img/app-a/merge_conflict_cell.png)

**Merge Guidelines**

* For the first cell, prefer the **left-hand value** (your branch) to preserve your session context.
* Ignore metadata changes unless `nbdime` flags explicit conflicts.
* When identical cells are added twice, choose which to retain or keep both.
* After all conflicts are resolved ( you may need to click the `Resolve Conflict` button), click **Mark as Resolved**.

This automatically triggers a **commit** for your branch.

![Auto commit after merge](/img/app-a/merge_commit_auto.png)

**After Merge**

* Push your merged branch to master so John can review and integrate it.
* The Push button initiates the action.
* Once merged, the change history of the specification reflects the full chain of commits.

![Example of specification merge history](/img/app-a/merge_history.png)

If unsatisfied with changes, open the **History** view and click **Rollback**.
This reverts all commits made after the selected one.

## Additional Recommendations

* Avoid committing notebooks that contain **outputs**.
  Merge tools ignore outputs during conflict resolution.
* Keep the initial specification on **master**.
  Use separate branches for all development work.
* In your development branch:

  - Prefer adding new cells rather than heavily modifying existing ones.
  - This minimizes future merge conflicts.

* After development is complete, delete the forked specification if no longer needed.
