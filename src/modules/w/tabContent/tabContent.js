import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean, uid } from 'w/utilsPrivate';

export default class TabContent extends LightningElement {
  @api index;
  @api tabId;
  @api id = uid('tabc-');

  hidden = false;
  _activeTab;

  @api get activeTab() {
    return this._activeTab;
  }

  set activeTab(value) {
    this._activeTab = value;
    this.hidden = !(parseInt(value) === parseInt(this.index));
  }
}