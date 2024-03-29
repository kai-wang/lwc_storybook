import { LightningElement, api } from 'lwc';
import { clsx, synchronizeAttrs } from 'w/utils';

import * as templates from './templates/templates';

export default class BaseIcon extends LightningElement {
  @api name;
  @api title;
  @api size = 16;
  @api fill = 'currentColor';
  @api role = 'img';
  @api className;
  @api tabIndex;

  get computedClass() {
    return clsx(`${this.className}`);
  }

  get focusable() {
    return this.tabIndex === 0 ? true : undefined;
  }

  render() {
    const { name } = this;
    if (templates[name]) {
      return templates[name];
    } else {
      console.warn(`Cannot find the base icon ${name}`);
      return templates.Void;
    }
  }

  renderedCallback() {
    const svg = this.template.querySelector('svg');
    if(!svg) return;

    svg.addEventListener('onClick', this.handleClick);
    synchronizeAttrs(svg, {
      focusable: this.focusable,
      'aria-label': this.getAttribute('aria-label'),
      'aria-labelledby': this.getAttribute('aria-labelledby'),
      'aria-hidden': this.getAttribute('aria-hidden') || 'true'
    });
  }

  handleClick(event) {
    this.dispatchEvent(new CustomEvent('click'));
  }
}
