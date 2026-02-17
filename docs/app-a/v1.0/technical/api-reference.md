# API Reference

Yields for Performance exposes a RESTful API for all platform operations. This page covers how to access the API documentation, authentication methods, pagination, and provides a complete end-to-end flow example using the API.

## Interactive API Documentation

An interactive API browser is available at:

```
https://<YOUR_HOST>/y-api/docs
```

This endpoint lets you browse all available endpoints and test calls directly.

### OpenAPI Definition

The OpenAPI specification can be downloaded from:

```
https://<YOUR_HOST>/y-api/openapi
```

This is useful for generating API clients or browsing the API in external tools like Postman.

---

## Authentication

### Standard Keycloak User

Obtain an access token via Keycloak:

```shell
curl -d client_id=y-portal \
     -d username=USERNAME \
     -d password=YOURPASSWORD \
     -d grant_type=password \
     https://<YOUR_HOST>/y-keycloak/realms/yields/protocol/openid-connect/token
```

The response contains an `access_token` field. Use it as a Bearer token in subsequent requests:

```
Authorization: Bearer <access_token>
```

### OpenID Connect (Federated) Users

Users federated through an external Identity Provider (IdP) do not have local passwords in Keycloak. For these users:

- **Direct Access Grant (password flow) does not work**
- Use **Authorization Code Flow with PKCE** instead

#### Using Postman

1. Import the Postman collection
2. Set the required variables:

   | Variable | Value |
   |----------|-------|
   | `KEYCLOAK_HOST` | `https://<YOUR_HOST>/y-keycloak` |
   | `REALM` | `yields` |
   | `CLIENT_ID` | `y-portal` |

3. Ensure the Keycloak client has **Standard Flow enabled** and allows the Postman redirect URI: `https://oauth.pstmn.io/v1/callback`
4. Click **Get New Access Token**, authenticate via your IdP, then click **Use Token**

### Service-to-Service Authentication

For automated integrations, use:

- [Client Credentials flow](https://www.keycloak.org/securing-apps/oidc-layers#_client_credentials)
- [Impersonation via Token Exchange](https://www.keycloak.org/securing-apps/token-exchange)

---

## Pagination

All listing endpoints use **mandatory pagination**. Without a `range` parameter, only the first 100 items are returned.

### Generic Pagination Helper

Add this helper to your notebook to handle pagination across all listing endpoints:

```python
from typing import Callable, TypeVar, Any

T = TypeVar('T')

def paginate_all(
    api_call: Callable[..., Any],
    range: int = 100,
    **kwargs
) -> list[T]:
    """
    Fetch all items from a paginated API endpoint.

    :param api_call: The API method to call
    :param range: Number of items per page (default: 100)
    :param kwargs: Additional arguments to pass to the API call
    :return: List of all items across all pages
    """
    items: list[T] = []
    count = 0
    while True:
        response = api_call(range=f"{count}+{range}", **kwargs)
        if len(response.items) == 0:
            break
        items.extend(response.items)
        count += range
    return items
```

### Usage Examples

**Artifacts:**

```python
paginate_all(session.direct.artifact_management.list_artifacts)
paginate_all(session.direct.artifact_management.list_artifacts, search="yields_Artifact")
```

**Artifact versions:**

```python
def list_all_artifact_versions(artifact_id, **kwargs):
    return paginate_all(
        lambda **kw: session.direct.artifact_management.list_artifact_versions(
            artifact_id, **kw
        ),
        **kwargs
    )

list_all_artifact_versions("796453a1-2f3a-4703-b449-5c1435b8ff6c")
list_all_artifact_versions(
    "796453a1-2f3a-4703-b449-5c1435b8ff6c",
    search="smokeTest.csv"
)
```

**Tags:**

```python
paginate_all(session.direct.tag_management.get_tags)
paginate_all(session.direct.tag_management.get_tags, search="AVTag")
```

:::tip
Avoid listing all objects unless necessary. Prefer searching/filtering by ID, name, or description.
:::

---

## Complete API Flow

This section demonstrates the end-to-end API flow: data upload, run context creation, execution, and results download.

### Glossary of Key Objects

| Object | Description |
|--------|-------------|
| **Specification** | A notebook template with a defined signature (inputs/outputs). Generic and reusable. |
| **Specification Version** | A registered snapshot of the notebook code. Only registered versions are used when running. |
| **Instance** | A specification with concrete input/output bindings. Running an instance creates a Session. |
| **Session** | The execution result of an instance. Contains enough metadata to be replayed. |
| **Artifact** | A container object that holds files. Each uploaded file creates a new Artifact Version. |
| **Runtime** | The execution environment (libraries, dependencies, resources) for running computations. |
| **Parameter** | A specification input controlled at the UI/API level. |

### Step 1: Create Artifacts

```shell
# Validate the artifact name
curl 'https://<HOST>/y-api/validate_name?objectType=Artifact&desiredName=test&folderType=Artifact' \
  -H 'authorization: Bearer TOKEN'

# Create the artifact
curl 'https://<HOST>/y-api/artifacts' \
  -H 'authorization: Bearer TOKEN' \
  -H 'content-type: application/json' \
  --data-raw '{"name":"test","usageMode":"Production"}'
```

### Step 2: Upload Artifact Versions

```shell
# Upload raw data
curl 'https://<HOST>/y-api/raw_data' \
  -H 'authorization: Bearer TOKEN' \
  -F "file=@/path/to/file.json;type=application/json"

# Create artifact version (use the artifact ID from step 1)
curl 'https://<HOST>/y-api/artifacts/<ARTIFACT_ID>/raw_data' \
  -H 'authorization: Bearer TOKEN' \
  -H 'content-type: application/json' \
  --data-raw '{"files":["yields_xxx/file.json"],"name":"version_name"}'
```

:::note
You cannot have two artifact versions with the same name. Without a name, a default value is assigned.
:::

### Step 3: Create a Specification

```shell
# List available runtimes
curl 'https://<HOST>/y-api/runtimes?sortBy=name&excludeArchived=true' \
  -H 'authorization: Bearer TOKEN'

# Create specification with inputs, outputs, and parameters
curl 'https://<HOST>/y-api/specifications' \
  -H 'authorization: Bearer TOKEN' \
  -H 'content-type: application/json' \
  --data-raw '{
    "name": "test_spec",
    "description": "",
    "parameters": {
      "input_parameter": {
        "indexId": 0,
        "description": "desc",
        "type": "String",
        "defaultValue": ""
      }
    },
    "inputs": {
      "artifacts": {
        "input_artifact": {"indexId": 1, "description": "test"}
      }
    },
    "outputs": {"artifacts": {}},
    "runtimeId": "<RUNTIME_ID>"
  }'
```

### Step 4: Upload and Register a Notebook

```shell
# Upload notebook
curl -X POST 'https://<HOST>/y-api/specifications/<SPEC_ID>/notebook' \
  -H 'authorization: Bearer TOKEN' \
  -F "file=@/path/to/notebook.ipynb;type=application/x-ipynb+json"

# Register a minor version
curl -X PATCH 'https://<HOST>/y-api/specifications/<SPEC_ID>/register_minor_version' \
  -H 'authorization: Bearer TOKEN' \
  -H 'content-type: application/json' \
  --data-raw '{"versionName":"Version description"}'

# Register the specification (locks inputs/outputs)
curl -X PATCH 'https://<HOST>/y-api/specifications/<SPEC_ID>/register' \
  -H 'authorization: Bearer TOKEN'
```

### Step 5: Create an Instance

```shell
curl 'https://<HOST>/y-api/stages' \
  -H 'authorization: Bearer TOKEN' \
  -H 'content-type: application/json' \
  --data-raw '{
    "name": "test_instance",
    "description": "",
    "runtimeId": "<RUNTIME_ID>",
    "stageParameters": {
      "parameters": {
        "input_parameter": {
          "value": "some value",
          "description": "",
          "type": "String"
        }
      }
    },
    "stageInputs": [{
      "msgType": "StageInputArtifact",
      "artifactId": "<ARTIFACT_ID>",
      "tag": "input_artifact"
    }],
    "stageOutputs": [{
      "msgType": "StageOutputArtifactDefinition",
      "tag": "output_tag",
      "artifactAttributes": {
        "id": "",
        "name": "output_artifact"
      }
    }],
    "usageMode": "Production",
    "specificationId": "<SPEC_ID>"
  }'
```

### Step 6: Run a Session

```shell
# Start the session (pass the instance/stage ID)
curl -X POST 'https://<HOST>/y-api/sessions' \
  -H 'authorization: Bearer TOKEN' \
  -H 'content-type: application/json' \
  -d '"<STAGE_ID>"'

# Check session status
curl 'https://<HOST>/y-api/sessions/<SESSION_ID>/v2m3' \
  -H 'authorization: Bearer TOKEN'
```

### Step 7: Download Results

**HTML report:**

```shell
curl 'https://<HOST>/y-api/sessions/<SESSION_ID>/output?outputType=html&sessionCodeInOutput=present' \
  -H 'accept: text/html' \
  -H 'authorization: Bearer TOKEN'
```

**Artifact version file:**

```shell
# List versions of an artifact
curl 'https://<HOST>/y-api/artifacts/<ARTIFACT_ID>/versions?sortBy=-createdOn&dataState=All' \
  -H 'authorization: Bearer TOKEN'

# Download a specific file
curl 'https://<HOST>/y-api/artifacts/<ARTIFACT_ID>/versions/<VERSION_ID>/file?filename=<URL_ENCODED_PATH>' \
  -H 'authorization: Bearer TOKEN'
```

---

## Artifact Cleanup API

Trigger and monitor background cleanup of orphaned artifact data.

### Check Status

```shell
curl -H "Authorization: Bearer $TOKEN" \
  https://<HOST>/y-api/artifacts/cleanup/state
```

Returns `NOT_RUNNING` or `RUNNING`.

### Start Cleanup

```shell
curl -X POST -H "Authorization: Bearer $TOKEN" \
  https://<HOST>/y-api/artifacts/cleanup
```

### Get Results

```shell
curl -H "Authorization: Bearer $TOKEN" \
  https://<HOST>/y-api/artifacts/cleanup
```

Returns a JSON array with status, timestamps, and deleted version details.

### Polling Example

```bash
TOKEN=$(curl -s -X POST \
  -d client_id=y-portal \
  -d username=USERNAME \
  -d password=USERPASS \
  -d grant_type=password \
  https://<HOST>/y-keycloak/realms/yields/protocol/openid-connect/token \
  | jq -r .access_token)

# Only proceed if not already running
STATUS=$(curl -s -H "Authorization: Bearer $TOKEN" \
  https://<HOST>/y-api/artifacts/cleanup/state | jq -r .status)

if [[ "$STATUS" == "NOT_RUNNING" ]]; then
  curl -s -X POST -H "Authorization: Bearer $TOKEN" \
    https://<HOST>/y-api/artifacts/cleanup

  MAX_RETRIES=30
  SLEEP_INTERVAL=10
  for ((i=1; i<=MAX_RETRIES; i++)); do
    STATUS=$(curl -s -H "Authorization: Bearer $TOKEN" \
      https://<HOST>/y-api/artifacts/cleanup/state | jq -r .status)
    if [[ "$STATUS" == "NOT_RUNNING" ]]; then
      break
    fi
    sleep $SLEEP_INTERVAL
  done

  curl -s -H "Authorization: Bearer $TOKEN" \
    https://<HOST>/y-api/artifacts/cleanup > /var/log/artifact_cleanup.log
fi
```

---

## Default Permissions per Role

### Admin Role

Has all permissions including `Admin` scope for managing roles, users, and scopes.

### Quant Role

Same as Admin minus the `Admin` scope — cannot manage roles, users, or scopes.

### Read-Only Role

View-only permissions across all object types:

| Scope | Area |
|-------|------|
| ArtifactView | Artifact |
| AnyAuditView | Audit |
| DataView | Dataset |
| GraphView | Graph |
| InstanceView | Instance |
| DataModelMappingConfigurationView | Mapping |
| MappingView | Mapping |
| ModelView | Model |
| NotebookView | Notebook |
| SessionReportReview | Session |
| SessionViewLog | Session |
| SessionViewHtmlCode | Session |
| SpecificationView | Specification |
