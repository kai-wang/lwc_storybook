import { LightningElement, api } from 'lwc';
import { clsx, synchronizeAttrs } from 'w/utils';

export default class SvgIcon extends LightningElement {
  @api title;
  @api src;
  @api size = 16;
  @api className;
  @api ariaLabel;
  @api ariaLabelledby;
  @api ariaHidden = "true";
  @api fill = 'currentColor';
  @api role = 'img';
  
  get computedClass() {
    return clsx(`${this.className}`);
  }

  get focusable() {
    return this.tabIndex === 0 ? true : undefined;
  }
  
  connectedCallback() {
    const svg = this.template.querySelector('svg');
    synchronizeAttrs(svg, {
      'focusable': this.focusable,
      'aria-label': this.ariaLabel,
      'aria-labelledby': this.ariaLabelledby,
      'aria-hidden': this.ariaHidden
    });
  }
}
