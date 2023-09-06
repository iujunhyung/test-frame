import {css, html, unsafeCSS} from 'lit'
import { MobxLitElement } from '@adobe/lit-mobx';
import {customElement} from 'lit/decorators.js'

import footerStyles from './LeftNavFooter.module.scss';
import iconStyles from './Icon.module.scss';

import { layoutStore } from '@src/stores/LayoutStore';

@customElement('left-nav-footer')
export class LeftNavFooter extends MobxLitElement {

  static styles = [
    unsafeCSS(footerStyles),
    unsafeCSS(iconStyles),
    css`
    :host {
      display: flex;
      flex-shrink: 0;
      justify-content: flex-end;
    }
`];

  render() {
    return html ` 
      <div class="${footerStyles.expander}}">
        <div>
            <button type="button" class="${footerStyles.expanderButton} ${footerStyles.unbutton}" @click=${this.toggleExpander}>
            ${layoutStore.leftNavExpanded 
              ? html`
              <svg aria-label="Double Chevron Left" class="${iconStyles.icon} ${iconStyles.xsmall} ${iconStyles.primary}"  width="32" height="32" viewBox="0 0 32 32">
                  <path fill="#000" fill-opacity=".4" fill-rule="evenodd" d="M18.3 2.3L4.5 16l13.8 13.7-2 2L.9 16 16.4.4l1.9 1.9zm13.3 0L18 16l13.7 13.7-1.9 2L14.1 16 29.7.4l2 1.9z"></path>
              </svg>` 
              : html`
              <svg aria-label="Double Chevron Right" class="${iconStyles.icon} ${iconStyles.xsmall} ${iconStyles.primary}"  width="32" height="32" viewBox="0 0 32 32"><path fill="#000" fill-opacity=".4" fill-rule="evenodd" d="M13.7 2.3l2-2L31.1 16 15.6 31.6l-1.9-1.9L27.5 16 13.7 2.3zM.4 2.3l1.9-2L17.9 16 2.3 31.6l-2-1.9L14.2 16 .4 2.3z"></path></svg>`}
              
            </button>
        </div>
      </div>
    `

  }

  toggleExpander() {
    layoutStore.toggleNavSize();
  }
}