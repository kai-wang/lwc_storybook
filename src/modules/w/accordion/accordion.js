import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean } from 'w/utilsPrivate';

const SIZE = {
  fallbackValue: 'sm',
  validValues: ['sm', 'xl']
};

const ALIGN = {
  fallbackValue: 'end',
  validValues: ['start', 'end']
};

export default class Accordion extends LightningElement {

  @api align = ALIGN.fallbackValue;
  @api size = SIZE.fallbackValue;
  @api disabled = false;

  get computedClass() {
    return clsx('w-full list-none');
  }

}
