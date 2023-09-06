import { LitElement, html, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";

import { RelayCommand } from "@src/services/RelayCommand";

import baseStyle from '~@css/global-tw.scss';
import { uiManager } from "@src/core/UIManager";
import { IWizardStep } from "./WizardStep";

export abstract class WizardBase extends LitElement {
  
  static styles = [
    unsafeCSS(baseStyle)
  ];
  
  @property({type: Array}) steps: Array<HTMLElement | IWizardStep> = [];
  @state() currentStepIndex: number = 0;

  backCommand: RelayCommand;
  nextCommand: RelayCommand;
  
  resolve?: (value: {success: boolean, value: any} | PromiseLike<{success: boolean, value: any}>) => void;
  reject?: (reason?: any) => void;

  constructor() {
    super();
    this.backCommand = new RelayCommand({
      content: "Back",
      execute: () => {
        if (this.backCommand.canExecute() == false) {
          return;
        }

        if (this.currentStepIndex > 0) {
          // 직전스텝
          let data = this.currentStep().onLeave("back");
          this.currentStepIndex--;
          // 현재스텝
          this.currentStep().onGot("back", data);
        }
      },
      canExecute: () => {
        if (this.currentStepIndex > 0) {
          return this.canBack();

        } else {
          return false;
        }
      }
    });

    this.nextCommand = new RelayCommand({
      content: "Next",
      execute: () => {
        if (this.nextCommand.canExecute() == false) {
          return;
        }

        if (this.currentStepIndex == this.steps.length - 1) {
          if (this.canFinish()) {
            this.fisish();
          }
          return;
        } else if (this.currentStepIndex < this.steps.length - 1) {
          // 직전스텝
          let data = this.currentStep().onLeave("next");
          this.currentStepIndex++;
          // 현재스텝
          this.currentStep().onGot("next", data);          
        }
        
        if (this.currentStepIndex == this.steps.length - 1) {
          this.nextCommand.content = "Finish";
        } else {
          this.nextCommand.content = "Next";
        }
      },
      canExecute: () => {
        if (this.currentStepIndex == this.steps.length - 1) {
          return this.canFinish();
          
        } else if (this.currentStepIndex < this.steps.length - 1) {
          return this.canNext();

        } else {
          return false;
        }
      }
    });
    this.steps = this.initSteps();
  }

  abstract initSteps(): Array<HTMLElement>;
  
  render() {
    return html`
      <div class="p-2">
        <h4>${this.title}</h4>

        ${this.currentStep()}
        
        <div class="flex justify-end items-center gap-1">
          <!-- back, next -->
          <u-button .command=${this.backCommand}></u-button>
          <u-button .command=${this.nextCommand} accent></u-button>
        </div>
      </div>
    `;
  }

  currentStep(): IWizardStep {
    return <IWizardStep>this.steps[this.currentStepIndex];
  }

  canBack(): boolean {
    let step: any = this.currentStep();
    if (step.canBack && !step.canBack()) {
      return false;
    }
    return true;
  }

  canNext(): boolean {
    let step: any = this.currentStep();
    if (step.canNext && !step.canNext()) {
      return false;
    }
    return true;
  }

  canFinish(): boolean {
    return true;
  }

  fisish() {
    if (this.resolve) {
      this.resolve({
        success: true,
        value: this.returnValue()
      });
    } else {
      throw new Error("resolve is null");
    }
  }

  returnValue(): any {
    return this;
  }

  loadPromise(
    resolve?: (value: {success: boolean, value: any} | PromiseLike<{success: boolean, value: any}>) => void,
    reject?: (reason?: any) => void  
  ) {
    this.resolve = resolve;
    this.reject = reject;
  }

  showAsync() {
    return uiManager.showDialogAsync(this);
  }
}
