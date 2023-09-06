import { html, LitElement, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'

import styles from './Filter.module.scss';

@customElement('c-filler')
export class Filler extends LitElement {

  static styles = unsafeCSS(styles);

  render() {
    return html `<div class="${styles.filler}"></div>`
  }
}