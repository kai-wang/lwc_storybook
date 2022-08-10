import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';

export default class Breadcrumb extends LightningElement {
  @api noTrailingSlash = false;

  _items = [];

  get computedClass() {
    return clsx(
      'bx--breadcrumb',
      this.noTrailingSlash && 'bx--breadcrumb--no-trailing-slash'
    );
  }

  handleItemRegister(event) {
    event.preventDefault();
    event.stopPropagation();
    const item = event.detail;

    this._items.push(item.callbacks);
    this._items.forEach((it, idx, array) => {
      it.updateCurrent(idx === array.length - 1 ? 'page' : null);
    });
  }
}
