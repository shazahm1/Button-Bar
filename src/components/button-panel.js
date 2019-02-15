/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const {
	      BaseControl,
	      // Button,
	      ColorIndicator,
	      // ColorPalette,
	      // ColorPicker,
	      // Dashicon,
	      Panel,
	      PanelBody,
	      SelectControl,
	      // TextareaControl,
	      TextControl,
      } = wp.components;
const {
	      Component,
	      Fragment,
      } = wp.element;

const {
	      // InspectorControls,
	      ColorPalette,
	      // PanelColorSettings,
	      // ContrastChecker
      } = wp.editor;

/**
 * Internal dependencies
 */
import './styles.scss';

const labelElement = ( label, value ) => (
	<Fragment>
		{ label }
		{ value && (
			<ColorIndicator
				colorValue={ value }
			/>
		) }
	</Fragment>
);

export class ButtonPanel extends Component {

	constructor() {
		super( ...arguments );
		this.setField = this.setField.bind( this );
	}

	setField( index, field, value ) {

		const { buttons, onChange } = this.props;

		// console.log( 'buttons', buttons );

		const updated = buttons.map( ( button, i ) => {

			if ( i === index ) {

				// console.log( 'index', index );
				// console.log( 'field', field );
				// console.log( 'value', value );

				button[ field ] = value;
			}

			return button;
		});

		// console.log( 'updated', updated );

		onChange( updated );
	}

	render() {

		const { buttons } = this.props;

		const rows = buttons.map( ( button, index ) => (

			<PanelBody
				title={sprintf( __( 'Button %d', 'successtools/button-bar' ), index + 1 ) }
				key={index}
				initialOpen={false}
			>
				<SelectControl
					label={__( 'Icons', 'successtools/button-bar' )}
					options={[
						{
							label: __( 'Buttons', 'successtools/button-bar' ),
							value: 'buttons',
						},
						{
							label: __( 'Back Arrow', 'successtools/button-bar' ),
							value: 'back-arrow',
						},
						{
							label: __( 'Down Arrow', 'successtools/button-bar' ),
							value: 'down-arrow',
						},
						{
							label: __( 'Dashboard', 'successtools/button-bar' ),
							value: 'dashboard',
						},
					]}
					value={button.icon}
					onChange={value => this.setField( index, 'icon', value )}
				/>

				<BaseControl
					className="editor-color-palette-control"
					label={labelElement( __( 'Icon Color', 'successtools/button-bar' ), button.color ) }
				>
					<ColorPalette
						className="editor-color-palette-control__color-palette"
						value={button.color}
						onChange={value => this.setField( index, 'color', value )}
					/>
				</BaseControl>

				<BaseControl
					className="editor-color-palette-control"
					label={labelElement( __( 'Background Color', 'successtools/button-bar' ), button.backgroundColor ) }
				>
					<ColorPalette
						className="editor-color-palette-control__color-palette"
						value={button.backgroundColor}
						onChange={value => this.setField( index,'backgroundColor', value )}
					/>
				</BaseControl>

				<TextControl
					label={__( 'HTML Anchor', 'connections' )}
					help={__( 'Anchors lets you link directly to a web page or a section within a web page.', 'successtools/button-bar' )}
					value={button.link}
					onChange={value => this.setField( index,'link', value )}
				/>

			</PanelBody>

		) );

		return (
			<div className="component__buttons">
				<Panel className="component__buttons__panel">{ rows }</Panel>
			</div>
		);
	}

}

export default ButtonPanel;
