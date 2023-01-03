import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';

export default class HeaderGlobalAction extends LightningElement {
  @api size = 20;
  @api active = false;
  @api icon;
  @api fill = 'white';

  get computedClass() {
    return clsx(
      'bx--header__action',
      this.active && 'bx--header__action--active'
    );
  }
}
