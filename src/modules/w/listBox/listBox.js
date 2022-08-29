import { LightningElement, api } from 'lwc';
import { clsx, normalizeString, keyCodes } from 'w/utils';

const SIZE = {
  fallbackValue: 'xl',
  validValues: ['sm', 'xl']
};

const TYPE = {
  fallbackValue: 'default',
  validValues: ['default', 'inline']
};

export default class ListBox extends LightningElement {
  _type = TYPE.validValues;
  _size = SIZE.fallbackValue;

  @api open = false;
  @api light = false;
  @api disabled = false;
  @api invalid = false;
  @api invalidText;
  @api warn = false;
  @api warnText;

  @api get size() {
    return this._size;
  }

  set size(value) {
    this._size = normalizeString(value, SIZE);
  }

  @api get type() {
    return this._type;
  }

  set type(value) {
    this._type = normalizeString(value, TYPE);
  }

  get validWarn() {
    return !this.invalid && this.warn;
  }

  get computedClass() {
    return clsx(
      'bx--list-box',
      `bx--list-box--sm--${this.size}`,
      this.type === 'inline' && 'bx--list-box--inline',
      this.disabled && 'bx--list-box--disabled',
      this.open && 'bx--list-box--expanded',
      this.light && 'bx--list-box--light',
      !this.invalid && this.warn && 'bx--list-box--warning'
    );
  }

  handleKeyDown(e) {
    if (e.keyCode === keyCodes.escape) {
      e.stopPropagation();
    }
  }

  handleClick(e) {
    e.preventDefault();
  }
}
