import { css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { layoutStore } from '@src/stores/LayoutStore';
import { MobxLitElement } from '@adobe/lit-mobx';

import styles from './LeftNavBody.module.scss';

@customElement('left-nav-body')
export class LeftNavBody extends MobxLitElement {

  static styles = [
    unsafeCSS(styles),
    css`
    :host {
      height: 100%;
      position: relative;
      overflow: hidden;
    }
  `];

  @property({type:Array}) menuItems: Array<any> = [];
  
  render() {
    const expanded = layoutStore.leftNavExpanded;
    
    return html `
      <div class="${styles.transitionGroup}">
        <div class="${styles.navItemsContainer} ${expanded ? styles.expanded : null}">
          <c-navigation .menuItems=${this.menuItems}></c-navigation>
        </div>
      </div>
    `
  }
}