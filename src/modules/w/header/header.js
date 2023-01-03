import { LightningElement, api } from 'lwc';

export default class Header extends LightningElement {
  @api href = "#";
  @api company;
  @api platform;

  get hasCompany() {
    return this.company;
  }
}
