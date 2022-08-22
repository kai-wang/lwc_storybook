import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, synchronizeAttrs } from 'w/utilsPrivate';

const ANIMATION = {
  fallbackValue: 'fade-in',
  validValues: ['fade-in', 'fade-out']
};

export default class CopyButton extends LightningElement {
  @api feedback = 'Copied!';
  @api feedbackTimeout = 2000;
  @api iconDescription = 'Copy to clipboard';
  @api text;
  _animation;

  @api get animation() {
    return this._animation;
  }

  set animation(value) {
    this._animation = normalizeString(value, ANIMATION);
  }

  async copy(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.log(e);
    }
  }

  get computedClass() {
    return clsx(
      'bx--copy-btn',
      'bx--copy',
      (this.animation === 'fade-in' || this.animation === 'fade-out') &&
        `bx--copy-btn--animating bx--copy-btn--${this.animation}`
    );
  }

  handleClick() {
    if (this.text !== undefined) {
      this.copy(this.text);
      this.dispatchEvent(new CustomEvent('copy'));
    }

    if (this.animation === 'fade-in') return;
    this._animation = 'fade-in';
    this._timeout = setTimeout(() => {
      this.animation = 'fade-out';
    }, this.feedbackTimeout);
  }

  handleAnimationEnd(event) {
    if (event.animationName === 'hide-feedback') {
      this._animation = undefined;
    }
  }
}
