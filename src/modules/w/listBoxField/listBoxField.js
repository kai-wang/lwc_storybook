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
      'aria-expanded': this.ariaExpanded,
      'aria-owns': this.ariaExpanded && this._menuId,
      'aria-controls': this.ariaExpanded && this._menuId,
      'aria-disabled': this.disabled,
      'aria-label': this.ariaExpanded ? 'Close Menu' : 'Open Menu',
      tabindex: this.disabled ? '-1' : this.tabIndex
    });
  }
}
