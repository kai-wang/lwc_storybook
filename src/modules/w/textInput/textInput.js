import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean } from 'w/utilsPrivate';

export default class TextInput extends LightningElement {
  @api inline;
  @api light;
  @api readonly;
  @api labelText;
  @api disabled;
  @api hideLabel;
  @api size;

  get hasLabelText() {
    return !!this.labelText;
  }

  get computedClass() {
    return clsx(
      'bx--form-item',
      'bx--text-input-wrapper',
      'bx--text-input-wrapper--inline' && this.inline,
      'bx--text-input-wrapper--light' && this.light,
      'bx--text-input-wrapper--readonly' && this.readonly
    );
  }



  get computedLabel() {
    if(hasLabelText) {
      return clsx('bx--label', 'bx--visually-hidden' && this.hideLabel, 'bx--label--disabled' && this.disabled)
    }
  }
}
