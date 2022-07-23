import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean } from 'w/utilsPrivate';

const SIZE = {
  fallbackValue: 'lg',
  validValues: ['sm', 'lg']
};

export default class Link extends LightningElement {
  @api href;
  @api inline = false;
  @api icon;
  @api disabled = false;
  @api target;


  _size = SIZE.fallbackValue;
  _out = false;
  _outIcon = '/assets/custom/sprites-32.svg#launch';

  @api get size() {
    return this._size;
  }

  set size(value) {
    this._size = normalizeString(value, SIZE);
  }

  @api get out() {
    return this._out;
  }
  
  set out(value) {
    this._out = normalizeBoolean(value);
    if(this._out)
      this.icon = this._outIcon;
  }

  get computedClass() {
    return clsx(
      'bx--link',
      this.disabled && 'bx--link--disabled',
      this.inline && 'bx--link--inline',
      this.visited && 'bx-link--visited',
      !this.disabled && `bx--link--${this._size}`
    );
  }

  get showIcon() {
    return !this.inline && normalizeBoolean(this.icon);
  }

  get rel() {
    return (this.target === '_blank') ? 'noopener noreferrer' : '';
  }


}
