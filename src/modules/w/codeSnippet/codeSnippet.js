import { LightningElement, api } from 'lwc';
import { clsx, normalizeString, synchronizeAttrs, uid } from 'w/utils';

const TYPE = {
  fallbackValue: 'single',
  validValues: ['single', 'inline', 'multi']
};

export default class CodeSnippet extends LightningElement {
  _type = TYPE.fallbackValue;
  _timeout;
  _animation;

  @api inline = false;
  @api expanded = false;
  @api hideCopyButton = false;
  @api disabled = false;
  @api wrapText = false;
  @api light = false;
  @api copyButtonDescription;
  @api copyLabel;
  @api feedback = 'Copied!';
  @api feedbackTimeout = 2000;
  @api showLessText = 'Show Less';
  @api showMoreText = 'Show More';
  @api showMoreLess = false;
  @api code;

  @api id = uid('cs-');

  @api get type() {
    return this._type;
  }

  set type(value) {
    this._type = normalizeString(value, TYPE);
    if (this._connected) {
      this.toggleMoreLess();
    }
  }

  async copy(code) {
    try {
      await navigator.clipboard.writeText(code);
    } catch (e) {
      console.log(e);
    }
  }

  get expandText() {
    return this.expanded ? this.showLessText : this.showMoreText;
  }

  get minHeight() {
    return this.expanded ? 240 : 48;
  }

  get maxHeight() {
    return this.expanded ? 'none' : '240px';
  }

  toggleMoreLess() {
    const pre = this.template.querySelector('pre');
    if (!pre) return;

    const { height } = pre.getBoundingClientRect();
    if (height > 0) this.showMoreLess = height > 255;
  }

  toggle() {
    if (this._type === 'multi') {
      if (this.code === undefined) this.toggleMoreLess();
      if (this.code) this.toggleMoreLess();

      const elm = this.template.querySelector('.bx--snippet-container');
      synchronizeAttrs(elm, {
        role: this.type === 'single' ? 'textbox' : undefined,
        tabindex: this.type === 'single' && !this.disabled ? '0' : undefined,
        'aria-label': this.copyLabel || 'code-snippet',
        style: `width: 100%; min-height: ${this.minHeight}px; max-height: ${this.maxHeight}`
      });
    }
  }

  get computedInlineClass() {
    return clsx(
      'bx--snippet',
      this.expanded && 'bx--snippet--expand',
      this.light && 'bx--snippet--light',
      this.hideCopyButton && 'bx--snippet--no-copy',
      this.wrapText && 'bx--snippet--wraptext',
      `bx--snippet--${this._type}`
    );
  }

  get computedBtnClass() {
    return clsx(
      'bx--copy',
      'bx--btn--copy',
      this._animation && 'bx--copy-btn--animating',
      this._animation === 'fade-in' && 'bx--copy-btn--fade-in',
      this._animation === 'fade-out' && 'bx--copy-btn--fade-out',
      'bx--snippet',
      this.type === 'inline' && 'bx--snippet--inline',
      this.expanded && 'bx--snippet--expand',
      this.light && 'bx--snippet--light',
      this.wrapText && 'bx--snippet--wraptext'
    );
  }

  get computedClass() {
    return clsx(
      'bx--snippet',
      this.expanded && 'bx--snippet--expand',
      this.light && 'bx--snippet--light',
      this.hideCopyButton && 'bx--snippet--no-copy',
      this.wrapText && 'bx--snippet--wraptext',
      `bx--snippet--${this._type}`,
      this._type !== 'inline' && this.disabled && 'bx--snippet--disabled'
    );
  }

  handleClick(event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.code !== undefined) {
      this.copy(this.code);
      this.dispatchEvent(new CustomEvent('copy'));
    }

    if (this._animation === 'fade-in') return;
    this._animation = 'fade-in';
    this._timeout = setTimeout(() => {
      this._animation = 'fade-out';
    }, this.feedbackTimeout);
  }

  handleAnimationEnd(event) {
    if (event.animationName === 'hide-feedback') {
      this._animation = undefine;
    }
  }

  handleShowMoreLess(event) {
    event.stopPropagation();
    event.preventDefault();
    this.expanded = !this.expanded;
    this.toggle();
  }

  renderedCallback() {
    if (this._connected) return;
    this._connected = true;

    if (!this.inline) {
      this.toggle();
    }

    this.toggleMoreLess();
  }
}
