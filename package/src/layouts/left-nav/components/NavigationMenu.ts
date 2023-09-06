import { css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { MobxLitElement } from '@adobe/lit-mobx';

import { layoutStore } from '@src/stores/LayoutStore';

import styles from './NavigationMenu.module.scss';

@customElement('navigation-menu')
export class NavigationMenu extends MobxLitElement {

  static styles = [
    unsafeCSS(styles),
    css`
`];

  @property({type: Object})
  context: object | null = null;
  
  @property({type: String})
  display: string = "navigation-menu";

  @property({type: String, attribute: 'icon-data'})
  iconData: string = "";

  @property({type: String, attribute: 'icon-size'})
  iconSize: String = '20';

  @property({type: Boolean, attribute: 'icon-evenodd'})
  iconEvenodd: boolean = false;
  
  @property({type: String})
  href: string | null = null;

  @property({type: Array, attribute: 'menu-items'})
  menuItems: any[] = [];
  
  render() {

    let menuItems = this.menuItems;
    let hasItems = menuItems?.some(x => x);
    const expanded = layoutStore.leftNavExpanded;
    
    return html `
      <div class="navigation-menu ${expanded ? styles.expanded : null} ${styles.active}">
        <top-level-link 
          display=${this.display}
          icon-data=${this.iconData}
          icon-size=${this.iconSize}
          icon-evenodd=${this.iconEvenodd}
          .href=${this.href}
          has-items=${hasItems}>
        </top-level-link>

        ${expanded ? this.renderPresentation(menuItems) : null}
      </div>
    `
  }
  
  renderPresentation(menuItems: any[]) {
    return html`
      <div role="presentation" class="${styles.expandedList}">
        ${
          menuItems?.map(p => {
            // TODO: active
            // return html`<child-link display="${p.display}" active="true"></child-link>`;
            if (p) {
              return html`<child-link display="${p.getDisplay()}" .href=${"href"}></child-link>`;

            } else if (p.display) {
              return html`<child-link display="${p.display}" .href=${p.href}></child-link>`;

            } else {
              console.error('not implements');
              throw null;
            }
          })
        }
      </div>    
    `;
  }
}