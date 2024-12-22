const FILE_NAMES = {
	COMPOSER_FILE: 'composer.json',
	DRUSH_EXECUTABLE: 'vendor/bin/drush',
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
};

module.exports = { TOOL_TYPES, FILE_NAMES, CMS_CMD };
