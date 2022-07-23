import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean } from 'w/utilsPrivate';

const KIND = {
  fallbackValue: 'primary',
  validValues: [
    'primary',
    'secondary',
    'tertiary',
    'ghost',
    'danger',
    'danger-tertiary',
    'danger-ghost'
  ]
};

const SIZE = {
  fallbackValue: 'default',
  validValues: ['default', 'field', 'sm', 'lg', 'xl']
};

const TYPE = {
  fallbackValue: 'button',
  validValues: ['button', 'submit', 'reset']
};

const ICON_POSITION = {
  fallbackValue: 'right',
  validValues: ['left', 'right', 'center']
};

const TOOLTIP_ALIGNMENT = {
  fallbackValue: 'center',
  validValues: ['left', 'right', 'center']
};

const TOOLTIP_POSITION = {
  fallbackValue: 'bottom',
  validValues: ['top', 'right', 'bottom', 'left']
};

export default class Button extends LightningElement {
  _kind = KIND.fallbackValue;
  _size = SIZE.fallbackValue;
  _tooltipPosition = TOOLTIP_POSITION.fallbackValue;
  _tooltipAlignment = TOOLTIP_ALIGNMENT.fallbackValue;

  @api expressive = false;
  @api isSelected = false;
  @api icon;
  @api iconDescription;
  @api disabled = false;
  @api href;
  @api customClass;
  @api iconOnly = false;

  @api get kind() {
    return this._kind;
  }

  set kind(value) {
    this._kind = normalizeString(value, KIND);
  }

  @api get size() {
    return this._size;
  }

  set size(value) {
    this._size = normalizeString(value, SIZE);
  }

  @api get tooltipAlignment() {
    return this._tooltipAlignment;
  }

  set tooltipAlignment(value) {
    this._tooltipAlignment = normalizeString(value, TOOLTIP_ALIGNMENT);
  }

  @api get tooltipPosition() {
    return this._tooltipPosition;
  }

  set tooltipPosition(value) {
    this._tooltipPosition = normalizeString(value, TOOLTIP_POSITION);
  }

  get link() {
    return normalizeBoolean(this.href);
  }

  get hasIcon() {
    return normalizeBoolean(this.icon);
  }

  hasIconOnly() {
    return this.hasIcon && this.iconOnly;
  }

  get ariaPressed() {
    return this.hasIconOnly() &&
      this._kind === 'ghost' &&
      !normalizeBoolean(this.href)
      ? this.isSelected
      : false;
  }

  get computedClass() {
    return clsx(
      'bx--btn',
      this.expressive && 'bx--btn--expressive',
      this.size === 'sm' && !this.expressive && 'bx--btn--sm',
      (this.size === 'field' && !this.expressive) ||
        (this.size === 'md' && !this.expressive && 'bx--btn--md'),
      this.size === 'field' && 'bx--btn--field',
      this.size === 'lg' && 'bx--btn--lg',
      this.size === 'xl' && 'bx--btn-xl',
      `bx--btn--${this._kind}`,
      this.disabled && 'bx--btn--disabled',
      this.hasIconOnly() && 'bx--btn--icon-only',
      this.hasIconOnly() && 'bx--tooltip__trigger',
      this.hasIconOnly() && 'bx--tooltip-a11y',
      this.hasIconOnly() &&
        this._tooltipPosition &&
        `bx--btn--icon-only--${this._tooltipPosition}`,
      this.hasIconOnly() &&
        this._tooltipAlignment &&
        `bx--btn--icon-only--${this._tooltipAlignment}`,
      this.hasIconOnly() &&
        this.isSelected &&
        this._kind === 'ghost' &&
        'bx--btn--selected',
      this.customClass
    );
  }

  handleClick(event) {
    this.dispatchEvent(new CustomEvent('click'));
  }
}
