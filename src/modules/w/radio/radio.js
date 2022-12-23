import { LightningElement, api } from 'lwc';
import { clsx, normalizeString, uid } from 'w/utils';

const LABEL_POSITION = {
  fallbackValue: 'right',
  validValues: ['left', 'right']
};

export default class Radio extends LightningElement {
  @api value = '';
  @api checked = false;
  @api disabled = false;
  @api required = false;
  @api labelText = '';
  @api hideLabel = false;
  @api id = uid('radio-');
  @api name = '';
  @api ctx;

  _labelPosition = LABEL_POSITION.fallbackValue;

  @api get labelPosition() {
    return this._labelPosition;
  }

  set labelPosition(value) {
    this._labelPosition = normalizeString(value, LABEL_POSITION);
  }

  get computedClass() {
    return clsx(
      'bx--radio-button-wrapper',
      this._labelPosition === 'left' && 'bx--radio-button-wrapper--label-left'
    );
  }

  get computedLabelClass() {
    return clsx(this.hideLabel && 'bx--visually-hidden');
  }

  connectedCallback() {
    this.setAttribute('class', this.computedClass);
  }


  handleChange(event) {
    console.log(this.value);
    if(this.ctx && this.ctx.update) {
      this.ctx.update(this.value);
    }
  }
}
