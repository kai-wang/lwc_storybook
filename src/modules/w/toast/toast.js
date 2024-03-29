import { LightningElement, api } from 'lwc';
import { clsx, normalizeString } from 'w/utils';

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
  'error': 'ErrorFilled',
  'info-square': 'InformationSquareFilled',
  'info': 'InformationFilled',
  'success': 'CheckmarkFilled',
  'warning': 'WarningFilled',
  'warning-alt': 'WarningAltFilled',
  'close': 'Close'
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
