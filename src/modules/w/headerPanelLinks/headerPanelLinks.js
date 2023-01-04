import { LightningElement, api } from 'lwc';
import { synchronizeAttrs, normalizeBoolean } from 'w/utils';

export default class HeaderNav extends LightningElement {
  @api items = [
    {
      label: 'switcher link 1',
      href: '#',
      get type() {
        return true;
      }
    },
    {
      label: 'switcher link 2',
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
      label: 'switcher link 3',
      href: '#'
    },
    {
      label: 'switcher link 4',
      href: '#'
    },
    {
      label: 'menu 2',
      menu: true ,
      expanded: false,
      items: [
        {
          label: 'switcher link 1',
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

}
