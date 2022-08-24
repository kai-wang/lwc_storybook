import { LightningElement, api } from 'lwc';
import LightningContextElement from 'lightning/context';
import { clsx, normalizeString, normalizeBoolean, uid } from 'w/utils';

const TYPE = {
  fallbackValue: 'default',
  validValues: ['default', 'container']
};

export default class Tabs extends LightningContextElement {
  _tabState = [];
  _type = TYPE.fallbackValue;
  _dropdownHidden = true;
  _activeTab = 0;

  // @api activeTab = 0;
  @api autoWidth = false;
  @api triggerHref = '#';

  @api get activeTab() {
    return this._activeTab;
  }

  set activeTab(value) {
    this._activeTab = value;
    this.setContext({ currentActiveTab: value });
  }

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
      const selectedTabIndex = data.findIndex((tab) =>
        normalizeBoolean(tab.selected)
      );
      this.activeTab = selectedTabIndex === -1 ? 0 : selectedTabIndex;

      let { autoWidth, _activeTab } = this;

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
          idx === _activeTab && 'bx--tabs__nav-item--selected'
        )
      }));
    }
    return [];
  }

  updateTabState(idx) {
    this._tabState.forEach((tab) => {
      tab.selected = tab.index === idx;
    });

    this.tabs = this._tabState;
  }

  updateContentState() {
    const items = this.querySelectorAll(`*[slot='content']`);
    items.forEach((it, idx) => {
      it.index = idx;
    });
  }

  handleTabClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const idx = parseInt(event.target.getAttribute('data-id'));
    if (!Number.isNaN(idx) && this._tabState.length > idx) {
      this.updateTabState(idx);
    }
  }

  handleSlotChange(event) {
    // initialize slot element attributes;
    this.updateContentState();
  }
}
