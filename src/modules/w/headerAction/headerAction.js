import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';

export default class HeaderGlobalAction extends LightningElement {
  @api size = 20;
  @api icon;
  @api closeIcon;
  @api fill = 'white';
  @api transition = { duration: 200 };

  _open = false;

  get computedClass() {
    return clsx(
      'bx--header__action',
      this.isOpen && 'bx--header__action--active',
      this.label && 'action-text'
    );
  }

  get openClass() {
    return clsx('bx--header-panel bx--header-panel--expanded');
  }

  get isOpen() {
    return this._open;
  }

  handleClick(event) {
    event.stopPropagation();

    this._open = !this._open;
  }
}
