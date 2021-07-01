/**
 * BLOCK: guten-slider-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, useBlockProps, InspectorControls,  } = wp.blockEditor;
const {
	ToggleControl,
	TextControl,
	PanelBody,
	PanelRow,
	ButtonGroup,
	Button,
	BaseControl,
} = wp.components;

/**
 * Register: Guten Slider Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

const allowedBlocks = [ "gsb/block-guten-slider-item" ];

registerBlockType("gsb/block-guten-slider", {
	title: __("Guten Slider"),
	icon: "slides",
	category: "common",
	keywords: [__("Guten Slider"), __("gsb"), __("slider")],
	attributes: {
		autoplay: {
			type: "boolean",
			default: false,
		},
		autoplayDuration: {
			type: "number",
			default: 5000
		},
		bulletNav: {
			type: "boolean",
			default: true
		},
		arrowNav: {
			type: "boolean",
			default: true
		},
		animation: {
			type: "text",
			default: "slide"
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( {
		attributes: { autoplay, autoplayDuration, bulletNav, arrowNav, animation },
		setAttributes
	} ) => {
		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				<InspectorControls key="setting">
					<PanelBody title={__("Slider Settings")} initialOpen={true}>
						<PanelRow>
							<fieldset>
								<ToggleControl
									label={__("Enable Autoplay")}
									checked={autoplay}
									onChange={(autoplay) =>
										setAttributes({ autoplay })
									}
									help={__("Enable autoplaying the slides")}
								/>
							</fieldset>
						</PanelRow>
						{autoplay && (
							<PanelRow>
								<fieldset>
									<TextControl
										label={__("Autoplay Duration")}
										value={autoplayDuration}
										onChange={(autoplayDuration) =>
											setState({ autoplayDuration })
										}
										help={__(
											"Autoplay duration in Milliseconds"
										)}
									/>
								</fieldset>
							</PanelRow>
						)}
						<PanelRow>
							<fieldset>
								<ToggleControl
									label={__("Enable Bullet Navigation")}
									checked={bulletNav}
									onChange={(bulletNav) =>
										setAttributes({ bulletNav })
									}
									help={__("Show bullets to navigate slides")}
								/>
							</fieldset>
						</PanelRow>
						<PanelRow>
							<fieldset>
								<ToggleControl
									label={__("Enable Arrow Navigation")}
									checked={arrowNav}
									onChange={(arrowNav) =>
										setAttributes({ arrowNav })
									}
									help={__(
										"Show arrows horizontally to navigate slides"
									)}
								/>
							</fieldset>
						</PanelRow>
						<PanelRow>
							<fieldset>
								<label>{__("Animation")}</label>
								<ButtonGroup
									aria-label={__("Animation Type")}
									title="xxx"
									label="ssss"
								>
									{[
										"slide",
										"fade",
										"cube",
										"coverflow",
										"flip",
									].map((_animation) => {
										return (
											<Button
												isSmall
												isPrimary={
													animation === _animation
												}
												onClick={() =>
													setAttributes({
														animation: _animation,
													})
												}
											>
												{_animation}
											</Button>
										);
									})}
								</ButtonGroup>
							</fieldset>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<InnerBlocks allowedBlocks={allowedBlocks} />
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: (props) => {
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		);
	},
});
