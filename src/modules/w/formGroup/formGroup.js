import { LightningElement, api } from 'lwc';
import { clsx, synchronizeAttrs } from 'w/utils';

export default class Form extends LightningElement {
  @api legendText;
  @api messageText;
  @api invalid = false;
  @api noMargin = false;
  @api legendId = '';
  @api ariaLabelledby;

  get hasLegendText() {
    return !!this.legendText;
  }

  get hasMessage() {
    return !!this.messageText;
  }

  get computedClass() {
    return clsx('bx--fieldset', this.noMargin && 'bx--fieldset--no-margin');
  }

  connectedCallback() {
    const elm = this.template.querySelector('fieldset');
    synchronizeAttrs(elm, {
      'aria-labelledby': this.ariaLabelledBy || this.legendId
    });

    const legend = this.template.querySelector('legend');
    synchronizeAttrs(legend, {
      id: this.legendId || this.ariaLabelledBy
    });
  }
}
