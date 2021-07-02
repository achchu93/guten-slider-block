/**
 * BLOCK: guten-slider-item
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload } = wp.editor;
const { useBlockProps, InspectorControls, MediaPlaceholder } = wp.blockEditor;
const {
	ToggleControl,
	TextControl,
	PanelBody,
	PanelRow,
	ButtonGroup,
	Button,
	ColorPicker,
} = wp.components;
const { isEmpty, pick, replace, capitalize } = lodash;
const allowedMediaTypes = ["image", "video"];

/**
 * Register: Guten Slider Item.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("gsb/block-guten-slider-item", {
	title: __("Guten Slider Item"),
	parent: ["gsb/block-guten-slider"],
	icon: "slides",
	category: "common",
	keywords: [__("Guten Slider Item"), __("gsb"), __("slider")],
	attributes: {
		content: {
			type: "string",
			default: "",
		},
		link: {
			type: "string",
			default: "",
		},
		alignment: {
			type: "string",
			default: "left",
		},
		media: {
			type: "object",
			default: {},
		},
		target: {
			type: "string",
			default: "_blank",
		},
		enableButton: {
			type: "boolean",
			default: true,
		},
		buttonText: {
			type: "string",
			default: "Click Me",
		},
		buttonType: {
			type: "string",
			default: "rounded",
		},
		buttonColor: {
			type: "string",
			default: "#fff",
		},
		buttonBgColor: {
			type: "string",
			default: "#007cba",
		},
		buttonUrl: {
			type: "string",
			default: "",
		},
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
	edit: ({
		attributes: {
			content,
			link,
			alignment,
			media,
			enableButton,
			buttonText,
			buttonType,
			buttonColor,
			buttonBgColor,
			target,
		},
		setAttributes,
		clientId,
	}) => {
		const blockProps = useBlockProps();
		const onMediaSelect = (mediaInfo) => {
			const data = pick(mediaInfo, [
				"url",
				"id",
				"sizes",
				"type",
				"width",
				"height",
			]);
			setAttributes({ media: data });
		};

		return (
			<div {...blockProps}>
				<InspectorControls key="setting">
					{!isEmpty(media) && (
						<Fragment>
							<PanelBody
								title={__("Slide Image")}
								initialOpen={true}
							>
								<PanelRow>
									<MediaUpload
										title={__("Slide image")}
										onSelect={onMediaSelect}
										allowedTypes={allowedMediaTypes}
										value={media.id}
										render={({ open }) => (
											<a onClick={open}>
												<img src={media.url} />
											</a>
										)}
									/>
								</PanelRow>
							</PanelBody>
							<PanelBody
								title={__("Slide Button")}
								initialOpen={false}
							>
								<PanelRow>
									<ToggleControl
										label={__("Enable Slide Button")}
										checked={enableButton}
										onChange={(enableButton) =>
											setAttributes({ enableButton })
										}
										help={__(
											"Show button at end of slide content"
										)}
									/>
								</PanelRow>
								{enableButton && (
									<Fragment>
										<PanelRow>
											<TextControl
												label={__("Button Text")}
												value={buttonText}
												onChange={(buttonText) =>
													setAttributes({ buttonText })
												}
												help={__("Slide button text")}
											/>
										</PanelRow>
										<PanelRow>
											<fieldset>
												<legend>
													{__("Button Type")}
												</legend>
												<ButtonGroup
													id={`${clientId}-button-type`}
													aria-label={__(
														"Button Type"
													)}
												>
													{[
														"rounded",
														"flat",
														"border",
													].map((_type) => {
														return (
															<Button
																isSmall
																isPrimary={
																	buttonType ===
																	_type
																}
																onClick={() =>
																	setAttributes(
																		{
																			buttonType: _type,
																		}
																	)
																}
															>
																{capitalize(_type)}
															</Button>
														);
													})}
												</ButtonGroup>
											</fieldset>
										</PanelRow>
										<PanelRow>
											<fieldset>
												<legend className="blocks-base-control__label">
													{__("Button Text Color")}
												</legend>
												<ColorPicker
													color={buttonColor}
													onChangeComplete={(color) =>
														setAttributes({
															buttonColor:
																color.hex,
														})
													}
													disableAlpha
												/>
											</fieldset>
										</PanelRow>
										<PanelRow>
											<fieldset>
												<legend className="blocks-base-control__label">
													{__("Button Color")}
												</legend>
												<ColorPicker
													color={buttonBgColor}
													onChangeComplete={(color) =>
														setAttributes({
															buttonBgColor:
																color.hex,
														})
													}
													disableAlpha
												/>
											</fieldset>
										</PanelRow>
									</Fragment>
								)}
							</PanelBody>
							<PanelBody
								title={__("Slide URL")}
								initialOpen={false}
							>
								<PanelRow>
									<TextControl
										label={__("Slide Url")}
										value={link}
										onChange={(link) => setAttributes({ link })}
										help={__("Set a link for the slide")}
									/>
								</PanelRow>
								<PanelRow>
									<fieldset>
										<legend>{__("Slide URL Type")}</legend>
										<ButtonGroup
											aria-label={__("Slide URL Type")}
										>
											{["_blank", "_self", "_parent", "_top"].map(
												(_target) => {
													return (
														<Button
															isSmall
															isPrimary={
																target ===
																_target
															}
															onClick={() =>
																setAttributes({
																	target: _target,
																})
															}
														>
															{capitalize(
																replace(
																	_target,
																	"_",
																	""
																)
															)}
														</Button>
													);
												}
											)}
										</ButtonGroup>
									</fieldset>
								</PanelRow>
							</PanelBody>
						</Fragment>
					)}
				</InspectorControls>
				{isEmpty(media) ? (
					<MediaPlaceholder
						onSelect={onMediaSelect}
						allowedTypes={["image", "video"]}
						multiple={false}
						labels={{ title: "Slider Image" }}
						addToGallery={true}
						autoOpenMediaUpload={true}
					/>
				) : (
					<figure className="slide-figure">
						{media.type === "video" ? (
							<video src={media.url} />
						) : (
							<img src={media.url} />
						)}
						<RichText
							className="slide-content"
							tagName="div"
							placeholder={__("Add your slider content here")}
							onChange={() => {
								setAttributes({ content });
							}}
							value={content}
						/>
					</figure>
				)}
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
		return (
			<div className={props.className}>
				<p>Slider Item</p>
			</div>
		);
	},
});
