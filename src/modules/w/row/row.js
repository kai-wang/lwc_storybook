import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';

export default class Grid extends LightningElement {
  @api condensed = false;
  @api narrow = false;
  @api fullWidth = false;
  @api noGutter = false;
  @api noGutterLeft = false;
  @api noGutterRight = false;
  @api padding = false;

  connectedCallback() {
    this.setAttribute('class', this.computedClass);
  }

  get computedClass() {
    const {
      condensed,
      narrow,
      noGutter,
      noGutterLeft,
      noGutterRight,
      padding
    } = this;

    return clsx(
      'bx--row',
      condensed && 'bx--row--condensed',
      narrow && 'bx--row--narrow',
      noGutter && 'bx--no-gutter',
      noGutterLeft && 'bx--no-gutter--left',
      noGutterRight && 'bx--no-gutter--right',
      padding && 'bx--row-padding',
      this.getAttribute('class')
    );
  }
}
