import { html, LitElement, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'

import './components';

import globalCss from '~@css/global-tw.scss';
import stylesLine from './TopBar.module.scss';

@customElement('top-bar')
export class TopBar extends LitElement {

  static styles = [
    unsafeCSS(globalCss),
    unsafeCSS(stylesLine),
  ];

  render() {
    return html `
      <div class="navigation-wrapper">
        <div class="flex justify-between items-center">
            <app-logo></app-logo>
            <c-breadcrumb></c-breadcrumb>
            <div class="grow"></div>
            <div class="flex">
              <c-button></c-button>
            </div>
        </div>
        <c-progress></c-progress>
      </div>
    `
  }
}