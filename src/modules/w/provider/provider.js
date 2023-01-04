import { api } from 'lwc';
import LightningContextElement from 'lightning/context';
import { uid } from 'w/utils';

export default class Provider extends LightningContextElement {

    @api id = uid('pv-');

    @api
    get theme() {
        return this._theme;
    }

    set theme(data) {
        this._theme = data;
        this.setContext({ theme: data });
    }

    static getDefaultContext() {
        return {
            theme: 'dark',
        };
    }
}
