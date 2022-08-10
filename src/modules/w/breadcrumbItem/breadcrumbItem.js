import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';

export default class BreadcrumbItem extends LightningElement {
  @api href = '';
  @api isCurrentPage = false;
  @api ariaCurrent;

  get computedClass() {
    return clsx(
      'bx--breadcrumb-item',
      this.isCurrentPage && 'bx--breadcrumb-item--current'
    );
  }

  handleClick(e) {
    if (!this.href) {
      e.preventDefault();
    }
  }

  connectedCallback() {
    if (this._connected) return;

    this._connected = true;
    // add default CSS classes to custom element tag
    this.setAttribute(
      'class',
      clsx(
        'bx--breadcrumb-item',
        this.isCurrentPage && 'bx--breadcrumb-item--current'
      )
    );
    this.setAttribute('role', 'listitem');

    this.dispatchEvent(
      new CustomEvent('itemregister', {
        bubbles: true,
        detail: {
          callbacks: {
            updateCurrent: (flag) => {
              this.ariaCurrent = flag;
            }
          }
        }
      })
    );
  }

  disconnectedCallback() {
    this._connected = false;
  }
}
