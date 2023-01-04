import { LightningElement, api } from 'lwc';

export default class Layout extends LightningElement {
  @api href = "#";
  @api company;
  @api platform;

  get hasCompany() {
    return this.company;
  }
}
