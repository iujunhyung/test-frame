import { css, html, LitElement, unsafeCSS } from 'lit'
import { customElement, query } from 'lit/decorators.js'

import styles from './PagePanel.module.scss';

@customElement('page-panel')
export class PagePanel extends LitElement {

  static styles = [
    unsafeCSS(styles),
    css`
    :host {
      display: block;
      height: 100%;
    }

    #outlet {
      height: 100%;
    }
  `];

  @query("#outlet") outlet?: HTMLDivElement;
  
  render() {
    return html `
      <div role="main" class="${styles.panel} ${styles.fullWidth} ${styles.primary}">
        <span aria-hidden="true" class="${styles.transitionWatcher}" tabindex="-1"></span>
        <div id="outlet"></div>
      </div>
    `
  }
}