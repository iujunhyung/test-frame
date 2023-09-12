'use strict';

var _tslib = require('../../../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');
var RelayCommand = require('../../../services/patterns/RelayCommand.js');
var UIManager = require('../../../core/UIManager.js');

class WizardBase extends lit.LitElement {
    constructor() {
        super();
        this.steps = [];
        this.currentStepIndex = 0;
        this.backCommand = new RelayCommand.RelayCommand({
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
                }
                else {
                    return false;
                }
            }
        });
        this.nextCommand = new RelayCommand.RelayCommand({
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
                }
                else if (this.currentStepIndex < this.steps.length - 1) {
                    // 직전스텝
                    let data = this.currentStep().onLeave("next");
                    this.currentStepIndex++;
                    // 현재스텝
                    this.currentStep().onGot("next", data);
                }
                if (this.currentStepIndex == this.steps.length - 1) {
                    this.nextCommand.content = "Finish";
                }
                else {
                    this.nextCommand.content = "Next";
                }
            },
            canExecute: () => {
                if (this.currentStepIndex == this.steps.length - 1) {
                    return this.canFinish();
                }
                else if (this.currentStepIndex < this.steps.length - 1) {
                    return this.canNext();
                }
                else {
                    return false;
                }
            }
        });
        this.steps = this.initSteps();
    }
    render() {
        return lit.html `
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
    currentStep() {
        return this.steps[this.currentStepIndex];
    }
    canBack() {
        let step = this.currentStep();
        if (step.canBack && !step.canBack()) {
            return false;
        }
        return true;
    }
    canNext() {
        let step = this.currentStep();
        if (step.canNext && !step.canNext()) {
            return false;
        }
        return true;
    }
    canFinish() {
        return true;
    }
    fisish() {
        if (this.resolve) {
            this.resolve({
                success: true,
                value: this.returnValue()
            });
        }
        else {
            throw new Error("resolve is null");
        }
    }
    returnValue() {
        return this;
    }
    loadPromise(resolve, reject) {
        this.resolve = resolve;
        this.reject = reject;
    }
    showAsync() {
        return UIManager.uiManager.showDialogAsync(this);
    }
}
WizardBase.styles = [
// unsafeCSS(baseStyle)
];
_tslib.__decorate([
    decorators_js.property({ type: Array }),
    _tslib.__metadata("design:type", Array)
], WizardBase.prototype, "steps", void 0);
_tslib.__decorate([
    decorators_js.state(),
    _tslib.__metadata("design:type", Number)
], WizardBase.prototype, "currentStepIndex", void 0);

exports.WizardBase = WizardBase;
