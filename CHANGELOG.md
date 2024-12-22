# Perfected Changelog

All notable changes to this project will be documented in this file.

## [v1.4.0] - 2024-12-22

### 🚀 Features

- **Re-structure Extension**: Organized the project structure for better maintainability and scalability.
- **New Icons and Logo**: Introduced new icons and a redesigned extension logo.
- **Updated NPM Packages**: Ensured compatibility and security with the latest dependencies.
- **Enhanced Platform Support**:
  - Added support for `ddev` and `lando` environments.
  - Included a CiviCRM cache-clear command and related functionalities.
- **Improved Templates**: Updated `bug/feature` issue templates and introduced a `pull_request_template.md` for consistent contributions.

### 🐛 Bug Fixes

- **Test Cleanup**: Removed redundant test-related files and configurations.
- **File Optimization**: Relocated utility files and deleted obsolete ones.
- **Execution Time Fix**: Corrected execution time display from milliseconds to seconds.

### 💼 Other Changes

- **Repository Maintenance**:
  - Updated `.gitignore` and other ignore files.
  - Enhanced `README` for better clarity.
- **Variable Renaming**: Renamed `DRUSH_CMD` to `CMS_CMD` to improve readability and context.

### 📚 Documentation

- Updated `README`:
  - Added instructions for clearing CiviCRM cache.
  - Clarified software and environment requirements.

## [v1.3.0]

### 🚀 Features

- Added support for **Drush v12**.

### 🐛 Bug Fixes

- Resolved issues reported in [#1](https://github.com/vinugawade/ur-cache-cleaner/issues/1) by [@elgandoz](https://github.com/elgandoz).

### 💼 Other Changes

- Refactored code to improve maintainability and readability.

## [v1.2.0]

### 🚀 Features

- Enhanced tooltip to display detailed site information.
- Improved output messages for better user experience.

### 🐛 Bug Fixes

- Resolved minor issues and removed debugging code.

### 💼 Other Changes

- Updated `README` for clearer documentation.
- Added logic to hide action button if **Drush** is not found.

## [v1.1.0]

### 🚀 Features

- Introduced support for **Clear Cache** in **DDEV** Drupal project environments.

### 🐛 Bug Fixes

- Resolved minor issues and added inline comments for clarity.

### 💼 Other Changes

- Removed extension from the **Preview** phase.
- Updated `README` with detailed usage instructions.

## [v1.0.0]

### 🚀 Features

- Initial release with support for the **Clear Cache** command in **Drush** for **Drupal** projects.
  - Available exclusively for **Linux/Mac** operating systems.
