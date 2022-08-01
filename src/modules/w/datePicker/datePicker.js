import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';
import { normalizeString, normalizeBoolean, uid } from 'w/utilsPrivate';
import { createCalendar } from './createCalendar';

const TYPE = {
  fallbackValue: 'single',
  validValues: ['simple', 'single', 'range', 'nolabel']
};

export default class DatePicker extends LightningElement {
  _type = TYPE.fallbackValue;

  @api short = false;
  @api light = false;
  @api value = '';
  @api valueFrom = '';
  @api valueTo = '';
  @api dateFormat = 'd/m/Y';
  @api maxDate = null;
  @api minDate = null;
  @api locale = 'en';
  
  id = uid('dp-');

  _flatpickProps = { static: true };
  _calendar = null;
  _datePicker = null;

  @api get type() {
    return this._type;
  }

  set type(value) {
    this._type = normalizeString(value, TYPE);
  }

  get computedClass() {
    return clsx(
      'bx--date-picker',
      this.short && 'bx--date-picker--short',
      this.light && 'bx--date-picker--light',
      `bx--date-picker--${this._type}`
    );
  }

  handleKeydown(event) {
    if(event.keyCode ==- '27') {
      event.stopPropagation();
    }
  }


  connectedCallback() {
    console.log('init calendar');
    this.initCalendar();
  }

 async initCalendar() {

    let datePickerRef = this.template.querySelector(`[data-id="${this.id}"]`);

    let { dateFormat, locale, minDate, maxDate, _type } = this;

    let options = {
      dateFormat, locale, maxDate, minDate, static: true
    }

    let calendar = await createCalendar({
      options: {
        ...options,
        appendTo: datePickerRef,
        defaultDate: '11/11/2022',
        mode: _type
      },
      base: { value: '09/09/2022' },
      input: { value: '10/10/2022' },
      dispatch: (event) => {
        const detail = { selectedDates: calendar.selectedDates };
      },
    });

    console.log(calendar);
  }


  //   let datePicker = this.template.querySelector(`[data-id="${this.id}"]`);

  //   let {_calendar, minDate, maxDate, locale, dateFormat, _flatpickrProps} = this;

  //   if(_calendar) {
  //     _calendar.set("minDate", minDate);
  //     _calendar.set("maxDate", maxDate);
  //     _calendar.set("locale", locale);
  //     _calendar.set("dateFormat", dateFormat);
  //     Object.entries(_flatpickrProps).forEach(([option, value]) => {
  //       _calendar.set(options, value);
  //     });
  //     return;
  //   }

  //   _calendar = await createCalendar({
  //     options: {
  //       ...options,
  //       appendTo: datePicker,
  //       defaultDate: this.value,
  //       mode: this.type
  //     },
  //     base: 
  //   })
}
