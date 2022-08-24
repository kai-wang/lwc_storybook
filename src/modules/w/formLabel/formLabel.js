import { LightningElement, api } from 'lwc';
import { uid} from 'w/utilsPrivate';

export default class FormLabel extends LightningElement {
  @api id = uid('label-');
}