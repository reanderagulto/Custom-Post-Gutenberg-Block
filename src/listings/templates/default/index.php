<?php
/**
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes     The array of attributes for this block.
 * @param string   $content        Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
 *
 * @package aios-gutenberg
 */

?>
<div class="aios-block-default">
	<?php if ( isset( $attributes['selectedTheme'] ) && isset($attributes['listings'])): ?>
		<?php foreach($attributes['listings'] as $key => $listing): ?>
			<div class="aios-block-default-item">
				<a href="<?=$listing['url']?>" class="aios-block-default-listing-item">
					<div class="aios-block-default-thumbnail">
					<canvas width="590" height="400" data-src="<?=$listing['image_full']?>" style="background-image: url(<?=$listing['image_full']?>)"></canvas>
					</div>
					<div class="aios-block-default-details">
						<div class="aios-default-listing-address"><?=$listing['listing_details']['full_address']?></div> 
						<div class="aios-default-listing-price"><?=$listing['listing_details']['list_price']?></div>
						<div class="aios-default-plan">
							<span>
								<em>Beds</em>
								<?=$listing['listing_details']['details_bedrooms']?>
							</span>
							<span>
								<em>Baths</em>
								<?=$listing['listing_details']['details_bathrooms']?>
							</span>
							<span>
								<em>SQ. FT</em>
								<?=$listing['listing_details']['details_lot_area']?>
							</span>
						</div>
					</div>
				</a>
			</div>
		<?php endforeach; ?>
	<?php endif; ?>
</div>