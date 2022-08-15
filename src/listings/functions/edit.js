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
    CheckboxControl,
    Button
} from '@wordpress/components';

import SortableGrid from '../components/SortableGrid';

const { serverSideRender: ServerSideRender } = wp;

export default function Edit ( props ){
    const { className, attributes, setAttributes } = props;
    const blockProps = useBlockProps();

    function fetchdata(){
        let customListing = "";
        axios.get('/wp-json/aios-listings/v1/listing', {
            params: {
                'posts_per_page': props.attributes.numberOfPost,
                'featured_only' : (props.attributes.featuredOnly == true) ? 1 : '' 
            }
        }).then( (response) => {
            let customList = [];
            response.data.forEach(element => {
                customList.push( { 
                    'url'                 : element.url, 
                    'image_full'          : element.image_full,
                    'address_street_name' : element.listing_details.address_street_name,
                    'address_city'        : element.listing_details.address_city,
                    'list_price'          : element.listing_details.list_price,
                    'details_bedrooms'    : element.listing_details.details_bedrooms,
                    'details_bathrooms'   : element.listing_details.details_bathrooms,
                    'details_lot_area'    : element.listing_details.details_lot_area,
                    'full_address'        : element.listing_details.full_address
                    } );
            });
            customListing = JSON.stringify(customList);
            props.setAttributes( { sorted: customListing } );
        });
    }

    function updatelistings(){
        if( !props.attributes.sorted ){
            fetchdata();
        }
    }
    function updateSelectedTheme( val ) {
        props.setAttributes( { selectedTheme: val } );
        fetchdata();
    }
    function updateNoPost( val ) {
        props.setAttributes( { numberOfPost: val } );
        fetchdata();
    }
    function updateFeaturedOnly( val ) {
        props.setAttributes( { featuredOnly: val } );
        fetchdata();
    }

    updatelistings();

    return (
        <div { ...blockProps }>
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
                    
                    <fieldset class="aios-form-group">
                        <div class="aios-block-col">
                            <legend for="numberOfPost">
                                { __( 'Sorting', 'aios-listings' ) }
                            </legend>
                        </div>
                        <div class="aios-block-col">
                            <SortableGrid items={ JSON.parse(props.attributes.sorted) } attribs={ props }/>
                        </div>
                    </fieldset>
                </PanelBody>
            </InspectorControls>

            <div class="aios-block-preview">
                <ServerSideRender 
                    block="agentimage/aios-gutenberg"
                    attributes={ props.attributes }
                />
            </div>

        </div>
    );
}