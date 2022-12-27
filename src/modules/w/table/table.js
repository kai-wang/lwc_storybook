import { LightningElement, api } from 'lwc';
import { clsx, normalizeString } from 'w/utils';
import simpleTemplate from './templates/simple/simple.html';

const SIZE = {
  fallbackValue: 'compact',
  validValues: ['compact', 'short', 'medium', 'tall']
};

export default class Table extends LightningElement {

  @api headers=[
    { key: "name", value: "Name", sortable: true },
    { key: "protocol", value: "Protocol" },
    { key: "port", value: "Port" },
    { key: "rule", value: "Rule" },
  ];


  @api sortable = false;
  @api tableStyle;
  _size = SIZE.fallbackValue;

  @api get size() {
    return this._size;
  }

  set size(value) {
    this._size = normalizeString(value, SIZE);
  }

  render() {
    return simpleTemplate;
  }

  get computedClass() {
    return clsx(
      'bx--data-table',
      this.size === 'compact' && 'bx--data-table--compact',
      this.size === 'short' && 'bx--data-table--short',
      this.size === 'tall' && 'bx--data-table--tall',
      this.size === 'md' && 'bx--data-table--medium',
      this.sortable && 'bx--data-table--sort',
      this.zebra && 'bx--data-table--zebra',
      this.useStaticWidth && 'bx--data-table--static',
      this.stickyHeader && 'bx--data-table--sticky-header'
    );
  }
}
