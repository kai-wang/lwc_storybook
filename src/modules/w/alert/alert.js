import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean } from 'w/utilsPrivate';

const KIND = {
  fallbackValue: 'error',
  validValues: ['info', 'success', 'warn', 'error']
};

export default class Alert extends LightningElement {
  @api prefix = 'alert';
  @api dismissible = false;
  @api icon = '/assets/custom/sprites-32.svg#information';
  @api close_icon = '/assets/custom/sprites-32.svg#close';
  @api title;

  _kind = KIND.fallbackValue;
  _close = false;

  @api get kind() {
    return this._kind;
  }

  set kind(value) {
    this._kind = normalizeString(value, KIND);
  }

  get computedClass() {
    return clsx(
      `${this.prefix}`,
      `${this.prefix}-inline`,
      `${this.prefix}-${this._kind}`,
      {
        [`${this.prefix}-hidden`]: this._close
      }
    );
  }

  get detailClass() {
    return clsx(`${this.prefix}-inline_detail`);
  }

  get iconClass() {
    return clsx(`${this.prefix}-inline_icon`, `${this.prefix}-${this._kind}_icon`);
  }

  get closeIconClass() {
    return clsx(`${this.prefix}-inline_close_icon`);
  }

  handleClose() {
    this._close = true;
  }
}
