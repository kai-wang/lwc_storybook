import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';

export default class ListBoxMenuIcon extends LightningElement {
  @api open = false;
  _rendered = false;

  get description() {
    return this.open ? 'Close menu' : 'Open menu';
  }

  handleClick(e) {
    e.preventDefault();
  }

  get computedClass() {
    return clsx(
      'bx--list-box__menu-icon',
      this.open && 'bx--list-box__menu-icon--open'
    );
  }

  renderedCallback() {
    if(this._rendered) return;
    this._rendered = true;
    this.setAttribute('class', this.computedClass);
  }
}
