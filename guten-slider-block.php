<?php
/**
 * Plugin Name: Guten Slider Block
 * Plugin URI: https://github.com/achchu93/guten-slider-block
 * Description: Simple Slider Block
 * Author: Ahamed Arshad
 * Author URI: https://github.com/achchu93
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package gsblock
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
