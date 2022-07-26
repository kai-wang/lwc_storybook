import { LightningElement, api, wire } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean, uid } from 'w/utilsPrivate';
import ContextProvider from 'w/tabs';

export default class TabContent extends LightningElement {
  @wire(ContextProvider.Provider) context;

  @api index;
  @api tabId;
  @api id = uid('tabc-');

  _hidden = false;

  get hidden() {
    console.log(this.index);
    return !(parseInt(this.context?.currentActiveTab) === parseInt(this.index));
  }
}