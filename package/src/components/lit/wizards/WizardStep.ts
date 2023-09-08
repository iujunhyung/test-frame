import { LitElement } from "lit";
// import baseStyle from '@css/tailwind.scss';

export interface IWizardStep {
  onLeave(direction: 'back' | 'next'): any;
  onGot(direction: 'back' | 'next', data: any): void;
  validate(): boolean;
  canBack(): boolean;
  canNext(): boolean;
}

export abstract class WizardStep extends LitElement implements IWizardStep {

  static styles = [
    // unsafeCSS(baseStyle)
  ];

  validate() {
    return true;
  }

  canBack() {
    return this.validate();
  }

  canNext() {
    return this.validate();
  }

  // @ts-ignore // 기본구현은 아무것도 하지 않음
  onLeave(direction: "back" | "next") {
    return this;
  }

  // @ts-ignore // 기본구현은 아무것도 하지 않음
  onGot(direction: "back" | "next", data: any): void {
    return;
  }
}
