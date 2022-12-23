import { LightningElement, api } from 'lwc';
import { clsx, synchronizeAttrs } from 'w/utils';

import * as templates from './templates/templates';

export default class BaseIcon extends LightningElement {
  @api name;
  @api title;
  @api size = 24;
  @api fill = 'currentColor';
  @api role = 'img';
  @api className;

  get computedClass() {
    return clsx(`${this.className}`);
  }

  render() {
    const { name } = this;
    if (templates[name]) {
      return templates[name];
    } else {
      console.warn(`Cannot find the base icon ${name}`);
      return templates.null;
    }
  }

  renderedCallback() {
    console.log('called ');
    const svg = this.template.querySelector('svg');
    synchronizeAttrs(svg, {
      focusable: this.focusable,
      'aria-label': this.getAttribute('ariaLabel'),
      'aria-labelledby': this.getAttribute('ariaLabelledby'),
      'aria-hidden': this.getAttribute('ariaHidden') || 'true'
    });
  }
}