import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';

export default class ListBoxMenuItem extends LightningElement {
  @api active = false;
  @api highlighted = false;
  @api disabled = false;
  @api index;

  get title() {
    const ref = this.template.querySelector('.bx--list-box__menu-item__option');
    return (ref?.offsetWidth < ref?.scrollWidth) ? ref?.innerText : '';
  }

  get computedClass() {
    return clsx(
      'bx--list-box__menu-item',
      this.active && 'bx--list-box__menu-item--active',
      this.highlighted && 'bx--list-box__menu-item--highlighted'
    );
  }

  handleClick(e) {
    this.dispatchEvent(new CustomEvent('select', {
      detail: this.index
    }));
  }
}
