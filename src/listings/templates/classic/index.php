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
<div class="aios-block-classic">
	<?php if ( isset( $attributes['selectedTheme'] ) && isset($attributes['listings'])): ?>
		<?php foreach(json_decode($attributes['sorted'], true) as $key => $listing): ?>
			<div class="aios-block-classic-item">
				<a href="<?=$listing['url']?>" class="aios-block-classic-listing-item">
					<div class="aios-block-classic-thumbnail">
						<canvas width="590" height="400" data-src="<?=$listing['image_full']?>" style="background-image: url(<?=$listing['image_full']?>)"></canvas>
					</div>
					<div class="aios-block-classic-details">
							<div class="aios-block-classic-address">
								<i class="ai-font-location-c"></i>
								<?=$listing['address_street_name']?>
								<span>
									<?=$listing['address_city']?>
								</span>
							</div>
						<div class="aios-classic-listing-price">
							<?=$listing['list_price']?>
						</div>
					</div>
				</a>
			</div>
		<?php endforeach; ?>
	<?php endif; ?>
</div>