# Getting Started

Welcome to the JNOT Excel Add‑In. This guide walks you through installation, first‑run behavior, and the basic concepts behind the toolbox.

## Requirements

- Windows 10 or later  
- Microsoft Excel (Microsoft 365 or Excel 2019+)  
- .NET Framework 4.8  
- Permission to run Excel add‑ins

## Installation

1. Download the latest release from the JNOT GitHub repository.
2. Unzip the package.
3. Double‑click the `.vsto` installer.
4. Approve the security prompt when Excel asks whether to trust the add‑in.
5. Restart Excel.

After installation, you will see a **JNOT** tab appear in the Excel ribbon.

## First Run

On first launch, the add‑in:

- Creates a configuration file in your user profile  
- Initializes the logging system  
- Loads the default settings for all tools  

No manual setup is required.

## Folder Locations

| Component | Location |
|----------|----------|
| Configuration | `%APPDATA%\JNOT\config.json` |
| Logs | `%USERPROFILE%\Documents\JNOT\Logs` |
| Migration backups | `%APPDATA%\JNOT\Backups` |

## Support

If you encounter issues:

- Open the **Help** pane from the ribbon  
- Review the **logs** folder  
- Visit the documentation site  
- File an issue on GitHub  
