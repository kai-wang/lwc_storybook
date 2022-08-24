import { LightningElement, api, wire } from 'lwc';
import { uid } from 'w/utils';
import ContextProvider from 'w/tabs';

export default class TabContent extends LightningElement {
  @wire(ContextProvider.Provider) context;

  @api index;
  @api tabId;
  @api id = uid('tabc-');

  _hidden = false;

  get hidden() {
    return !(parseInt(this.context?.currentActiveTab) === parseInt(this.index));
  }
}