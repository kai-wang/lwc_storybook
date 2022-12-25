import { LightningElement, api, createElement } from 'lwc';
import { clsx } from 'w/utils';
import LightningContextElement from 'lightning/context';
import { normalizeString, keyCodes, uid } from 'w/utils';
import { createCalendar } from './createCalendar';
import DatePickerInput from 'w/datePickerInput';

const TYPE = {
  fallbackValue: 'range',
  validValues: ['simple', 'single', 'range']
};

export default class DatePicker extends LightningContextElement {
  id = uid('dp-');
  calendar = null;

  @api value = '';
  @api dateFormat = 'dd/mm/yyyy';

  //Only for range date picker
  @api valueFrom = '';
  @api valueTo = '';

  @api maxDate = null;
  @api minDate = null;
  @api locale = 'en';
  @api short = false;
  @api light = false;

  _didRendered = false;
  _type = TYPE.fallbackValue;

  inputs = [];

  flatpickrProps = { static: true };

  state = {
    range: false,
    inputValue: '',
    inputValueFrom: '',
    inputValueTo: ''
  };

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
    if(!this._didRendered) {
      this._didRendered = true;
      this.initCalendar();
    }
  }

  createInputElement({ mode }) {
      const container = this.template.querySelector(`[data-id="${this.id}"]`);
      const element = createElement('w-date-picker-input', { is: DatePickerInput });
      element.calendar = this.state;
      element.mode = mode;
      container.appendChild(element);
      this.inputs.push(element);
  }

  async initCalendar() {
    let inputRef = this.template.querySelector(`[data-id="${this.id}"]`);

    this.calendar = await createCalendar({
      options: {
        appendTo: inputRef,
        mode: this._type,
        locale: this.locale
      },
      base: inputRef,
      input: inputRef,
      dispatch: (event) => {
        if (event === 'change') {
          const { selectedDates, dateStr, instance } = this.calendar;
          for (let [index, val] of selectedDates.entries()) {
            this.inputs[index].value = val;
          }
        }
      }
    });

    if(this._type === 'range') {
      this.createInputElement({ 
        mode: 'from'
      });
      this.createInputElement({
        mode: 'to'
      });
    } else {
      this.createInputElement({});
    }
  }

  //   // let inputRef = { value: '' };
  //   // let inputRefTo = { value: '' };
  //   // let options= [];

  //   // let calendar = await createCalendar({
  //   //   options: {
  //   //     ...options,
  //   //     appendTo: this.datePickerRef,
  //   //     defaultDate: '',
  //   //     mode: 'single',
  //   //   },
  //   //   base: inputRef,
  //   //   input: inputRefTo,
  //   //   dispatch: (event) => {
  //   //     const detail = { selectedDates: calendar.selectedDates };

  //   //     detail.dateStr = inputRef.value;

  //   //     return;
  //   //   }});

  //   //   console.log(calendar);
  // }

  // _type = TYPE.fallbackValue;

  // @api short = false;
  // @api light = false;
  // @api value = '';
  // @api valueFrom = '';
  // @api valueTo = '';
  // @api dateFormat = 'd/m/Y';
  // @api maxDate = null;
  // @api minDate = null;
  // @api locale = 'en';

  // id = uid('dp-');

  // _flatpickProps = { static: true };
  // _calendar = null;
  // _datePicker = null;

  // @api get type() {
  //   return this._type;
  // }

  // set type(value) {
  //   this._type = normalizeString(value, TYPE);
  // }

  // get computedClass() {
  //   return clsx(
  //     'bx--date-picker',
  //     this.short && 'bx--date-picker--short',
  //     this.light && 'bx--date-picker--light',
  //     `bx--date-picker--${this._type}`
  //   );
  // }

  // handleKeydown(event) {
  //   if (event.keyCode == '27') {
  //     event.stopPropagation();
  //   }
  // }

  // setContext() {
  //   this._context['DatePicker'] = {
  //     range,
  //     inputValue,
  //     inputValueFrom,
  //     inputValueTo,
  //     inputIds,
  //     hasCalendar,
  //     add: (data) => {
  //       this.inputs.update((_) => [..._, data]);
  //     },
  //     declareRef: ({ id, ref }) => {
  //       if()
  //     }
  //   }
  // }

  // connectedCallback() {
  //   let self = this;
  //   self.setContext('DatePicker', {
  //     range,
  //     inputValue,
  //     inputValueFrom,
  //     inputValueTo,
  //     inputIds,
  //     hasCalendar,
  //     add: (data) => {
  //       self.inputs.update((_) => [..._, data]);
  //     },
  //     updateValue: ({ type, value }) => {
  //       if ((!self._calendar && type === 'input') || type === 'change') {
  //         inputValue.set(value);
  //       }

  //       if (!self._calendar && type === 'change') {
  //         dispatchEvent(new CustomEvent('change'));
  //       }
  //     },
  //     openCalendar: () => {
  //       self._calendar.open();
  //     }
  //   });
  //   console.log('init calendar');
  //   this.initCalendar();
  // }

  // async initCalendar(options) {
  //   let { _calendar, minDate, maxDate, locale, dateFormat, flatpickrProps } = this;

  //   if(_calendar) {
  //     _calendar.set('minDate', minDate);
  //     _calendar.set('maxDate', maxDate);
  //     _calendar.set('locale', locale);
  //     _calendar.set('dataFormat', dateFormat);

  //     Object.entries(flatpickrProps).forEach(([option, value]) => {
  //       _calendar.set(option, value);
  //     });
  //     return;
  //   }

  //   calendar = await createCalendar({
  //     options: {
  //       ...options,
  //       appendTo: datePickerRef,
  //       defaultDate: inputValue,
  //       mode: mode
  //     },
  //     base: inputRef,
  //     input: inputRefTo,
  //     dispatch: (event) => {
  //       const detail = { selectedDates: _calendar.selectedDates };
  //       if(range) {
  //         const from = inputRef.value;
  //         const to = inputTefTo.value;
  //         detail.dateStr = {
  //           from: inputRef.value,
  //           to: inputRefTo.value,
  //         };

  //         valueFrom = from;
  //         valueTo = to;
  //       } else {
  //         detail.dateStr = inputRef.value;
  //       }

  //       return dispatch(event, detail);
  //     }
  //   })
  // }

  // get inputValue() {
  //   return this._inputValue;
  // }

  // get mode() {
  //   return this._mode;
  // }

  // get datePickerRef() {
  //   return this.template.querySelector('[data-id="${this.id}"]');
  // }
}
