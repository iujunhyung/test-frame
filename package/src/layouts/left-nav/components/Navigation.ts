import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './Navigation.module.scss';

@customElement('c-navigation')
export class Navigation extends LitElement {

  static styles = unsafeCSS(styles);
  
  @property({type:Array}) menuItems: Array<any> = [];

  render() {
    
    return html `
      <div role="navigation" class="${styles.navigation}">
      </div>
    `
  }

  onClick(item:any) {
    if (item.action) {
      item.action();
    }
  }
}