import { html, LitElement, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import styles from './ChildLink.module.scss';

@customElement('child-link')
export class ChildLink extends LitElement {

  static styles = unsafeCSS(styles);

  @property({type: String})
  display: string = "child-item";

  @property({type: String})
  href: string | null = null;

  @property({type: Boolean})
  active: boolean = false;  
  
  render() {
    return html `
      <a 
        class="${this.active ? styles.active : null} ${styles.childLink}"
        href=${this.href}>
        ${this.display}
      </a>
    `
  }
}