import { LightningElement, api } from 'lwc';
import { clsx, normalizeString } from 'w/utils';

const SIZE = {
  fallbackValue: 'sm',
  validValues: ['sm', 'xl']
};

const ALIGN = {
  fallbackValue: 'end',
  validValues: ['start', 'end']
};

export default class Accordion extends LightningElement {
  _align = ALIGN.fallbackValue;
  _size = SIZE.fallbackValue;

  @api get align() {
    return this._align;
  }

  set align(value) {
    this._align = normalizeString(value, ALIGN);
  }

  @api get size() {
    return this._size;
  }

  set size(value) {
    this._size = normalizeString(value, SIZE);
  }

  get computedClass() {
    return clsx(
      'bx--accordion',
      `bx--accordion--${this._align}`,
      `bx--accordion--${this._size}`
    );
  }
}
