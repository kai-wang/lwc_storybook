import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean, uid } from 'w/utilsPrivate';
import rangePlugin from '../datePicker/rangePicker';
import { createCalendar } from './createCalendar';

const SIZE = {
  fallbackValue: 'sm',
  validValues: ['sm', 'xl']
};

export default class DatePickerInput extends LightningElement {
  @wire(ContextProvider.Provider) _context;

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

  _inputIds;

  get context() {
    return this._context;
  }

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

  get computedValue() {
    { range, inputIds, inputValueFrom, inputValueTo, inputValue } = this.context;

    return range
      ? inputIds.indexOf(this._id) === 0
        ? inputValueFrom
        : inputValueTo
      : inputValue;
  }

  get hasCalendar() {
    return this.context.hasCalendar;
  }

  get computedHelperClass() {
    return clsx(
      'bx--form__helper-text',
      this.disabled && 'bx--form__helper-text--disabled'
    );
  }

  handleInput(event) {
    console.log(event.target.value);
  }

  handleChange(event) {
    console.log(event.target.value);
  }

  handleKeydown(event) {
    console.log(event.target.value);
  }

  handleBlur(event) {
    console.log(event.target.value);
  }

  openCalendar() {
    this.context.openCalendar();
  }

  validandwarn() {
    return !this.invalid && this.warn;
  }
}
