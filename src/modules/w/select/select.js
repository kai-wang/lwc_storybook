import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, synchronizeAttrs, uid} from 'w/utilsPrivate';

const SIZE = {
  fallbackValue: 'sm',
  validValues: ['sm', 'xl']
};

export default class Select extends LightningElement {
  @api hideLabel = false;
  @api invalidText = '';

  @api light = false;
  @api required = false;
  @api inline = false;
  @api readOnly = false;
  @api disabled = false;

  @api helperText = '';
  @api labelText = '';

  @api value = '';
  @api placeholder = '';
  @api name;

  @api id = uid('select-');
  _size = SIZE.fallbackValue;
  _invalid = false;
  _warn = false;
  @api selected;

  @api options = [];

  @api get size() {
    return this._size;
  }

  set size(value) {
    this._size = normalizeString(value, SIZE);
  }

  @api get invalid() {
    return this._invalid;
  }

  set invalid(value) {
    this._invalid = value;
  }

  @api get warn() {
    return this._warn;
  }

  set warn(value) {
    this._warn = value;
  }

  get warnId() {
    return `warn-${this.id}`;
  }

  get errorId() {
    return `error-${this.id}`;
  }

  get hasLabelText() {
    return !!this.labelText;
  }

  get hasHelperText() {
    return !!this.helperText;
  }

  get computedClass() {
    return clsx(
      'bx--form-item',
      'bx--select',
      this.inline && 'bx--select--inline',
      this.light && 'bx--select--light',
      this.invalid && 'bx--select--invalid',
      this.disabled && 'bx--select--disabled',
      this.warn && 'bx--select--warning'
    );
  }

  get computedLabelClass() {
    return clsx(
      'bx--label',
      this.hideLabel && 'bx--visually-hidden',
      this.disabled && 'bx--label--disabled'
    );
  }

  get computedSelectClass() {
    return clsx(
      'bx--select-input',
      `bx--select-input--${this.size}`
    );
  }

  get computedHelperClass() {
    return clsx(
      'bx--form__helper-text',
      this.disabled && 'bx--form__helper-text--disabled'
    );
  }

  get isNotInlineLabel() {
    return !this.inline && !!this.labelText;
  }

  get isValidAndWarn() {
    return !this._invaild && this._warn;
  }

  get isValidAndHelperText() {
    return !this._invaild && !!this.helperText;
  }

  renderedCallback() {
    const elm = this.template.querySelector('.bx--select-input__wrapper');
    const select = this.template.querySelector('select');
    synchronizeAttrs(elm, {
      'data-invalid': this._invalid
    });
    synchronizeAttrs(select, {
      'aria-describedby': this._invalid ? this.errorId : undefined,
      'aria-invalid': this._invalid,
      'disabled': this.disabled,
      'required': this.required
    });
  }

  handleChange(event) {
    this.selected = event.target.value;
  }
}
