import { LitElement, unsafeCSS, CSSResultGroup, TemplateResult, html } from "lit";
import { MobxLitElement } from '@adobe/lit-mobx';

import baseStyle from '@css/tailwind.scss';

export declare class IPageBase {
  // highlight: boolean;
  // renderHighlight(content: unknown): unknown;
}

export const PageMixin = <T extends Constructor<LitElement>>(superClass: T) => {
    
  class PageElement extends superClass {
    // Adds some styles...
    static styles = [
      unsafeCSS(baseStyle),
      (superClass as unknown as typeof LitElement).styles ?? [],
      // css`:host {
      // }`
    ];
  }

  return PageElement as Constructor<IPageBase> & T;
};

export abstract class PageBaseMixin extends PageMixin(MobxLitElement) {

  static styles: CSSResultGroup = [
    super.styles as CSSResultGroup,
  ];
  
  abstract pageTitle: string;
  
  abstract renderContent(): TemplateResult<1>;
  
  render() {
    return html`
      <c-page title=${this.pageTitle}>
        ${this.renderContent()}
      </c-page>`;
  }
}

type Constructor<T> = new (...args: any[]) => T;