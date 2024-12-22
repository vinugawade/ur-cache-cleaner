const FILE_NAMES = {
	COMPOSER_FILE: 'composer.json',
	DRUSH_EXECUTABLE: 'vendor/bin/drush',
	CIVICRM_EXECUTABLE: 'vendor/bin/cv',
	DDEV_CONFIG_FILE: '.ddev/config.yaml',
	LANDO_CONFIG_FILE: '.lando.yml',
};

const TOOL_TYPES = {
	DRUPAL: 'drupal',
	LANDO: 'lando',
	DDEV: 'ddev',
};

const CMS_CMD = {
	DRUSH_CACHE: 'drush cr',
	CIVICRM_CACHE: 'cv flush',
	DRUSH_CIVICRM_CHECK: 'drush pm-list --type=module --status=enabled --package=CiviCRM --no-core --format=json',
};

module.exports = { TOOL_TYPES, FILE_NAMES, CMS_CMD };
