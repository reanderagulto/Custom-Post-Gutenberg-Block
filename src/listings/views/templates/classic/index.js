import { __ } from '@wordpress/i18n';
import { 
    Placeholder, 
    PanelBody, 
    RangeControl, 
    SelectControl,
    CheckboxControl
} from '@wordpress/components';

import './style.scss';


function ClassicTheme ( listings ){
    return(
        <div class="aios-block-classic">
            {
                listings.map(listing => {
                    return (
                        <div class="aios-block-classic-item">
                            <a href={ listing.url } class="aios-block-classic-listing-item">
                                <div class="aios-block-classic-thumbnail">
                                    <canvas width="590" height="400" data-src={listing.image_full} style={{ backgroundImage: `url(${listing.image_full})` }}></canvas>
                                </div>
                                <div class="aios-block-classic-details">
                                        <div class="aios-block-classic-address">
                                            <i class="ai-font-location-c"></i>
                                            { listing.listing_details.address_street_name }
                                            <span>{ listing.listing_details.address_city }</span>
                                        </div>
                                    <div class="aios-classic-listing-price">{ listing.listing_details.list_price.toLocaleString() }</div>
                                </div>
                            </a>
                        </div>
                    );
                })
            }
        </div>
    )
}

export { ClassicTheme }