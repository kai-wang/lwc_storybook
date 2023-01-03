import { LightningElement, api } from 'lwc';

export default class HeaderUtilities extends LightningElement {
  connectedCallback() {
    this.classList.add('bx--header__global');
  }
}
