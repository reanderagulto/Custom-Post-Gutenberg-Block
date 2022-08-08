import { __ } from '@wordpress/i18n';
import { 
    Placeholder, 
    PanelBody, 
    RangeControl, 
    SelectControl,
    CheckboxControl
} from '@wordpress/components';

import './style.scss';


function DefaultTheme ( listings ){
    return(
        <div class="aios-block-default">
            {
                listings.map(listing => {
                    return (
                        <div class="aios-block-default-item">
                            <a href={ listing.url } class="aios-block-default-listing-item">
                                <div class="aios-block-default-thumbnail">
                                    <canvas width="590" height="400" data-src={listing.image_full} style={{ backgroundImage: `url(${listing.image_full})` }}></canvas>
                                </div>
                                <div class="aios-block-default-details">
                                    <div class="aios-default-listing-address">{ listing.listing_details.full_address }</div> 
                                    <div class="aios-default-listing-price">{ listing.listing_details.list_price.toLocaleString() }</div>
                                    <div class="aios-default-plan">
                                        <span>
                                            <em>Beds</em>
                                            { listing.listing_details.details_bedrooms }
                                        </span>
                                        <span>
                                            <em>Baths</em>
                                            { listing.listing_details.details_bathrooms }
                                        </span>
                                        <span>
                                            <em>SQ. FT</em>
                                            { listing.listing_details.details_lot_area }
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    );
                })
            }
        </div>
    )
}

export { DefaultTheme }