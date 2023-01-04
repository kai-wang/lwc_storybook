import { LightningElement, wire } from 'lwc';
import ContextProvider from 'w/provider';
import { uid } from 'w/utils';

export default class Consumer extends LightningElement {
    // eslint-disable-next-line @lwc/lwc/valid-wire
    @wire(ContextProvider.Provider) context;

    id = uid('cs-');

    get theme() {
        return this.context.theme;
    }

    get themeClass() {
        return `${this.theme}-theme`;
    }
}
