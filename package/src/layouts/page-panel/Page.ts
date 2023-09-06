import { css, html, LitElement, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import styles from './Page.module.scss';
import blockStyles from './Block.module.scss';
import headerAreaStyles from './HeaderArea.module.scss';

@customElement('c-page')
export class Page extends LitElement {

  static styles = [
     unsafeCSS(blockStyles),
     unsafeCSS(headerAreaStyles),
     unsafeCSS(styles),
    css`
    :host {
      display: block;
      height: 100%
    }

    .container.card {
      background: var(--surface-card);
      box-shadow: 0 3px 6px rgba(0,0,0,.06);
      border-radius: 4px;
      padding: 8px;
    }
`];

  @property({type: String})
  title: string = "title";

  @property({type: Boolean, attribute: "card"})
  card: boolean = true;

  render() {
    return html `
      <div class="${styles.page} ${styles.inPrimary} ${styles.hasHeaderArea} ${styles.scrollContainer} ${blockStyles.block} ${blockStyles.borderRadiusMedium} ${blockStyles.roundedM}" data-test-id="releases-page" id="page-in-primary" data-panel-position="primary" data-test-class="page-scroll-element">
         <div class="${headerAreaStyles.headerArea} ${headerAreaStyles.paddingPanel}">
            <div class="${headerAreaStyles.bar}">
               <div class="${headerAreaStyles.textArea}">
                  <div class="${headerAreaStyles.titleArea}">
                     <h1 class="${headerAreaStyles.primaryText} ${headerAreaStyles.titleM} ${headerAreaStyles.bold}" role="heading" aria-level="1">
                        ${this.title}
                     </h1>
                  </div>
               </div>
               <div class="${headerAreaStyles.toolbar} flex items-center}">
                  <slot name="toolbar"></slot>
               </div>
            </div>
         </div>
         <div class="${styles.notification}">
            <slot name="notification"></slot>
         </div>
         <div class="${styles.fullHeightColumn}">
            <div class="${styles.pageContent} ${styles.inPrimary} ${blockStyles.paddingPanel} ${blockStyles.blockPadding} ${blockStyles.flush}">
               <div class="container ${this.card ? 'card' : ''}">
                  <slot></slot>
               </div>
            </div>
         </div>
      </div>
    `
  }
}