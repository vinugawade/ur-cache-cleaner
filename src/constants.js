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

const DRUSH_CMD = {
	CACHE: 'cr',
};

module.exports = { TOOL_TYPES, FILE_NAMES, DRUSH_CMD };
