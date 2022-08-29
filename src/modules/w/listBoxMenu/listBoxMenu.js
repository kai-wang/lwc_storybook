import { LightningElement, api } from 'lwc';
import { uid } from 'w/utils';

export default class ListBoxMenu extends LightningElement {
  _id = uid('menu-');
}
