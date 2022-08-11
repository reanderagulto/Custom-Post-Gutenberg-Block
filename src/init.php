<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function aios_gutenberg_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'aios_gutenberg-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'aios_gutenberg-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'aios_gutenberg-cgb-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'agentimage/aios-gutenberg', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         	=> 'aios_gutenberg-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' 	=> 'aios_gutenberg-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  	=> 'aios_gutenberg-cgb-block-editor-css',
			// Render Callback
			'attributes'    	=> array(
					'listings'		=> array('type' => 'string',  'default' => '' ), 
					'selectedTheme' => array('type' => 'string',  'default' => 'classic'),
					'numberOfPost'  => array('type' => 'number',  'default' => 4),
					'featuredOnly'	=> array('type' => 'boolean', 'default' => false)
			),
			'render_callback' 	=> 'aios_gutenberg_render_callback'
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'aios_gutenberg_cgb_block_assets' );

/**
 * This function is called when the block is being rendered on the front end of the site
 *
 * @param array    $attributes     The array of attributes for this block.
 * @param string   $content        Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
 */
function aios_gutenberg_render_callback( $attributes, $content, $block_instance ){
	ob_start();
	/**
	 * Keeping the markup to be returned in a separate file is sometimes better, especially if there is very complicated markup.
	 * All of passed parameters are still accessible in the file.
	 */
	switch ($attributes['selectedTheme']){
		case 'classic':
			require plugin_dir_path( __FILE__ ) . 'listings/templates/classic/index.php';
			break;
		case 'default':
			require plugin_dir_path( __FILE__ ) . 'listings/templates/default/index.php';
			break;
		default:
	}
	return ob_get_clean();
}
