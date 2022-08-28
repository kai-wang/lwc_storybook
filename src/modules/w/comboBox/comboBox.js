import { LightningElement, api } from 'lwc';
import {
  clsx,
  uid,
  normalizeString,
  keyCodes,
  synchronizeAttrs
} from 'w/utils';

const DIRECTION = {
  fallbackValue: 'bottom',
  validValues: ['top', 'bottom']
};

const SIZE = {
  fallbackValue: 'xl',
  validValues: ['sm', 'xl']
};

export default class ComboBox extends LightningElement {
  @api items = [];
  @api selectedId;
  @api value = '';
  @api disabled = false;
  @api titleText;
  @api placeholder;
  @api invalidText;
  @api invalid = false;
  @api warn = false;
  @api warnText;
  @api light = false;
  @api open = false;
  @api name;
  @api ariaLabel = 'Choose an item';
  @api translateWithId;
  @api type;
  @api ariaExpanded = false;

  _highlightedIndex = -1;
  _highlightedId;
  _selectedItem;
  _filteredItems = [];

  _prevSelectedId;
  _direction = DIRECTION.fallbackValue;
  _size;
  _id = uid('cb-');
  _inputId = uid('input-');
  _menuId = uid('menu-');
  _comboId = uid('combo-');

  @api get direction() {
    return this._direction;
  }

  set direction(value) {
    this._direction = normalizeString(value, DIRECTION);
  }

  @api get size() {
    return this._size;
  }

  set size(value) {
    this._size = normalizeString(value, SIZE);
  }

  syncListBoxAttribute() {
    const elm = this.template.querySelector('[role="listbox"]');
    synchronizeAttrs(elm, {
      'data-invalid': this.invalid
    });
  }

  syncListBoxFieldAttribute() {
    const elm = this.template.querySelector('[role="button"]');
    synchronizeAttrs(elm, {
      'aria-expanded': this.ariaExpanded,
      'aria-owns': this.ariaExpanded && this._menuId,
      'aria-controls': this.ariaExpanded && this._menuId,
      'aria-label': this.ariaExpanded ? 'Close menu' : 'Open menu'
    });
  }

  syncInputAttribute() {
    const elm = this.template.querySelector('input');
    synchronizeAttrs(elm, {
      'aria-controls': this.open ? this._menuId : undefined,
      'aria-owns': this.open ? this._menuId : undefined,
      'aria-labelledby': this._comboId
    });
  }

  get computedLabelClass() {
    return clsx('bx--label', this.disabled && 'bx--label--disabled');
  }

  get computedListBoxClass() {
    return clsx(
      'bx--combo-box',
      this._direction === 'top' && 'bx--list-box--up',
      !this.invalid && this.warn && 'bx--combo-box--warning',
      'bx--list-box',
      this.size === 'sm' && 'bx--list-box--sm',
      this.size === 'xl' && 'bx--list-box--xl',
      this.type === 'inline' && 'bx--list-box--inline',
      this.disabled && 'bx--list-box--disabled',
      this.open && 'bx--list-box--expanded',
      this.light && 'bx--list-box--light',
      !this.invalid && this.warn && 'bx--list-box--warning'
    );
  }

  get computedInputClass() {
    return clsx(
      'bx--text-input',
      this.light && 'bx--text-input--light',
      this.value === '' && 'bx--text-input--empty'
    );
  }

  get computedIconClass() {
    return clsx(
      'bx--list-box__menu-icon',
      this.open && 'bx--list-box__menu-icon--open'
    );
  }

  handleKeyDown(e) {
    e.stopPropagation();

    if (e.keyCode == keyCodes.enter) {
      this.open = !this.open;
      if (this.highlightedIndex > -1) {
        this.open = false;
      }
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (this.disabled) return;
    this.open = !this.open;
    const elm = this.template.querySelector('[role="button"]');
    elm?.focus();
  }

  handleBlur(e) {}

  handleInput(e) {
    if (!this.open && e.target.value.length > 0) {
      this.open = true;
    }

    if (!this.value.length) {
      this.clear();
      this.open = true;
    }
  }

  handleKeyDown(e) {
    let {
      open,
      value,
      _highlightedIndex,
      _filteredItems,
      _selectedId,
      _selectedItem
    } = this;
    e.stopPropagation();
    let key = e.keyCode;
    if (key === keyCodes.enter) {
      open = !open;
      if (
        _highlightedIndex > -1 &&
        _filteredItems[_highlightedIndex]?.Id !== _selectedId
      ) {
        open = false;
        if (_filteredItems[_highlightedIndex]) {
          value = _filteredItems[_highlightedIndex]?.text;
          _selectedId = _filteredItems[_highlightedIndex]?.id;
          _selectedItem = _filteredItems[_highlightedIndex];
        }
      } else {
        // search typed value with lowercase
        const matchedItem = _filteredItems.find((e) => {
          return e.text.toLowerCase() === value?.toLowerCase() && !e.disabled;
        });

        if (matchedItem) {
          open = false;
          _selectedItem = matchedItem;
          value = _selectedItem.text;
          _selectedId = _selectedItem.id;
        }
      }

      _highlightedIndex = -1;
    } else if (key === keyCodes.tab || key === keyCodes.escape) {
      open = false;
    } else if (key === keyCodes.down) {
      this.change(1);
    } else if (key === keyCodes.up) {
      this.change(-1);
    }
  }

  handleSelect(e) {
    this.items = this.items.map((it) => ({
      ...it,
      ...{ active: e.detail === it.id, highlighted: e.detail === it.id }
    }));
    this._selectedId = e.detail;
    this._selectedItem = this.items.find((it) => it.id === e.detail);
  }

  clear() {
    this._prevSelectedId = null;
    this._highlightedIndex = -1;
    this._highlightedId = undefined;
    this._selectedId = undefined;
    this._selectedItem = undefined;
    this.open = false;
    this.value = '';
  }

  change(dir) {
    console.log(this._highlightedIndex);
    let index = this._highlightedIndex + dir;
    let _items = !this._filteredItems?.length
      ? this.items
      : this._filteredItems;
    if (index < 0) {
      index = _items.length - 1;
    } else if (index >= _items.length) {
      index = 0;
    }

    console.log('change', index);


    // let disabled = this.items[index].disabled;
    // while(disabled) {
    //   index = index + dir;
    //   if(index < 0) {
    //     index = this.items.length - 1;
    //   } else if(index >= this.items.length) {
    //     index = 0;
    //   }

    //   this.disabled = this.items[index].disabled;
    // }

    this._highlightedIndex = index;
  }

  renderedCallback() {
    this.syncListBoxAttribute();
    this.syncListBoxFieldAttribute();
    this.syncInputAttribute();
  }
}
