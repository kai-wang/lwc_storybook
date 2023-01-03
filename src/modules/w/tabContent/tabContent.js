import { LightningElement, api, wire } from 'lwc';
import { uid } from 'w/utils';
import ContextProvider from 'w/tabs';

export default class TabContent extends LightningElement {
  @wire(ContextProvider.Provider) context;

  @api id = uid('tabc-');
  @api label;
  @api href;
  @api disabled;
  @api selected;

  get hidden() {
    return !(this.context?.currentActiveTab === this.id);
  }
}