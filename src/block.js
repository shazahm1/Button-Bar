/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	      InspectorControls,
	      // InspectorAdvancedControls,
      } = wp.editor;
const {
	      // ServerSideRender,
	      PanelBody,
	      // CheckboxControl,
	      RangeControl,
	      // SelectControl,
	      // TextControl,
	      // ToggleControl
      } = wp.components;
const {
	      // Component,
	      Fragment,
      } = wp.element;

/**
 * Internal dependencies
 */
import ButtonPanel from './components/button-panel.js';
import icons from './icons';
import './styles.scss';

/**
 * Module constants
 */
// let DEFAULT_BUTTON = {
// 	backgroundColor: '#000000',
// 	color:           '#FFFFFF',
// };

function renderButtons( buttons ) {

	let rendered = [];

	for ( const [ index, button ] of buttons.entries() ) {

		rendered.push(
			<a
				key={index}
				className={'success-tools-button'}
				href={button.link}
				style={{
					backgroundColor: button.backgroundColor
				}}
			>
				<i
					className={button.icon}
					style={{
						backgroundColor: button.color
					}}
				/>
			</a>
		);
	}

	return rendered;
}

/**
 * Register Block
 */
registerBlockType(
	'success-tool/button-row',
	{
		title:      __( 'Button Bar', 'successtools/button-bar' ),
		icon:       icons.button,
		category:   'layout',
		keywords:   [
			'button',
		],
		supports:   {
			// Remove the support for the generated className.
			className:       false,
			// Remove the support for the custom className.
			customClassName: false,
			// Remove the support for editing the block using the block HTML editor.
			html:            false,
		},
		attributes: {
			buttons:   {
				type:    'array',
				default: [
					{
						backgroundColor: '#000000',
						color:           '#FFFFFF',
						icon:            'buttons',
						link:            '#',
					},
					{
						backgroundColor: '#000000',
						color:           '#FFFFFF',
						icon:            'buttons',
						link:            '#',
					}
				],
			},
			number:    {
				type:    'integer',
				default: 2,
			},
			rowHeight: {
				type:    'integer',
				default: 60,
			},
		},
		edit:       ( { attributes, setAttributes } ) => {

			const {
				      buttons,
				      number,
				      rowHeight,
			      } = attributes;

			const addButton = count => {

				let value = buttons.slice( 0, count );

				while ( count > value.length ) {

					console.log( 'Add Button' );
					value.push( {
						backgroundColor: '#000000',
						color:           '#FFFFFF',
						icon:            'buttons',
						link:            '#',
					} );
				}

				setAttributes( { buttons: value } );
			};

			let renderedButtons = renderButtons( buttons );

			return (
				<Fragment>
					<InspectorControls>
						<PanelBody
							title={__( 'Row Options', 'successtools/button-bar' )}
							initialOpen={true}
						>

							<RangeControl
								label={__( 'Row height', 'successtools/button-bar' )}
								help={__( 'The button row height can be set any where between 40 and 100 pixels.', 'successtools/button-bar' )}
								min={40}
								max={100}
								step={2}
								// allowReset={ true }
								initialPosition={60}
								value={rowHeight}
								onChange={( value ) => {
									setAttributes( { rowHeight: value, } );
								}}
							/>

							<RangeControl
								label={__( 'The number of buttons to display in the row.', 'successtools/button-bar' )}
								min={2}
								max={5}
								// allowReset={ true }
								initialPosition={2}
								value={number}
								onChange={ ( value ) => {
									addButton( value );
									setAttributes( { number: value } );
								}}
							/>

						</PanelBody>

						{buttons.length ? (
							<PanelBody
								className={'editor-panel-color-settings'}
								title={__( 'Buttons', 'successtools/button-bar' )}
								initialOpen={true}
							>
								<ButtonPanel
									buttons={buttons}
									onChange={ ( value ) => {
										setAttributes( { buttons: value } );
									}}
								/>
							</PanelBody>
						) : null}

					</InspectorControls>
					<div
						className={ classnames( 'success-tools-button-row' ) }
						style={{ height: rowHeight + 'px' }}
					>

						{renderedButtons}

					</div>
				</Fragment>
			);
		},
		save:       ( props ) => {

			const { attributes: { buttons, rowHeight } } = props;

			let renderedButtons = renderButtons( buttons );

			return (
				<div
					className={ classnames( 'success-tools-button-row' ) }
					style={{ height: rowHeight + 'px' }}
				>
					{renderedButtons}

				</div>
			);
		},
	} );
