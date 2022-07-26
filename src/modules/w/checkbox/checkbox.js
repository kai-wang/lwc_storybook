import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean } from 'w/utilsPrivate';

const CLS = {
  'default': {
    'inputClass': 'w-4 h-4 text-gray-70 border-gray-30 focus:ring-gray-50 focus:ring-1',
    'inputClass-disabled': 'w-4 h-4 text-gray-70 bg-gray-10 border-gray-30 focus:ring-gray-50 focus:ring-1',
    'labelClass': 'ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 select-none',
    'labelClass-disabled': 'ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 select-none bg-gray-10'
  }
}

export default class CheckBox extends LightningElement {
  @api value = '';
  @api group;
  @api indeterminate = false;
  @api required = false;
  @api disabled = false;
  @api labelText = '';
  @api hideLabel = false;
  @api name = '';
  @api title;

  _checked = false;

  get id() {
    return 'cb-' + Math.random().toString(16);
  }

  @api get checked() {
    return this.userGroup() ? group.includes(this.value) : this._checked
  }

  set checked(value) {
    this.checked = normalizeBoolean(value);
  }

  renderedCallback() {
    const cb = this.template.querySelector('input');
    if(normalizeBoolean(this.indeterminate)) {
      cb.indeterminate = true;
    }
  }

  get inputClass() {
    return this.disabled ? CLS.default['inputClass-disabled'] : CLS.default.inputClass;
  }

  get labelClass() {
    return this.disabled ? CLS.default['labelClass-disabled'] : CLS.default.labelClass;
  }

  handleFocus() {
    this.containsFocus = true;

    this.dispatchEvent(new CustomEvent('focus'));
  }

  handleBlur() {
    this.containsFocus = false;
    this.dispatchEvent(new CustomEvent('blur'));
  }

  handleChange(event) {
    
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
