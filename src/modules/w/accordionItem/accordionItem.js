import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';

export default class Test extends LightningElement {
  @api title = 'title';
  @api open = false;
  @api disabled = false;
  @api iconDescription = 'Expand/Collapse';
  @api align;

  _animation;

  get computedClass() {
    return clsx(
      'bx--accordion__item',
      this.open && 'bx--accordion__item--active',
      this.disabled && 'bx--accordion__item--disabled',
      this._animation === 'expanding' && 'bx--accordion__item--expanding',
      this._animation === 'collapsing' && 'bx--accordion__item--collapsing'
    );
  }

  handleClick() {
    this.open = !this.open;
    this._animation = this.open ? 'expanding' : 'collapsing';
  }

  handleAnimationend() {
    this._animation = null;
  }
}
