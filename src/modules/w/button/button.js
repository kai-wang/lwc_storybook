import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean } from 'w/utilsPrivate';

const KIND = {
  fallbackValue: 'primary',
  validValues: ['primary', 'secondary', 'outline', 'ghost']
};

const SIZE = {
  fallbackValue: 'base',
  validValues: ['base', 'xs', 'sm', 'lg', 'xl']
};

const TYPE = {
  fallbackValue: 'button',
  validValues: ['button', 'submit', 'reset']
};

const ICON_POSITION = {
  fallbackValue: 'right',
  validValues: ['left', 'right', 'center']
};

export default class Button extends LightningElement {
  @api icon;
  @api prefix = 'btn';
  @api iconOnly = false;
  @api disabled = false;
  @api loading = false;
  @api assistiveText;

  _size = SIZE.fallbackValue;
  _kind = KIND.fallbackValue;
  _type = TYPE.fallbackValue;
  _iconPosition = ICON_POSITION.fallbackValue;

  @api get size() {
    return this._size;
  }

  set size(value) {
    this._size = normalizeString(value, SIZE);
  }

  @api get kind() {
    return this._kind;
  }

  set kind(value) {
    this._kind = normalizeString(value, KIND);
  }

  @api get buttonType() {
    return this._type;
  }

  set buttonType(value) {
    this._type = normalizeString(value, TYPE);
  }

  @api get iconPosition() {
    return this._iconPosition;
  }

  set iconPosition(value) {
    this._iconPosition = normalizeString(value, ICON_POSITION);
  }

  get leftIcon() {
    return (
      normalizeBoolean(this.icon) &&
      this._iconPosition === 'left' &&
      !normalizeBoolean(this.loading)
    );
  }

  get rightIcon() {
    return (
      normalizeBoolean(this.icon) &&
      this._iconPosition === 'right' &&
      !normalizeBoolean(this.loading)
    );
  }

  get assistiveTextClass() {
    return clsx(`assistive-text`);
  }

  get computedClass() {
    return clsx(
      `${this.prefix}`,
      `${this.prefix}-size-${this._size}`,
      {
        [`${this.prefix}-disabled`]: normalizeBoolean(this.disabled)
      },
      {
        [`${this.prefix}-${this._kind}`]: !normalizeBoolean(this.disabled)
      }
    );
  }
}
