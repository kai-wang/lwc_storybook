import { LightningElement, api } from 'lwc';
import { clsx, normalizeString, normalizeBoolean } from 'w/utils';

const breakpoints = ['sm', 'md', 'lg', 'xlg', 'max'];

export default class Grid extends LightningElement {
  @api condensed = false;
  @api narrow = false;
  @api fullWidth = false;
  @api noGutter = false;
  @api noGutterLeft = false;
  @api noGutterRight = false;
  @api padding = false;
  @api row = false;
  @api col = false;
  @api aspectRatio = undefined;
  @api sm = undefined;
  @api md = undefined;
  @api lg = undefined;
  @api xlg = undefined;
  @api max = undefined;

  renderedCallback() {
    this.setAttribute('class', this.computedClass);
  }

  get computedClass() {
    const { row, col, rowClass, columnClass, gridClass } = this;

    if (row) {
      return rowClass;
    }

    if (col) {
      return columnClass;
    }

    return gridClass;
  }

  get rowClass() {
    const {
      condensed,
      narrow,
      noGutter,
      noGutterLeft,
      noGutterRight,
      padding
    } = this;

    return clsx(
      'bx--row',
      condensed && 'bx--row--condensed',
      narrow && 'bx--row--narrow',
      noGutter && 'bx--no-gutter',
      noGutterLeft && 'bx--no-gutter--left',
      noGutterRight && 'bx--no-gutter--right',
      padding && 'bx--row-padding',
      this.getAttribute('class')
    );
  }

  get columnClass() {
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
        } else if (typeof bp === 'string') {
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

  get gridClass() {
    const {
      condensed,
      narrow,
      fullWidth,
      noGutter,
      noGutterLeft,
      noGutterRight,
      padding
    } = this;

    return clsx(
      'bx--grid',
      condensed && 'bx--grid--condensed',
      narrow && 'bx--grid--narrow',
      fullWidth && 'bx--grid--full-width',
      noGutter && 'bx--no-gutter',
      noGutterLeft && 'bx--no-gutter--left',
      noGutterRight && 'bx--no-gutter--right',
      padding && 'bx--row-padding',
      this.getAttribute('class')
    );
  }
}
