import { __decorate, __metadata } from '../../_virtual/_tslib.js';
import { css, html, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { provideFASTDesignSystem, fastButton } from '@microsoft/fast-components';
import { ObservableMixin } from '../../core/ObservableMixin.js';
import { reaction } from 'mobx';

provideFASTDesignSystem().register(fastButton());
let UButton = class UButton extends ObservableMixin(LitElement) {
    onChangedCommand(command) {
        if (command) {
            if (command.content) {
                this.innerText = command.content;
            }
            reaction(() => command.content, (content) => {
                this.innerText = content;
            });
        }
    }
    constructor() {
        super();
        this.href = null;
        this.appearance = null; // accent, lightweight, neutral, outline, stealth
        this.accent = false;
        this.disabled = false;
        this.command = undefined;
        this.commandParameter = undefined;
        if (this.hasAttribute('icon')) {
            this.appearance = 'stealth';
        }
    }
    render() {
        if (this.accent) {
            this.appearance = "accent";
        }
        else if (this.href && this.appearance == null) {
            this.appearance = "lightweight";
        }
        return html `<fast-button id='btn' @click=${this.onClick} appearance=${this.appearance} ?disabled=${this.disabled}><slot></slot></fast-button>`;
    }
    onClick() {
        if (this.command) {
            this.command.execute(this.commandParameter);
        }
        else if (this.href) {
            window.location.href = this.href;
        }
        else ;
    }
};
UButton.styles = [
    css `
    :host {
      --neutral-fill-stealth-rest: none;
      display: inline-flex;
    }
    
    :host(.block) {
      display: block;
      width: 100%;
      padding: 0.2em 0;
    }

    :host(.block) #btn {
      display: flex;
    }
    `
];
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], UButton.prototype, "href", void 0);
__decorate([
    property({ type: String, attribute: 'appearance' }),
    __metadata("design:type", Object)
], UButton.prototype, "appearance", void 0);
__decorate([
    property({ type: Boolean, attribute: 'accent' }),
    __metadata("design:type", Boolean)
], UButton.prototype, "accent", void 0);
__decorate([
    property({ type: Boolean, attribute: 'disabled' }),
    __metadata("design:type", Boolean)
], UButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], UButton.prototype, "command", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], UButton.prototype, "commandParameter", void 0);
UButton = __decorate([
    customElement('u-button'),
    __metadata("design:paramtypes", [])
], UButton);

export { UButton };
