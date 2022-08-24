import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean, uid } from 'w/utilsPrivate';

const SIZE = {
  fallbackValue: 'xl',
  validValues: ['sm', 'lg', 'xl']
};

export default class Search extends LightningElement {
  @api value = '';
  @api light = false;
  @api disabled = false;
  @api expandable = false;
  @api placeholder = 'Search...';
  @api autocomplete = false;
  @api autofocus = false;
  @api closeButtonLabelText = 'Clear search input';
  @api labelText = '';
  @api className;

  _size = SIZE.fallbackValue;
  _id = uid('sc-');
  _expanded = false;

  @api get size() {
    return this._size;
  }

  set size(value) {
    this._size = normalizeString(value, SIZE);
  }

  @api get expanded() {
    return this._expanded;
  }

  set expanded(value) {
    this._expanded = normalizeBoolean(value);
    this.focusInput();
  }

  get computedClass() {
    return clsx(
      'bx--search',
      normalizeBoolean(this.light) && 'bx--search--light',
      normalizeBoolean(this.disabled) && 'bx--search--disabled',
      `bx--search--${this._size}`,
      normalizeBoolean(this.expandable) && 'bx--search--expandable',
      normalizeBoolean(this.expanded) && 'bx--search--expanded',
      this.className
    );
  }

  get closeButtonClass() {
    return clsx(
      'bx--search-close',
      this.value === '' && 'bx--search-close--hidden'
    );
  }

  get id() {
    return this._id;
  }

  get labelId() {
    return `${this._id}-search`;
  }

  handleClick() {
    if (this.expandable) this.expanded = true;
  }

  handleFocus() {
    if (this.expandable) this.expanded = true;
  }

  handleBlur() {
    if (this.expanded && this.value.trim().length === 0) this.expanded = false;
  }

  handleKeydown(event) {
    // if Esc is pressed
    if (event.keyCode === 27) {
      this.value = '';
      this.dispatchClear();
    }
  }

  handleChange(event) {
    const ref = this.template.querySelector('input');
    this.value = ref.value;
    console.log(this.value);
  }

  handleClose(event) {
    event.preventDefault();
    this.value = '';
    this.focusInput();
    this.dispatchClear();
  }

  dispatchClear() {
    this.dispatchEvent(new CustomEvent('clear'));
  }

  focusInput() {
    const ref = this.template.querySelector('input');
    ref.focus();
  }
}
