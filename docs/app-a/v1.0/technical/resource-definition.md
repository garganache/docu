---
sidebar_label: "Resource Definition"
---

# Resources procedures

Resources are used to store information like URLs and credentials for connecting to external services.

Creating a resource involves two steps:
1. An admin creates a Resource Definition, which specifies the service location.
2. The admin manages the visibility of the Resource Definition by allowing specific groups to use the Resource Definition.
3. A user uses that definition to create a Resource, adding user-specific credentials.

## Create a resource definition

:::note
Only users with admin role or correct scopes can access this functionality.
:::

1. Open the "Resource definition" page. Click the green "new" button (or the center area if no definitions exist yet).

![Start creating resource definition](/img/app-a/resource_definition_start_create.png)

2. Pick a template that fits your credential format.

Each template defines specific fields. Some include tokens, others require username/password.

![Select template](/img/app-a/resource_definition_select_template.png)

Information about fields:

* Name -- required text field.
* Description -- optional text field.
* Other fields -- filled based on the selected template.

![Creation finish](/img/app-a/resource_definition_creation_finish.png)

:::note
Some fields can't be filled during creation; users will fill them later when using this definition.
:::

:::note
URL shown is just an example.
:::

## Default templates

Default templates are User&Password Template and Token Template

User & Password Template

![User and Password Template](/img/app-a/resource_definition_userpasstemplate.png)

Token Template

![Token Template](/img/app-a/resource_definition_tokentemplate.png)

Templates are part of the application configuration and can be updated by applying a helm chart change.

3. Click "Save" to complete the creation.

![Resource definition created](/img/app-a/resource_definition_created.png)

## Manage visibility of a Resource definition

After creating a [Resource definition](../concepts/glossary.md#resource-definition), assign visibility to user groups.

:::note
Resource definitions can be shared only with groups, not individual users.
:::

1. In the Resource definition menu, open the three-dot menu and select "Manage visibility".

![Manage visibility selection](/img/app-a/resource_definition_manage_visibility_selection.png)

2. Find the group and click "Add".

![Add group visibility](/img/app-a/resource_definition_manage_visibility_add.png)

## Edit a Resource definition

You can edit a [Resource definition](../concepts/glossary.md#resource-definition) after creation.

:::note
Changes apply immediately and affect all code that is using the definition.
:::

1. In the Resource definition menu, click the three dots on the desired row and select "Edit details".

![Edit resource definition](/img/app-a/resource_definition_edit.png)

2. Modify fields as needed and save.

![Edit finish](/img/app-a/resource_definition_edit_finish.png)

## Delete a Resource definition

Deleting a [Resource definition](../concepts/glossary.md#resource-definition) removes all linked [Resource](../concepts/glossary.md#resource).

1. Go to the Resource definition menu, click the three-dot menu, and choose "Delete".

![Delete resource definition](/img/app-a/resource_definition_delete.png)

2. A confirmation shows all affected resources. Confirm deletion.

![Delete confirmation](/img/app-a/resource_definition_delete_confirm.png)

## Create a resource

Once a [Resource definition](../concepts/glossary.md#resource-definition) is available, users in the assigned group can create [Resource](../concepts/glossary.md#resource).

1. Open the "Resources" menu. Click the green "new" button (or the center area if no resources exist yet).

![Create resource](/img/app-a/resource_creation.png)

2. Select the resource definition to use as a base.

![Select resource definition](/img/app-a/resource_create_selection.png)

3. Complete the form. This includes the common fields from the definition and user-specific fields.

    * Name -- required text field.
    * Description -- optional text field.
    * Other fields -- depend on the selected definition.

:::note
Resource names must be unique per user.
:::

![Resource creation finish](/img/app-a/resource_creation_finish.png)

## Edit a resource

Users can update credentials at any time. Previous values aren't shown and must be re-entered.

1. Open the Resources menu. Use the three-dot menu on a resource and choose "Edit".

![Edit resource](/img/app-a/resource_edit.png)

2. Modify any required fields or leave unchanged ones blank. Click "Save".

![Edit resource finish](/img/app-a/resource_edit_finish.png)

## Delete a resource

1. In the Resources menu, find the resource and open the three-dot menu. Select "Delete".

![Delete resource](/img/app-a/resource_delete.png)

2. Confirm the deletion in the prompt.

![Delete resource confirmation](/img/app-a/resource_delete_confirm.png)

## Using a resource in a notebook

Resources are accessed in notebooks via `session.remote`.

List all resources available to the user:

```python
session.remote.resources
```

Select a specific resource:

```python
res = session.remote.resource("example")
```

Access the name and description:

```python
res.name
res.description
```

List the resource fields:

```python
res.fields
```

Use a field in code:

```python
service.authenticate(user=res.field("User"), pass=res.field("Password"))
```

Full example using a resource named `Testpages` with fields:

* `Service URL`: https://testpages.eviltester.com/styled/auth/basic-auth-results.html
* `User`: authorized
* `Password`: password001

```python
res = session.remote.resource("Testpages")

res.fields

import requests
from requests.auth import HTTPBasicAuth
response = requests.get(
    res.field("Service URL"),
    auth=HTTPBasicAuth(res.field('User'), res.field('Password'))
)
assert response.status_code == 200
```

![Resource utilization in notebook](/img/app-a/resource_utilization.png)
