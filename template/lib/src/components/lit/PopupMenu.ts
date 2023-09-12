import { css, html, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

export interface IMenuItem {
  name: string;
  label: string;
  icon?: string;
}

@customElement('popup-menu')
export class PopupMenu extends LitElement {
  
  static styles = [
    css`
    :host {
      background: transparent;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
    }
    
    #menu {
      position: absolute;
    }
    `
  ];

  @query("#menu") menu?: HTMLElement;
  @property({ type: Array }) menuItems: Array<IMenuItem> = [];
  @property({ type:Object }) location: { x: number; y: number; } = { x: 0, y: 0 };
  
  selectedItem: IMenuItem | null = null;

  resolve?: (value: {success: boolean, value: any} | PromiseLike<{success: boolean, value: any}>) => void;
  reject?: (reason?: any) => void;

  constructor() {
    super();

    this.onMouseUp = this.onMouseUp.bind(this);
    this.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseUp(e: MouseEvent) {
    let r = this.menu!.isCursorInElement(e);
    if (r) return;

    this.cancel();
  }
  
  render() {
    return html`
    <fast-menu id="menu" style="left: ${this.location.x}px; top: ${this.location.y}px">
      ${this.menuItems.map((item) => html`
        <fast-menu-item @click="${() => this.onMenuItemClick(item)}" .value="${item.name}">
          ${item.label}
        </fast-menu-item>
      `)}
    </fast-menu>`;
  }

  onMenuItemClick(item: IMenuItem) {
    this.selectedItem = item;
    this.ok();
  }
  
  ok() {
    if (this.selectedItem && this.resolve) {
      this.resolve({
        success: true,
        value: this.selectedItem.name
      });
    } else {
      this.cancel();
    }
  }
  
  cancel() {
    this.close();

    if (this.reject) {
      this.reject();
    }
  }
  
  async showAsync() : Promise<{success: boolean, value: any}> {
  
    await this.updateComplete;

    this.visible();
    
    return new Promise<{success: boolean, value: any}>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    }).catch((_error) => {
      return { success: false, value: null };
    });
  }

  visible() {
    // if (this.menu) {
    //   this.menu.show();
    // }

    this.hidden = false;
  }

  close() {
    // if (this.menu) {
    //   this.menu.hide();
    // }
    
    this.hidden = true;
  }
}