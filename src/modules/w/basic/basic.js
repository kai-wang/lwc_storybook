import { LightningElement, track } from 'lwc';

const themesToggleMap = { light: 'dark', dark: 'light' };

export default class Basic extends LightningElement {
    @track _theme = 'dark';

    toggleTheme() {
        this._theme = themesToggleMap[this._theme];
    }

    @track _theme2 = 'light';
}
