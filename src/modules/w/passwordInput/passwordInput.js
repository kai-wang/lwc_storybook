import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, synchronizeAttrs } from 'w/utilsPrivate';

const SIZE = {
  fallbackValue: 'sm',
  validValues: ['sm', 'xl']
};

const TOOLTIP_POSITION = {
  fallbackValue: 'right',
  validValues: ['top', 'right', 'bottom', 'left']
};

const TOOLTIP_ALIGNMENT = {
  fallbackValue: 'start',
  validValues: ['start', 'center', 'end']
}

export default class PasswordInput extends LightningElement {
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

  @api tooltipAlignment = TOOLTIP_ALIGNMENT.fallbackValue;
  @api tooltipPosition = TOOLTIP_POSITION.fallbackValue;
  @api type = 'password';

  @api id = 'pwdInput-' + Math.random().toString(16);
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
      !this.isFluid && 'bx--password-input-wrapper',
      this.inline && 'bx--text-input-wrapper--inline',
      this.light && 'bx--text-input-wrapper--light'
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

  get isNotFluidNotInlineWarn() {
    return !this.isFluid && !this.inline && this._warn;
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

  get isNotFluidInvalid() {
    return !this.isFluid && this._invalid;
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
      'bx--password-input',
      this.light && 'bx--text-input--light',
      this._invalid && 'bx--text-input--invalid',
      this._warn && 'bx--text-input--warn',
      `bx--text-input--${this.size}`
    );
  }

  get computedButtonClass() {
    return clsx(
      'bx--text-input--password__visibility__toggle',
      'bx--btn',
      'bx--btn--icon-only',
      this.disabled && 'bx--btn--disabled',
      'bx--tooltip__trigger',
      'bx--tooltip--a11y',
      `bx--tooltip--${this.tooltipPosition}`,
      `bx--tooltip--align-${this.tooltipAlignment}`
    );
  }

  handleInput(event) {
    this.value = event.target.value;
  }

  handleClick() {
    this.type = (this.type === 'password' ? 'text' : 'password');
  }

  get togglePasswordLabel() {
    return this.type === 'password' ? 'Show password' : 'Hide password';
  }

  get passwordType() {
    return this.type === 'password';
  }

  renderedCallback() {
    const elm = this.template.querySelector('.bx--text-input__field-wrapper');
    const inp = this.template.querySelector('input');
    synchronizeAttrs(elm, {
      'data-warn': this._warn,
      'data-invalid': this._invalid
    });
    synchronizeAttrs(inp, {
      'data-warn': this._warn,
      'data-invalid': this._invalid,
      'aria-invalid': this._invalid
    });

    console.log(this.template.querySelector('input'));
  }
}
