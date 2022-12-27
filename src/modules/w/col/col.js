import { LightningElement, api } from 'lwc';
import { clsx } from 'w/utils';

const breakpoints = ['sm', 'md', 'lg', 'xlg', 'max'];

export default class Grid extends LightningElement {
  @api noGutter = false;
  @api noGutterLeft = false;
  @api noGutterRight = false;
  @api padding = false;
  @api aspectRatio = undefined;
  @api sm = undefined;
  @api md = undefined;
  @api lg = undefined;
  @api xlg = undefined;
  @api max = undefined;

  connectedCallback() {
    this.setAttribute('class', this.computedClass);
  }

  get computedClass() {
    const {
      noGutter,
      noGutterLeft,
      noGutterRight,
      aspectRatio,
      padding,
      sm,
      md,
      lg,
      xlg,
      max
    } = this;

    let cc = clsx(
      [sm, md, lg, xlg, max].map((bp, i) => {
        const name = breakpoints[i];
        if (bp === true) {
          return `bx--col-${name}`;
        } else if (typeof bp === 'string' || typeof bp === 'number') {
          return `bx--col-${name}-${bp}`;
        } else if (typeof bp === 'object') {
          let t = [];
          if (typeof bp.span === 'number') {
            t = [...t, `bx--col-${name}-${bp.span}`];
          } else if (bp.span === true) {
            t = [...t, `bx--col-${name}`];
          }

          if (typeof bp.offset === 'number') {
            t = [...t, `bx--offset-${name}-${bp.offset}`];
          }

          return t.join(' ');
        }
      })
    );

    return clsx(
      cc,
      !cc && 'bx--col',
      noGutter && 'bx--no-gutter',
      noGutterLeft && 'bx--no-gutter--left',
      noGutterRight && 'bx--no-gutter--right',
      aspectRatio && `bx--aspect-ratio bx--aspect-ratio--${aspectRatio}`,
      padding && 'bx--col-padding',
      this.getAttribute('class')
    );
  }
}
