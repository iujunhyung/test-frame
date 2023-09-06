import { css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { MobxLitElement } from '@adobe/lit-mobx';

import { layoutStore } from '@src/stores/LayoutStore';

import TopStyles from './TopLevelLink.module.scss';
import iconStyles from './Icon.module.scss';

@customElement('top-level-link')
export class TopLevelLink extends MobxLitElement {

  static styles = [
    unsafeCSS(TopStyles),
    unsafeCSS(iconStyles),
    css`
  `];

  @property({type: String})
  label: string | null = null;

  @property({type: String})
  display: string = 'menu-item';

  @property({type: Number, attribute: "icon-size"})
  iconSize: number | undefined = 20;
  
  @property({type: String, attribute: "icon-data"})
  iconData: string = '';  

  @property({type: Boolean, attribute: 'icon-evenodd'})
  iconEvenodd: boolean = false;

  @property({type: Boolean, attribute: "has-items"})
  hasItems: boolean = false;

  @property({type: String})
  href: string | null = null;
  
  render() {
    const label = this.label ?? this.display;
    const evenodd = this.iconEvenodd ? 'fill-rule: evenodd' : null;
    const expanded = layoutStore.leftNavExpanded;
    
    let viewBoxSize = this.iconSize ?? 20;
    const viewBox = `0 0 ${viewBoxSize} ${viewBoxSize}`;
    
    return html `
      <a aria-label="${label}" 
        class="${TopStyles.topLevelLink} ${TopStyles.withActiveIndicator} ${TopStyles.withActiveIndicator} ${TopStyles.noChildren}"
        href=${this.href}>
        <div class="${TopStyles.linkContent} ${expanded ? TopStyles.expanded : null}">
            <svg aria-label="${label}" class="${TopStyles.icon} ${iconStyles.small} ${iconStyles.primary}" viewBox=${viewBox}>
              <path d="${this.iconData}" style="${evenodd}"></path>
            </svg>
            <div class="${TopStyles.linkText}">${this.display}</div>
        </div>
      </a>
    `
  }
}