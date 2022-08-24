import { LightningElement, api } from 'lwc';
import { clsx, normalizeString, normalizeBoolean, uid } from 'w/utils';

const LABEL_POSITION = {
  fallbackValue: 'right',
  validValues: ['left', 'right']
};

const ORIENTATION = {
  fallbackValue: 'horizontal',
  validValues: ['horizontal', 'vertical']
};

export default class RadioGroup extends LightningElement {
  @api selected;
  @api disabled = false;
  @api legendText = '';
  @api hideLegend = false;

  @api id = uid('rg-');

  _labelPosition = LABEL_POSITION.fallbackValue;
  _orientation = ORIENTATION.fallbackValue;
  _options = [];

  @api get labelPosition() {
    return this._labelPosition;
  }

  set labelPosition(value) {
    this._labelPosition = normalizeString(value, LABEL_POSITION);
  }

  @api get orientation() {
    return this._orientation;
  }

  set orientation(value) {
    this._orientation = normalizeString(value, ORIENTATION);
  }

  @api get options() {
    return this._options;
  }

  set options(data) {
    const currentValue = this.selected;

    if (Array.isArray(data)) {
      this._options = data.map((option) => ({
        label: option.label,
        value: option.value,
        checked: normalizeBoolean(option.checked),
        disabled: normalizeBoolean(option.disabled),
        id: uid('radio-')
      }));
    }
    return [];
  }

  get computedClass() {
    return clsx(
      'bx--radio-button-group',
      this._orientation === 'vertical' && 'bx--radio-button-group--vertical',
      `bx--radio-button-group--label-${this._labelPosition}`
    );
  }

  get computedLegendClass() {
    return clsx('bx--label', this.hideLegend && 'bx--visually-hidden');
  }

  get computedRadioClass() {
    return clsx(
      'bx--radio-button-wrapper',
      this._labelPosition === 'left' && 'bx--radio-button-wrapper--label-left'
    );
  }

  get computedLabelClass() {
    return clsx(this.hideLabel && 'bx--visually-hidden');
  }

  handleChange(event) {
    event.stopPropagation();
    this.updateValue(event.target.value);

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: event.target.value,
        composed: true,
        bubbles: true,
        cancelable: true
      })
    );
  }

  updateValue(value) {
    this.selected = value;

    this._options = this._options.map((option) => ({
      ...option,
      checked: option.value == value
    }));
  }
}
