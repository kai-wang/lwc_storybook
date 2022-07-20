import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean } from 'w/utilsPrivate';

export default class Test extends LightningElement {
  @api title = "title";
  @api open = false;
  @api disabled = false;
  @api iconDescription = 'Expand/Collapse';

  _animation;

  get computedClass() {
    return clsx('overflow-visible border-t-[1px] border-solid border-ui-3 transition-all delay-[110ms]',
    {
      ['overflow-visible']: this.open,
    },
    {
      ['bt-[1px] border-solid border-disabled-1']: this.disabled
    },
    {
      ['block']: this.open
    }
    );
  }


  get contentClass() {
    return clsx(
      this.open ? 'block pt-3 transition-all wx-accordion-expand' : 'hidden px-4 wx-accordion-collapse'
    )
  }

  get iconClass() {
    return clsx('w-4 h-4 transition-all flex', {
      ['-rotate-90']: this.open
    });
  }

  handleClick() {
    this.open = !this.open;
    this._animation = this.open ? 'expanding' : 'collapsing';
  }

  handleAnimationend() {
    console.log('handleAnimationend');
  }
}