import { LightningElement, api } from 'lwc';
export default class FormLabel extends LightningElement {
  @api id = 'label-' + Math.random().toString(16);
}