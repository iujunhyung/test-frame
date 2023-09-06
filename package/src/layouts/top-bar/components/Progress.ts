import {html, LitElement, unsafeCSS} from 'lit'
import {customElement} from 'lit/decorators.js'

import styles from './Progress.module.scss';

@customElement('c-progress')
export class Progress extends LitElement {

  static styles = [
    unsafeCSS(styles),
  ];

  render() {
    return html `
    <span class=${styles.container} data-test-id="page-progress" data-test-state="done"><span class="${styles.bar} ${styles["bar-blue"]}" style="transition-duration: 0ms, 350ms, 350ms; transform: scaleX(0); opacity: 1;"></span></span>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'c-progress': Progress
  }
}
