import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, synchronizeAttrs, uid } from 'w/utils';

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
  @api mode;
  @api value;

  @api calendar;

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

  get computedValue() {
    const p = this.calendar;
    return p?.range() ? ( this.mode === 'from' ? p?.inputValueFrom() : p?.inputValueTo() ) : p.inputValue() ;
  }

  get hasCalendar() {
    return this.calendar;
  }

  get computedHelperClass() {
    return clsx(
      'bx--form__helper-text',
      this.disabled && 'bx--form__helper-text--disabled'
    );
  }

  handleInput(event) {
    console.log(event.target.value);
    this.dispatch(event.target.value);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.dispatch(event.target.value);
  }

  handleKeydown(event) {
    console.log(event.target.value);
  }

  handleBlur(event) {
    console.log(event.target.value);
  }

  dispatch(value) {

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          type: this.mode,
          value: value
        }
      })
    );
  }

  openCalendar() {
    const { openCalendar } = this.calendar;
    openCalendar();
  }

  validandwarn() {
    return !this.invalid && this.warn;
  }

  renderedCallback() {
    const input = this.template.querySelector('input');
    synchronizeAttrs(input, {
      'data-invalid': this.invalid
    });
  }
}
