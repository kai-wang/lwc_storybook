import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString  } from 'w/utilsPrivate';


const ICON_SIZE = {
  fallbackValue: 'md',
  validValues: ['xxs', 'xs', 'sm', 'md', 'lg']
};

export default class SvgIcon extends LightningElement {
  _size = ICON_SIZE.fallbackValue;
  
  @api title;
  @api src;
  @api className;


  @api get size() {
    return this._size;
  }

  set size(value) {
    this._size = normalizeString(value, ICON_SIZE);
  } 

  // get iconHref() {
  //   //return `/assets/icons/utility-sprite/svg/symbols.svg#download`;
  //   return `/assets/icons/test.svg#d`;
  // }

  get computedClass () {
    return clsx(this.className);
  }
}