import { css, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import { MobxLitElement } from '@adobe/lit-mobx';

import './components';
import '../page-panel'

import styles from './LeftNav.module.scss';

import { layoutStore } from "@src/stores/LayoutStore";

@customElement('left-nav')
export class LeftNav extends MobxLitElement {

  static styles = [
    unsafeCSS(styles),
    css`
    :host {
      position: relative;
      width: 100%;
      height: calc(100% - 50px);
      display: flex;
    }
`];

  render() {
    const expanded = layoutStore.leftNavExpanded;
    const isOverlayMenu = expanded && layoutStore.isLeftNavCollapsed();
    return html `
      <div id="left-nav" role="navigation" class="${styles.leftNavContainer} ${styles.newNav} ${expanded ? styles.expanded : null}">
        <div tabindex="0"></div>
        <left-nav-body></left-nav-body>
        <left-nav-footer></left-nav-footer>
      </div>
      <div tabindex="-1" aria-label="Close Side Menu" role="button" class=${isOverlayMenu ? styles.smallWindowExpandedNavOverlay : null} @click=${this.closeSideMenu}></div>
      <div id="layout-viewport" class="${styles.viewPort}">
        <page-panel></page-panel>
      </div>
    `
  }

  closeSideMenu() {
    layoutStore.toggleNavSize();
  }
}
