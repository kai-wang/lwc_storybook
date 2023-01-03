import { LightningElement, api, track } from 'lwc';
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
  _activeTab;
  _tabs = [];

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
    if(!Array.isArray(data)) return [];

    this._tabState = data;
  }

  updateTabState() {
    
    this.tabs = this._tabs.map((tab) => ({
      label: tab.label,
      href: tab.href || '#',
      id: tab.id,
      selected: this.activeTab === tab.id,
      disabled: tab.disabled,
      style: this.autoWidth ? 'width: auto' : '',
      computedClass: clsx(
        'bx--tabs__nav-item',
        tab.disabled && 'bx--tabs__nav-item--disabled',
        this.activeTab === tab.id && 'bx--tabs__nav-item--selected'
      )
    }));
  }

  initializeTabs() {
    const items = this.querySelectorAll(`*[slot='content']`);
    if(!items || items.length === 0) return;

    items.forEach((it) => {
      this._tabs.push(it);
      if(it.selected)
        this.activeTab = it.id;
    });

    this.activeTab = this.activeTab || items[0].id;
    this.updateTabState();
  }

  handleTabClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.activeTab = event.currentTarget.dataset.id;
    this.updateTabState();
  }

  handleSlotChange() {
    // initialize slot element attributes;
    this.initializeTabs();
  }
}
