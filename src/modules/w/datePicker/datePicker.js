import { LightningElement, api, createElement } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, keyCodes, uid } from 'w/utils';
import { createCalendar } from './createCalendar';
import DatePickerInput from 'w/datePickerInput';

const TYPE = {
  fallbackValue: 'range',
  validValues: ['simple', 'single', 'range']
};

export default class DatePicker extends LightningElement {
  id = uid('dp-');
  calendar = null;

  @api value = '';
  @api dateFormat = 'd-m-Y';

  //Only for range date picker
  @api valueFrom = '';
  @api valueTo = '';

  @api maxDate = null;
  @api minDate = null;
  @api locale = 'en';
  @api short = false;
  @api light = false;

  inputRef = null;
  inputRefTo = null;

  _didRendered = false;
  _type = TYPE.fallbackValue;

  inputs = [];

  flatpickrProps = { static: true };

  get state() {
    return {
      range: () => { return this.type === 'range' },
      inputValue: () => { return this.value },
      inputValueFrom: () => { return this.valueFrom },
      inputValueTo: () => { return this.valueTo },
      openCalendar: () => {
        this.calendar.open();
      },
      focusCalendar: () => {
        const calendar = this.calendar;
        (
          calendar.selectedDateElem ||
          calendar.todayDateElem ||
          calendar.calendarContainer.querySelector(
            '.flatpickr-day[tabindex]'
          ) ||
          calendar.calendarContainer
        ).focus();
      }
    };
  }

  @api get type() {
    return this._type;
  }

  set type(value) {
    this._type = normalizeString(TYPE, TYPE.fallbackValue);
  }

  get computedClass() {
    return clsx(
      'bx--date-picker',
      this.short && 'bx--date-picker--short',
      this.light && 'bx--date-picker--light',
      `bx--date-picker--${this._type}`
    );
  }

  get datePickerRef() {
    return this.template.querySelector(`[data-id="${this.id}"]`);
  }

  renderedCallback() {
    if (!this._didRendered) {
      this._didRendered = true;
      this.initCalendar();
    }
  }

  // the container div is using lwc:dom="manual", which doesn't support to add <slot> inside.
  createInputElement({ mode }) {
    const container = this.template.querySelector(`[data-id="${this.id}"]`);
    const element = createElement('w-date-picker-input', {
      is: DatePickerInput
    });
    element.calendar = this.state;
    element.mode = mode;
    container.appendChild(element);
    this.inputs.push(element);
    if (mode === 'to') {
      this.inputRefTo = element.shadowRoot.querySelector('input');
    } else {
      this.inputRef = element.shadowRoot.querySelector('input');
    }
  }

  async initCalendar(options) {
    if (this._type === 'range') {
      this.createInputElement({
        mode: 'from'
      });
      this.createInputElement({
        mode: 'to'
      });
    } else {
      this.createInputElement({});
    }

    let c = this.calendar;
    if (c) {
      c.set('minDate', this.minDate);
      c.set('maxDate', maxDate);
      c.set('locale', locale);
      c.set('dateFormat', dateFormat);
      Object.entries(flatpickrProps).forEach(([option, value]) => {
        calendar.set(options, value);
      });
      return;
    }

    let ref = this.template.querySelector(`[data-id="${this.id}"]`);

    this.calendar = await createCalendar({
      options: {
        appendTo: ref,
        mode: this._type,
        dateFormat: this.dateFormat,
        minDate: this.minDate,
        maxDate: this.maxDate
      },
      base: ref,
      input: ref,
      dispatch: (event) => {
        if (event === 'change') {
          const { selectedDates, dateStr, instance } = this.calendar;
          if(this._type === 'range') {
            this.valueFrom = this.calendar.formatDate(selectedDates[0], this.dateFormat);
            this.valueTo = this.calendar.formatDate(selectedDates[1], this.dateFormat);
          } else {
            this.value = this.calendar.formatDate(selectedDates[0], this.dateFormat);
          }
        }
      }
    });

    this.calendar?.calendarContainer?.setAttribute('role', 'application');
    this.calendar?.calendarContainer?.setAttribute(
      'aria-label',
      'calendar-container'
    );
  }

  handleKeydown(event) {
    if (event.keyCode == '27') {
      event.stopPropagation();
      this.calendar?.close();
    }
  }
}
