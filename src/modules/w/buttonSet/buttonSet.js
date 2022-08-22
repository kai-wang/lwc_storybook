import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';

export default class ButtonSet extends LightningElement {
  @api stacked;

  get computedClass() {
    return clsx('bx--btn-set', this.stacked && 'bx--btn-set--stacked');
  }
}