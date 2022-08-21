import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean } from 'w/utilsPrivate';

const SIZE = {
  fallbackValue: 'sm',
  validValues: ['sm', 'xl']
};

export default class TextInput extends LightningElement {
  @api hideLabel = false;
  @api invaild = false;
  @api invalidText = '';

  @api warn = false;
  @api warnText;

  @api light = false;
  @api required = false;
  @api inline = false;
  @api readonly = false;
  @api disabled = false;

  @api helperText = '';
  @api labelText = '';

  @api value = '';
  @api placeholder = '';
  @api name;

  _id = 'textInput-' + Math.random().toString(16);
  _errorId = `error-${this._id}`;
  _warnId = `warn-${this._id}`;
  _size = SIZE.fallbackValue;

  @api get size() {
    return this._size;
  }

  set size(value) {
    this._size = normalizeString(value, SIZE);
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
      'bx--text-input-wrapper--inline' && this.inline,
      'bx--text-input-wrapper--light' && this.light,
      'bx--text-input-wrapper--readonly' && this.readonly
    );
  }

  get computedLabelClass() {
    return clsx(
      'bx--label',
      'bx--visually-hidden' && this.hideLabel,
      'bx--label--disabled' && this.disabled,
      'bx--label--inline' && this.inline,
      `bx--label--inline-${this.size}` && this.inline
    );
  }

  get computedHelperClass() {
    return clsx(
      'bx--form__helper-text',
      'bx--form__helper-text--disabled' && this.disabled,
      'bx--form__helper-text--inline' && this.inline
    );
  }

  get isNotFluidHelper() {
    return !this.isFluid && !!this.helperText;
  }

  get isNotInlineLabel() {
    return !this.inline && !!this.labelText;
  }

  get isValidAndWarn() {
    return !this.invaild && this.warn;
  }

  get ariaDescribedBy() {
    return this.invaild ? this._errorId : this.warn ? this._warnId : undefined;
  }

  get isFluidNotInlineInvalid() {
    return this.isFluid && !this.inline && this.invalid;
  }

  get isFluidNotInlineWarn() {
    return this.isFluid && !this.inline && this.warn;
  }

  get isNormalHelper() {
    return !this.invalid && !this.warn && !this.isFluid && !this.inline && !!this.helperText;
  }

  get isFluidInvalid() {
    return this.isFluid && this.invalid;
  }

  get isNotFluidValidWarn() {
    return !this.isFluid && !this.invaild && this.warn;
  }

  get computedOuterWrapper() {
    return clsx(
      'bx--text-input__field-outer-wrapper',
      'bx--text-input__field-outer-wrapper--inline' && this.inline
    );
  }

  get computedInnerWrapper() {
    return clsx(
      'bx--text-input__field-wrapper',
      'bx--text-input__field-wrapper--warning' && !this.invalid && this.warn
    );
  }
}
