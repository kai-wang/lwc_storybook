import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, synchronizeAttrs, uid } from 'w/utilsPrivate';

const SIZE = {
  fallbackValue: 'sm',
  validValues: ['sm', 'xl']
};

export default class TextInput extends LightningElement {
  @api hideLabel = false;
  @api invalidText = '';

  @api warnText;

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

  @api id = uid('textInput-');
  _size = SIZE.fallbackValue;
  _invalid = false;
  _warn = false;

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

  get hasHelper() {
    return !this.isFluid && !!this.helperText;
  }

  get computedClass() {
    return clsx(
      'bx--form-item',
      'bx--text-input-wrapper',
      this.inline && 'bx--text-input-wrapper--inline',
      this.light && 'bx--text-input-wrapper--light',
      this.readOnly && 'bx--text-input-wrapper--readonly'
    );
  }

  get computedLabelClass() {
    return clsx(
      'bx--label',
      this.hideLabel && 'bx--visually-hidden',
      this.disabled && 'bx--label--disabled',
      this.inline && 'bx--label--inline',
      `bx--label--inline--${this.size}`
    );
  }

  get computedHelperClass() {
    return clsx(
      'bx--form__helper-text',
      this.disabled && 'bx--form__helper-text--disabled',
      this.inline && 'bx--form__helper-text--inline'
    );
  }

  get isNotFluidHelper() {
    return !this.isFluid && !!this.helperText;
  }

  get isNotInlineLabel() {
    return !this.inline && !!this.labelText;
  }

  get isValidAndWarn() {
    return !this._invaild && this._warn;
  }

  get ariaDescribedBy() {
    return this._invaild ? this.errorId : this._warn ? this.warnId : this.id;
  }

  get isFluidNotInlineInvalid() {
    return this.isFluid && !this.inline && this._invalid;
  }

  get isFluidNotInlineWarn() {
    return this.isFluid && !this.inline && this._warn;
  }

  get isNormalHelper() {
    return (
      !this._invalid &&
      !this._warn &&
      !this.isFluid &&
      !this.inline &&
      !!this.helperText
    );
  }

  get isFluidInvalid() {
    return this.isFluid && this._invalid;
  }

  get isNotFluidValidWarn() {
    return !this.isFluid && !this.invaild && this._warn;
  }

  get computedOuterWrapper() {
    return clsx(
      'bx--text-input__field-outer-wrapper',
      this.inline && 'bx--text-input__field-outer-wrapper--inline'
    );
  }

  get computedInnerWrapper() {
    return clsx(
      'bx--text-input__field-wrapper',
      !this._invalid && this._warn && 'bx--text-input__field-wrapper--warning'
    );
  }

  get computedInputClass() {
    return clsx(
      'bx--text-input',
      this.light && 'bx--text-input--light',
      this._invalid && 'bx--text-input--invalid',
      this._warn && 'bx--text-input--warn',
      `bx--text-input--${this.size}`
    );
  }

  renderedCallback() {
    const elm = this.template.querySelector('.bx--text-input__field-wrapper');
    const inp = this.template.querySelector('input');
    synchronizeAttrs(elm, { 'data-warn': this._warn, 'data-invalid': this._invalid } );
    synchronizeAttrs(inp, { 'data-warn': this._warn, 'data-invalid': this._invalid, 'aria-invalid': this._invalid } );
  }
}
