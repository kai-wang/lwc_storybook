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
  @api icon = '/assets/custom/sprites-16.svg#close--filled';
  @api close_icon = '/assets/custom/sprites-32.svg#close';
  @api title;

  _kind = KIND.fallbackValue;

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
      `${this.prefix}-${this._kind}`
    );
  }

  get detailClass() {
    return clsx(`${this.prefix}-inline_detail`);
  }

  get iconClass() {
    return clsx(`${this.prefix}-inline_icon`);
  }

  get closeIconClass() {
    return clsx(`${this.prefix}-inline_close_icon`);
  }

  handleClose() {}
}
