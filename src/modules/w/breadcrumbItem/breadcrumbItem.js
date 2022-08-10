import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean } from 'w/utilsPrivate';

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
    if(this._connected) return;

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
  }

  disconnectedCallback() {
    this._connected = false;
  }
}
