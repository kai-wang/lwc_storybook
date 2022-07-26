import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean } from 'w/utilsPrivate';

const KIND = {
  fallbackValue: 'error',
  validValues: [
    'error',
    'info',
    'info-square',
    'success',
    'warning',
    'warning-alt'
  ]
};

const ICONS = {
  error: '/assets/custom/sprites-32.svg#error--filled',
  'info-square': '/assets/custom/sprites-32.svg#information--square--filled',
  info: '/assets/custom/sprites-32.svg#information--square--filled',
  success: '/assets/custom/sprites-32.svg#checkmark--filled',
  warning: '/assets/custom/sprites-32.svg#warning--filled',
  'warning-alt': '/assets/custom/sprites-32.svg#warning--alt--filled',
  close: '/assets/custom/sprites-32.svg#close'
};

export default class Alert extends LightningElement {
  @api title = '';
  @api subtitle = '';
  @api caption = '';
  @api dark = false;
  @api hideCloseButton = false;
  @api iconDescription = 'Close toast';
  @api role = 'alert';
  @api iconSize = '20';

  _kind = KIND.fallbackValue;
  _open = true;

  @api get kind() {
    return this._kind;
  }

  set kind(value) {
    this._kind = normalizeString(value, KIND);
  }

  @api get open() {
    return this._open;
  }

  set open(value) {
    this._open = value;
  }

  get computedClass() {
    return clsx(
      'bx--toast-notification',
      !this.dark && 'bx--toast-notification--low-contrast',
      `bx--toast-notification--${this._kind}`
    );
  }

  get icon() {
    return ICONS[`${this._kind}`];
  }

  get closeIcon() {
    return ICONS['close'];
  }

  handleClose(event) {
    event.stopPropagation();
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('close'));
    this.open = false;
  }
}
