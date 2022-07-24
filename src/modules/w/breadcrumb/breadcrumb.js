import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean } from 'w/utilsPrivate';

export default class Breadcrumb extends LightningElement {
  @api noTrailingSlash = false;

  get computedClass() {
    return clsx(
      'bx--breadcrumb',
      this.noTrailingSlash && 'bx--breadcrumb--no-trailing-slash'
    );
  }

  handleSlotChange() {
    const items = this.template.querySelector('slot').assignedNodes();

    items.forEach((it, idx, array) => {
      it.ariaCurrent = idx === array.length - 1 ? 'page' : null;
    });
  }
}
