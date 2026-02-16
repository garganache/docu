---
sidebar_label: "Python Tag Management"
---

# Tag management

## Associating tags

The user can programmatically associate one/more tag(s) to an artifact (version) that is either input or output of a session.

```python
# generate some random tags
tag_1, tag_2 = str(np.round(np.random.rand(), 6)), str(np.round(np.random.rand(), 6))
tag_3, tag_4 = str(np.round(np.random.rand(), 6)), str(np.round(np.random.rand(), 6))
print(tag_1, tag_2, tag_3, tag_4)

# input artifacts
artifact = session.io.input("given_alias")

# associate tag "tag_1" to the input artifact
session.manager.link_tag(tag_1, artifact)

# associate tag "tag_2" to the input artifact *version*
session.manager.link_tag(tag_2, artifact.version)

# output artifacts
from yields.providers.filesystem import ProviderFactoryFilesystem
output_artifact = session.io.output("given_alias")

# associate tag "tag_3" to the output artifact
session.manager.link_tag(tag_3, output_artifact)

output_artifact.file("test", ProviderFactoryFilesystem()).write(b"test")
output_artifact_result = output_artifact.save()

# associate tag "tag_4" to the output artifact version
session.manager.link_tag(tag_4, output_artifact_result.version)
```

* Associating a tag shall only be performed when running the notebook as instance. When the user is in interactive mode,
  the tag will not be associated yet and a warning will be displayed.
* If a tag that is already associated, is associated again (by executing the codebook a second time), an exception will
  be thrown that this is not allowed.
* If a tag name has more than 15 characters, an exception is thrown.
* Objects can be tagged via their UUID as well.

## Removing tags

```python
# remove tag from an object by name
session.manager.remove_tag("remove_tag_by_name", artifact)

# remove tag from an object by that object's tag
session.manager.remove_tag(artifact.version.tags[0])

# remove tag from an object by tag
session.manager.remove_tag(tag_3, output_artifact)
session.manager.remove_tag(tag_4, output_artifact_result.version)
```

* Dissociating a tag shall only be performed when running the notebook as instance. When the user is in interactive
  mode, the tag will not be dissociated and a warning will be issued.
* If a non-associated tag is being dissociated, nothing happens. I.e. the notebook executes without error.

## Get tags on a given object

To retrieve all tags associated to a particular object, the user can use the following piece of code.

```python
# retrieve a list of tags associated to artifact is provided through
artifact_tags = session.manager.retrieve_tags(artifact)

print(session.manager.retrieve_tags(artifact))
print(session.manager.retrieve_tags(artifact.version, object_type="Artifact"))
print(session.manager.retrieve_tags(output_artifact))
print(session.manager.retrieve_tags(output_artifact.version, object_type="Artifact"))

# in order to to get the UUID or the actual tag name, the user can do
[print(tag.name) for tag in session.manager.retrieve_tags(artifact)]
[print(tag.id) for tag in session.manager.retrieve_tags(artifact)]
```

:::warning

Retrieving by id requires object_type and potentially child_object_type and child_object_id.

:::

## Retrieving an object by tag name

When running an instance, from the UI the user is able to choose an artifact version, however, there might be use cases
for which the user wants to retrieve a particular version of an artifact that is not part of the so-called session
context (i.e. input/output of the specification). The tag of this artifact can then be used as shown in the piece of
code below.

```python
# retrieving a given artifact using its tag(s) associated
tag_id = session.direct.tag_management.get_tags(search="tag_name").items[0].id
artifacts = session.direct.artifact_management.list_artifacts(tags=[tag_id])
artifacts.items[0]
```
