import { LightningElement, api } from 'lwc';
import { synchronizeAttrs, normalizeBoolean } from 'w/utils';

export default class HeaderNav extends LightningElement {
  @api items = [
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
      menu: true ,
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

  connectedCallback() {
    this._ref = this.closeMenu.bind(this);
  }

  toggleMenuClick(event) {
    event.preventDefault();
    event.stopPropagation();

    // let t = event.currentTarget;
    // let toggle = t.getAttribute('aria-expanded');

    const elements = this.template.querySelectorAll('[data-name="sub-menu"]');
    elements.forEach((e) => {
      if (e == event.currentTarget) window.addEventListener('click', this._ref);

      e.setAttribute(
        'aria-expanded',
        e != event.currentTarget
          ? 'false'
          : e.getAttribute('aria-expanded') === 'true'
          ? 'false'
          : 'true'
      );
    });
  }

  closeMenu(e) {
    console.log('close menu');
    window.removeEventListener('click', this._ref);

    const elements = this.template.querySelectorAll('[aria-expanded="true"]');
    elements.forEach((e) => {
      e.setAttribute('aria-expanded', 'false');
    });
  }
}
