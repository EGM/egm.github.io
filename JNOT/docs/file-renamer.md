# File Renamer

The File Renamer tool provides a fast, repeatable way to rename large batches of files using patterns, tokens, and preview‑driven workflows.

## Overview

The File Renamer pane appears inside Excel as a task pane. It allows you to:

- Select a folder  
- Preview all files before renaming  
- Apply naming patterns  
- Insert tokens (date, sequence, original name, extension)  
- Validate results before committing  
- Log all operations  

## Opening the Tool

1. Go to the **JNOT** tab in the Excel ribbon.
2. Click **File Renamer**.
3. The task pane will appear on the right side of Excel.

## Features

### Pattern‑Based Renaming

You can define a pattern such as:

```text
Report_{yyyy-MM-dd}_{seq}
```


Supported tokens include:

| Token | Description |
|-------|-------------|
| `{name}` | Original file name (no extension) |
| `{ext}` | Original extension |
| `{seq}` | Auto‑incrementing sequence |
| `{yyyy}` `{MM}` `{dd}` | Date components |
| `{guid}` | Random GUID |

### Preview Mode

Before renaming, the tool shows:

- Original file names  
- Proposed new names  
- Conflicts or invalid characters  

No changes are made until you confirm.

### Logging

All rename operations are written to the JNOT log folder, including:

- Timestamp  
- Old name  
- New name  
- Success/failure  

## Error Handling

The tool detects:

- Duplicate output names  
- Invalid characters  
- Locked files  
- Missing permissions  

Errors are displayed inline and logged for review.
