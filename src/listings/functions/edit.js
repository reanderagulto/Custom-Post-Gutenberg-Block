import { __ } from '@wordpress/i18n';
import axios from 'axios'
import {
    useBlockProps,
    RichText,
    AlignmentToolbar,
    BlockControls,
    InspectorControls
} from '@wordpress/block-editor';
import { 
    Placeholder, 
    PanelBody, 
    RangeControl, 
    SelectControl,
    CheckboxControl
} from '@wordpress/components';
import { useState } from '@wordpress/element';

import '../sass/editor.scss';

// Import Themes
import { ClassicTheme } from '../views/templates/classic/index.js';
import { DefaultTheme } from '../views/templates/default/index.js';

export default function Edit ( props ){
    const { className, attributes, setAttributes } = props;

    function updatelistings(){
        if( ! props.attributes.listings ) {
            axios.get('/wp-json/aios-listings/v1/listing', {
                params: {
                    'posts_per_page': props.attributes.numberOfPost,
                    'featured_only' : (props.attributes.featuredOnly == true) ? 1 : '' 
                }
            }).then( (response) => {
                props.setAttributes( { listings: response.data } )
            })
        }
    }

    function updateSelectedTheme( val ) {
        props.setAttributes( { selectedTheme: val } );
        updatelistings();
    }
    
    function updateNoPost( val ) {
        props.setAttributes( { numberOfPost: val } );
        updatelistings();
    }
    
    function updateFeaturedOnly( val ) {
        props.setAttributes( { featuredOnly: val } );
        updatelistings();
    }

    updatelistings();

    if( ! props.attributes.listings ){
        return 'Loading...';
    }

    return (
        <div { ...useBlockProps }>
            <InspectorControls>
                <PanelBody
                    title={ __('Listings Settings') }
                    initialOpen={ true }
                    className="aios-block-container"
                >
                    <fieldset className="aios-form-group">
                        <div class="aios-block-col">
                            <legend for="selectedTheme">
                                { __( 'Select Theme:', 'aios-listings' ) }
                            </legend>
                        </div>
                        <div class="aios-block-col">
                            <SelectControl
                                className="aios-form-control"
                                name="selectedTheme"
                                id="selectedTheme"
                                value={ attributes.selectedTheme }
                                options={ [
                                    { label: 'Classic', value: 'classic' },
                                    { label: 'Default', value: 'default' },
                                ] }
                                onChange={ ( val ) => updateSelectedTheme(val) }
                            />
                        </div>
                    </fieldset>
                    <fieldset className="aios-form-group">
                        <div class="aios-block-col">
                            <legend for="numberOfPost">
                                { __( 'Number of Post:', 'aios-listings' ) }
                            </legend>
                        </div>
                        <div class="aios-block-col">
                            <RangeControl
                                value={ attributes.numberOfPost }
                                className="aios-form-control"
                                name="numberOfPost"
                                id="numberOfPost"
                                min={ 1 }
                                max={ 10 }
                                onChange={ ( val ) => updateNoPost(val) }
                            />
                        </div>
                    </fieldset>
                    <fieldset className="aios-form-group aios-checkbox">
                        <div class="aios-block-col">
                            <legend for="numberOfPost">
                                { __( 'Featured Only?', 'aios-listings' ) }
                            </legend>
                        </div>
                        <div class="aios-block-col">
                            <CheckboxControl
                                name="featuredOnly"
                                id="featuredOnly"                               
                                className="aios-form-control"
                                checked={ attributes.featuredOnly }                        
                                onChange={ ( val ) => updateFeaturedOnly(val) }
                            />
                        </div>
                    </fieldset>
                </PanelBody>
            </InspectorControls>

            <div class="aios-block-preview">
                { props.attributes.selectedTheme === 'classic' && ClassicTheme(props.attributes.listings) }
                { props.attributes.selectedTheme === 'default' && DefaultTheme(props.attributes.listings) }
            </div>

        </div>
    );
}