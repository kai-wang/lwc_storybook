import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';

export default class TileClickable extends LightningElement {
  @api clicked = false;
  @api light = false;
  @api disabled = false;
  @api href;

  get computedClass() {
    return clsx(
      'bx--tile bx--tile--clickable',
      this.clicked && 'bx--tile--is-clicked',
      this.light && 'bx--tile--light'
    );
  }

  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.clicked = !this.clicked;
  }
}
