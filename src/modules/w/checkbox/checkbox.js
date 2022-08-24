import { LightningElement, api } from 'lwc';
import { clsx, normalizeBoolean, uid } from 'w/utils';

export default class CheckBox extends LightningElement {
  @api value = '';
  @api group;
  @api indeterminate = false;
  @api required = false;
  @api disabled = false;
  @api readonly = false;
  @api labelText = '';
  @api hideLabel = false;
  @api name = '';
  @api title;
  @api inline = false;

  _checked = false;
  _id = uid('cb-');

  @api get checked() {
    return this.userGroup() ? this.group.includes(this.value) : this._checked
  }

  set checked(value) {
    this._checked = normalizeBoolean(value);
  }

  renderedCallback() {
    const cb = this.template.querySelector('input');
    if(normalizeBoolean(this.indeterminate)) {
      cb.indeterminate = true;
    }
  }

  get computedClass() {
    return clsx('bx--form-item', 'bx--checkbox-wrapper');
  }

  get computedLabelClass() {
    return clsx('bx--checkbox-label');
  }

  get computedSpanClass() {
    return clsx('bx--checkbox-label-text', normalizeBoolean(this.hideLabel) && 'bx--visually-hidden');
  }

  handleFocus() {
    this.containsFocus = true;

    this.dispatchEvent(new CustomEvent('focus'));
  }

  handleBlur(event) {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(new CustomEvent('blur'));
  }

  handleChange(event) {
    event.preventDefault();
    event.stopPropagation();

    if(normalizeBoolean(this.indeterminate)) {
      const cb = this.template.querySelector('input');
      cb.indeterminate = false;
      this.indeterminate = false;
    }

    if(this.userGroup()) {
      this.group = this.group.includes(value)? this.group.filter(v => v !== value) : [...this.group, value];
    } else {
      this.checked = !this.checked;
    }
  }

  userGroup() {
    return Array.isArray(this.group);
  }
}
