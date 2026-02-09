
# Configuration (TOML)

JNOT uses a human‑readable TOML configuration file to store settings for all tools.  
The configuration system is designed to be deterministic, migration‑friendly, and safe to edit manually.

## Location

The configuration file is stored at:

```text
%APPDATA%\JNOT\config.tom
```

This file is created automatically on first run.

## Structure

The configuration file contains:

- Tool‑specific settings  
- UI preferences  
- Logging options  
- Migration version metadata  

Example structure:
The configuration file is divided into logical sections.  
A typical configuration looks like this:

```toml
title = "JNOT Global Configuration"
version = "1.0"

[FileRenamer]
input_folder = "C:\\testdata\\Input"
output_folder = "C:\\testdata\\Output"
debug = true
dry_run = false
clear_on_run = true
```

Root Fields
| Field | Type | Description |
| ----- | ---- | ----------- |
| title | string | Human‑readable title for the config file |
| version | string | Configuration schema version used by the migration engine |


[FileRenamer] Section
| Field | Type | Description | 
| ----- | ---- | ----------- |
| input_folder | string | Last used input folder |
| output_folder | string | Last used output folder |
| debug | bool | Enables verbose logging for rename operations |
| dry_run | bool | Lists how the filenames would change, but doesn't carry out the changes |
| clear_on_run | bool | Clears the display before each batch renaming begins |


Migration

JNOT includes a TOML migration engine that:

- Detects outdated config versions
- Applies incremental migrations
- Writes backup copies before modifying the file
- Ensures forward compatibility

Backups are stored in:

```text
%APPDATA%\JNOT\Backups
```

Each backup is timestamped and versioned.
Editing the Configuration
You may safely edit the TOML file by hand.
If the file becomes invalid:

- JNOT will fall back to defaults
- The migration engine will attempt to repair the file
- A backup copy will be created automatically

Resetting Configuration

To reset JNOT to factory defaults:
- Close Excel
- Delete config.toml
- Restart Excel

A fresh configuration will be generated automatically.

Programmatic Architecture

Internally, configuration is handled by:

- ConfigLoader (reads TOML → model)
- ConfigWriter (writes model → TOML)
- ConfigMigrationEngine (schema upgrades)
- ConfigDefaults (applies default values)
- ConfigService (high‑level orchestration)

These components ensure deterministic, testable behavior across all tools.
