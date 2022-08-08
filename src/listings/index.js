/**
 * BLOCK: aios-listings-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './sass/editor.scss';
import './sass/style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

import EditClass from './functions/edit.js';

registerBlockType( 'agentimage/aios-gutenberg', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'AIOS Gutenberg Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'aios-gutenberg' ),
		__( 'AIOS Gutenberg' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		listings: {
			type: 'object'
		}, 
		selectedTheme: {
			type: 'string',
			default: 'classic'
		}, 
		numberOfPost: {
			type: 'number',
			default: 4
		},
		featuredOnly: {
			type: 'boolean'
		}
	},
	edit: EditClass, 
	save: function() {
		return null;
	}
} );