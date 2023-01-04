import { LightningElement, api } from 'lwc';

export default class Content extends LightningElement {
  get unsetLeftMargin() {
    return true;
  }

  renderedCallback() {
    const element = this.template.querySelector('main');
    element.style = this.unsetLeftMargin ? 'margin-left: 0' : '';
  }
}
