import { createElement } from 'lwc';
import Alert from 'w/alert';
import {normalizeBoolean} from 'w/utils';

describe('w-alert', () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('should render', () => {
    // Create initial element
    const element = createElement('w-alert', {
      is: Alert,
    });

    // console.log('template', element.shadowRoot);
    

    return Promise.resolve().then(() => {
      expect(element).toMatchSnapshot();
    });
  });
});
