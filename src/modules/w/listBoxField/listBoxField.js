import { LightningElement, api } from 'lwc';
import { uid, synchronizeAttrs } from 'w/utils';

export default class ListBoxField extends LightningElement {
  @api role = 'combobox';
  @api disabled = false;
  @api ariaExpanded;
  @api translateWithId;
  @api id;

  _menuId = uid('menu-');

  handleKeyDown(e) {
    e.stopPropagation();
  }

  connectedCallback() {
    this._connected = true;
    const elm = this.template.querySelector('div');

    synchronizeAttrs(elm, {
      'aria-expanded': this.getAttribute('aria-expanded'),
      'aria-owns': this.getAttribute('aria-owns') && this._menuId,
      'aria-controls': this.getAttribute('aria-controls') && this._menuId,
      'aria-disabled': this.disabled,
      'aria-label': this.getAttribute('aria-label') ? 'Close Menu' : 'Open Menu',
      tabindex: this.disabled ? '-1' : this.tabIndex
    });
  }
}
