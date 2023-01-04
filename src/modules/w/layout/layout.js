import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';

export default class Layout extends LightningElement {
  @api href = '#';
  @api company;
  @api platform;

  @api fixedSideNav = false;
  @api rail = false;
  @api open = false;
  @api side = false;

  get hasCompany() {
    return this.company;
  }

  get winWidth() {
    return window.innerWidth;
  }

  get computedSideNavClass() {
    let { rail, winWidth, open, expansionBreakpoint } = this;
    return clsx(
      'bx--side-nav__navigation',
      'bx--side-nav',
      'bx--side-nav--ux',
      {
        'bx--side-nav--expanded':
          rail && winWidth >= expansionBreakpoint ? false : open
      },
      !open && !rail && 'bx--side-nav--collapsed',
      rail && 'bx--side-nav--rail'
    );
  }

  get computedSideNavStyle() {
    return clsx(this.open && 'z-index: 6000');
  }
}
