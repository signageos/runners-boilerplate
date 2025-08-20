# signageOS Runner boilerplate

This repository serves as a starting point for developing Runner for signageOS devices.
It represents one Runner with implementations for any number of target platforms.

## Quick start

Clone this repository. 

Then run:

```bash
sos runner upload
```

this will upload the Runner to signageOS platform.
It will also assign it a uid and add it to `.sosconfig.json` file.

Then you can execute the Runner on a device either via the Box console or via the signageOS API.


## How it works

### Config file

When calling `sos runner upload`, it reads the `.sosconfig.json` file. This file contains several fields:

- `name` - Runner will be created and displayed using this name
-  `description` - Short description of the Runner that will be displayed in Runner detail. It should help the user to understand what the Runner does.
-  `version` - Used for version control. Must follow the semantic versioning format. Each time the Runner Version changes, it should be incremented, however it's possible to overwrite the same version as long as its not published.
- `platforms` - List of platforms and their files that will be uploaded to the signageOS platform.
- `configDefinition` - list of accepted configuration parameters.

### Platforms

The general structure of the `platforms` field is as follows:

```json
{
	"{platform}": {
		"rootDir": "{rootDir}",
		"mainFile": "{mainFile}",
		"runtime": "{runtime}"
	}
}
```

- `{platform}` - name of the platform. It should be one of: `default`, `tizen`, `webos`
- `{rootDir}` - relative path to the platform implementation. This is where the platform-specific files are located in this repository.
- `{mainFile}` - entry point of the platform implementation. This file will be executed
- `{runtime}` - runtime of the platform. It should be one of:  `browser`

### Config Definition

`configDefinition` is a mandatory item, keep it empty if you do not need any variables (`"configDefinition": []`).
`schema.json` is a JSON schema that defines the structure of the configuration object, like input, output and telemetry.