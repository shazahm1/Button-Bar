<?php
/**
 * @package   Button Bar for WordPress
 * @category  Core
 * @author    Steven A. Zahm
 * @license   GPL-2.0+
 * @link      https://connections-pro.com
 * @copyright 2019 Steven A. Zahm
 *
 * @wordpress-plugin
 * Plugin Name:       Button Bar
 * Plugin URI:        https://connections-pro.com/
 * Description:       An Editor block which creates a row of buttons.
 * Version:           1.0
 * Author:            Steven A. Zahm
 * Author URI:        https://connections-pro.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       successtools/button-bar
 * Domain Path:       /languages
 */

namespace Success_Tool;

final class Button_Bar {

	const VERSION = '1.0';

	/**
	 * @var string The absolute path this this file.
	 *
	 * @since 1.0
	 */
	private static $file = '';

	/**
	 * @var string The URL to the plugin's folder.
	 *
	 * @since 1.0
	 */
	private static $url = '';

	/**
	 * @var string The absolute path to this plugin's folder.
	 *
	 * @since 1.0
	 */
	private static $path = '';

	/**
	 * @var string The basename of the plugin.
	 *
	 * @since 1.0
	 */
	private static $basename = '';

	public function __construct() { /* Do nothing here */ }

	public static function init() {

		self::$file     = __FILE__;
		self::$url      = plugin_dir_url( __FILE__ );
		self::$path     = plugin_dir_path( __FILE__ );
		self::$basename = plugin_basename( __FILE__ );

		add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'enqueueEditorScripts' ) );
		add_action( 'enqueue_block_assets', array( __CLASS__, 'enqueueScripts' ) );
	}

	public static function enqueueEditorScripts() {

		$path         = self::$path;
		$url          = self::$url;
		$dependencies = array(
			'lodash',
			'wp-plugins',
			'wp-element',
			'wp-edit-post',
			'wp-i18n',
			'wp-api-request',
			'wp-data',
			'wp-hooks',
			'wp-plugins',
			'wp-components',
			'wp-blocks',
			'wp-editor',
			'wp-compose',
		);

		wp_enqueue_script(
			'success-tool/button-row',
			"{$url}dist/index.js",
			$dependencies,
			self::VERSION . '-' . filemtime( "{$path}dist/index.js" )
		);

	}

	public static function enqueueScripts() {

		$path         = self::$path;
		$url          = self::$url;

		wp_enqueue_style(
			'success-tool/button-row',
			"{$url}dist/css/styles.css",
			array(),
			self::VERSION . '-' . filemtime( "{$path}dist/css/styles.css" )
		);
	}
}

Button_Bar::init();
