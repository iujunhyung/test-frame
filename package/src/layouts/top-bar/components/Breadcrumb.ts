import { html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import { MobxLitElement } from '@adobe/lit-mobx';

import globalCss from '~@css/global-tw.scss';
import styles from './Breadcrumb.scss';

@customElement('c-breadcrumb')
export class Breadcrumb extends MobxLitElement {

  static styles = [
    unsafeCSS(globalCss),
    unsafeCSS(styles)
  ];

  render() {
    return html `
      <nav aria-label="Breadcrumb" role="navigation" class="container">
        <ol class="list paragraph-m flex">
          
        </ol>
      </nav>
    `
  }

  renderSeparator(): unknown {
    return html`
      <li>
        <div class="separator">/</div>
      </li>`
  }
}