import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean, uid } from 'w/utilsPrivate';

const TYPE = {
  fallbackValue: 'default',
  validValues: ['default', 'container']
};

export default class Tabs extends LightningElement {
  _tabState = [];
  _type = TYPE.fallbackValue;
  _dropdownHidden = true;

  @api activeTab = 0;
  @api autoWidth = false;
  @api triggerHref = '#';

  @api get type() {
    return this._type;
  }

  set type(value) {
    this._type = normalizeString(value, TYPE);
  }

  get computedContainerClass() {
    return clsx(
      'bx--tabs',
      this._type === 'container' && 'bx--tabs--container'
    );
  }

  get computedNavClass() {
    return clsx(
      'bx--tabs__nav',
      this._dropdownHidden && 'bx--tabs__nav--hidden'
    );
  }

  handleClick(event) {
    this._dropdownHidden = !this._dropdownHidden;
  }

  handleKeyPress() {
    this._dropdownHidden = !this._dropdownHidden;
  }

  handleLinkClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this._dropdownHidden = !this._dropdownHidden;
  }

  @api get tabs() {
    return this._tabState;
  }

  set tabs(data) {
    if (Array.isArray(data)) {
      const selectedTabIndex = data.findIndex(tab => normalizeBoolean(tab.selected));
      this.activeTab = selectedTabIndex === -1 ? 0 : selectedTabIndex;

      let { autoWidth, activeTab } = this;

      this._tabState = data.map((tab, idx) => ({
          label: tab.label,
          href: normalizeBoolean(tab.href) ? tab.href : '#',
          id: normalizeBoolean(tab.Id) ? tab.Id : uid('tab-'), // keep the old id if existing
          selected: tab.selected,
          disabled: tab.disabled,
          style: normalizeBoolean(autoWidth) ? 'width: auto' : '',
          index: idx,
          computedClass: clsx(
            'bx--tabs__nav-item',
            normalizeBoolean(tab.disabled) && 'bx--tabs__nav-item--disabled',
            (idx === activeTab) && 'bx--tabs__nav-item--selected'
          )
      }));
    }
    return [];
  }

  updateTabState() {
    let { activeTab } = this;
    this._tabState.forEach((tab) => {
      tab.selected = tab.index === activeTab;
    });

    this.tabs = this._tabState;
  }

  updateContentState() {
    let { activeTab } = this;
    const items = this.querySelectorAll(`*[slot='content']`);
    items.forEach((it, idx) => {
      it.index = idx;
      it.activeTab = activeTab;
    });
  }

  handleTabClick(event) {
    event.preventDefault();

    const idx = parseInt(event.target.getAttribute('data-id'));
    if (!Number.isNaN(idx) && this._tabState.length > idx) {
      this.activeTab = idx;
      this.updateTabState();
      this.updateContentState();
    }
  }

  handleSlotChange(event) {
    // initialize slot element attributes;
    this.updateContentState();
  }
}
