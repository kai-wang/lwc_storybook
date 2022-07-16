import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';

export default class SvgIcon extends LightningElement {
  @api title;
  @api src;
  @api className;

  get computedClass() {
    return clsx(`${this.className}`);
  }
}
