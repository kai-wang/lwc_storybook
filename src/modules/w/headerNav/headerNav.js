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
      get menu() {
        return true;
      },
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
      get menu() {
        return true;
      },
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
    }
  ];

  connectedCallback() {
    window.addEventListener('click', this.closeMenu.bind(this));
  }

  toggleMenuClick(event) {
    event.preventDefault();
    event.stopPropagation();

    let t = event.currentTarget;
    let toggle = t.getAttribute('aria-expanded');

    t.setAttribute('aria-expanded', toggle === 'true' ? 'false' : 'true');

    const elements = this.template.querySelectorAll('[aria-expanded="true"]');
    elements.forEach((e) => {
      if (e != t && e.getAttribute('aria-expanded')) {
        e.setAttribute('aria-expanded', 'false');
      }
    });
  }

  closeMenu(e) {
    e.preventDefault();
    e.stopPropagation();

    const elements = this.template.querySelectorAll('[aria-expanded="true"]');
    elements.forEach((e) => {
      e.setAttribute('aria-expanded', 'false');
    });
  }
}
