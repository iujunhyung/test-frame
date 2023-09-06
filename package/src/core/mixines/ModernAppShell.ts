import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js'
import { MobxLitElement } from '@adobe/lit-mobx';

import { AppShellMixin } from './AppShellMixin';
import '@src/layouts/UBody';
import '@src/layouts/left-nav/LeftNav';
import '@src/layouts/top-bar/TopBar';

@customElement('modernapp-shell')
export class ModernApp extends AppShellMixin(MobxLitElement) {
  
  static styles = [
    css`
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `];
  
  render() {
    return html`
        <u-body>
          <top-bar style="z-index: 1"></top-bar>
          <left-nav style="z-index: 0"></left-nav>
        </u-body>
      ` 
  }
}
