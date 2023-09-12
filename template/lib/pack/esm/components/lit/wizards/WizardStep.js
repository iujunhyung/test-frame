import { LitElement } from 'lit';

class WizardStep extends LitElement {
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
    onLeave(direction) {
        return this;
    }
    // @ts-ignore // 기본구현은 아무것도 하지 않음
    onGot(direction, data) {
        return;
    }
}
WizardStep.styles = [
// unsafeCSS(baseStyle)
];

export { WizardStep };
