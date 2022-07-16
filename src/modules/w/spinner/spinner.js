import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean } from 'w/utilsPrivate';

const SIZE = {
  fallbackValue: 'sm',
  validValues: ['xs', 'sm', 'md', 'lg', 'xl']
};

export default class Spinner extends LightningElement {
  _size = SIZE.fallbackValue;

  @api kind = 'base';
  @api prefix = 'spin';

  get computedClass() {
    return clsx(
      {
        [`${this.prefix}-${this.kind}`]: normalizeBoolean(this.kind)
      },
      `${this.prefix}-size-${this._size}`
    );
  }

  @api get size() {
    return this._size;
  }

  set size(value) {
    this._size = normalizeString(value, SIZE);
  }
}
