import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean, uid } from 'w/utilsPrivate';
import { createCalendar } from './createCalendar';

const SIZE = {
  fallbackValue: 'sm',
  validValues: ['sm', 'xl']
};

export default class DatePickerInput extends LightningElement {
  @api type = 'text';
  @api placeholder = '';
  @api disabled = false;
  @api helpText = '';
  @api iconDescription = '';
  @api labelText = '';
  @api hideText = '';
  @api hideLabel = '';
  @api invalid = false;
  @api invalidText = '';
  @api warnText = '';
  @api warn = false;
  @api name;

  _id = uid('dpi-');
  _pattern = '\\d{1,2}\\/\\d{1,2}\\/\\d{4}';
  _size = SIZE.fallbackValue;

  @api get size() {
    return this._size;
  }

  set size(value) {
    this._size = normalizeString(value, SIZE);
  }

  get computedClass() {
    return clsx(
      'bx--date-picker-container',
      !this.labelText && 'bx--date-picker--nolabel'
    );
  }

  get computedLabelClass() {
    return clsx(
      'bx--label',
      this.hideLabel && 'bx--visually-hidden',
      this.disabled && 'bx--label--disabled'
    );
  }

  get computedContainerClass() {
    return clsx(
      'bx--date-picker-input__wrapper',
      this.invalid && 'bx--date-picker-input__wrapper--invalid',
      this.warn && 'bx--date-picker-input__wrapper--warn'
    );
  }

  get computedInputClass() {
    return clsx(
      'bx--date-picker__input',
      this.invalid && 'bx--date-picker__input--invalid',
      `bx--date-picker__input--${this._size}`
    );
  }
}
