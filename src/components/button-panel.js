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
							label: __( 'Add', 'successtools/button-bar' ),
							value: 'add',
						},
						{
							label: __( 'Academics', 'successtools/button-bar' ),
							value: 'academics',
						},
						{
							label: __( 'Athletics', 'successtools/button-bar' ),
							value: 'athletics',
						},

						{
							label: __( 'Bulletins', 'successtools/button-bar' ),
							value: 'bulletins',
						},
						{
							label: __( 'Buttons', 'successtools/button-bar' ),
							value: 'buttons',
						},
						{
							label: __( 'Back Arrow - Heavy', 'successtools/button-bar' ),
							value: 'back-arrow-heavy',
						},
						{
							label: __( 'Back Arrow - Light', 'successtools/button-bar' ),
							value: 'back-arrow-light',
						},
						{
							label: __( 'Calendar', 'successtools/button-bar' ),
							value: 'calendar',
						},
						{
							label: __( 'Call', 'successtools/button-bar' ),
							value: 'call',
						},
						{
							label: __( 'Dashboard - Heavy', 'successtools/button-bar' ),
							value: 'dashboard-heavy',
						},
						{
							label: __( 'Dashboard - Light', 'successtools/button-bar' ),
							value: 'dashboard-light',
						},
						{
							label: __( 'Directory', 'successtools/button-bar' ),
							value: 'directory',
						},
						{
							label: __( 'Discussion', 'successtools/button-bar' ),
							value: 'discussion',
						},
						{
							label: __( 'Down Arrow - Heavy', 'successtools/button-bar' ),
							value: 'down-arrow-heavy',
						},
						{
							label: __( 'Down Arrow - Light', 'successtools/button-bar' ),
							value: 'down-arrow-light',
						},
						{
							label: __( 'Drinks', 'successtools/button-bar' ),
							value: 'drinks',
						},
						{
							label: __( 'Email', 'successtools/button-bar' ),
							value: 'email',
						},
						{
							label: __( 'Food', 'successtools/button-bar' ),
							value: 'food',
						},
						{
							label: __( 'Gallery', 'successtools/button-bar' ),
							value: 'gallery',
						},
						{
							label: __( 'Grow', 'successtools/button-bar' ),
							value: 'grow',
						},
						{
							label: __( 'Home', 'successtools/button-bar' ),
							value: 'home',
						},
						{
							label: __( 'Learn', 'successtools/button-bar' ),
							value: 'learn',
						},
						{
							label: __( 'Location', 'successtools/button-bar' ),
							value: 'location',
						},
						{
							label: __( 'More', 'successtools/button-bar' ),
							value: 'more',
						},
						{
							label: __( 'Music', 'successtools/button-bar' ),
							value: 'music',
						},
						{
							label: __( 'Play - Light', 'successtools/button-bar' ),
							value: 'play-light',
						},
						{
							label: __( 'Plan', 'successtools/button-bar' ),
							value: 'plan',
						},
						{
							label: __( 'Post', 'successtools/button-bar' ),
							value: 'post',
						},
						{
							label: __( 'Refresh', 'successtools/button-bar' ),
							value: 'refresh',
						},
						{
							label: __( 'Settings', 'successtools/button-bar' ),
							value: 'settings',
						},
						{
							label: __( 'Smile', 'successtools/button-bar' ),
							value: 'smile',
						},
						{
							label: __( 'Thrive Leaves', 'successtools/button-bar' ),
							value: 'thrive-leaves',
						},
						{
							label: __( 'Text', 'successtools/button-bar' ),
							value: 'text',
						},
						{
							label: __( 'View', 'successtools/button-bar' ),
							value: 'view',
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
