import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { synchronizeAttrs } from 'w/utils';

export default class SideNav extends LightningElement {
  @api href = '#';
  @api fixedSideNav = false;
  @api rail = false;
  @api open = false;

  expansionBreakpoint = 1056;

  items = [
    {
      label: 'link 1',
      href: '#',
      get type() {
        return true;
      }
    },
    {
      label: 'link 2',
      href: '#'
    },
    {
      label: 'menu',
      menu: true,
      expanded: false,
      items: [
        {
          label: 'link 1',
          href: '#'
        },
        {
          label: 'link 2',
          href: '#'
        },
        {
          label: 'link 3',
          href: '#'
        }
      ]
    },
    {
      label: 'link 3',
      href: '#'
    },
    {
      label: 'link 4',
      href: '#'
    },
    {
      label: 'menu 2',
      menu: true,
      expanded: false,
      items: [
        {
          label: 'link 1',
          href: '#'
        },
        {
          label: 'link 2',
          href: '#'
        },
        {
          label: 'link 3',
          href: 'https://www.google.com'
        }
      ]
    }
  ];

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

  get ref() {
    return this.template.querySelector('nav');
  }

  renderedCallback() {
    synchronizeAttrs(this.ref, {
      'aria-hidden': this.open,
      'aria-label': 'side-nav'
    });
  }
}
