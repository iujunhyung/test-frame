'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');
var fastComponents = require('@microsoft/fast-components');
var ObservableMixin = require('../../core/ObservableMixin.js');
var mobx = require('mobx');

fastComponents.provideFASTDesignSystem().register(fastComponents.fastButton());
exports.UButton = class UButton extends ObservableMixin.ObservableMixin(lit.LitElement) {
    onChangedCommand(command) {
        if (command) {
            if (command.content) {
                this.innerText = command.content;
            }
            mobx.reaction(() => command.content, (content) => {
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
        return lit.html `<fast-button id='btn' @click=${this.onClick} appearance=${this.appearance} ?disabled=${this.disabled}><slot></slot></fast-button>`;
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
exports.UButton.styles = [
    lit.css `
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
_tslib.__decorate([
    decorators_js.property({ type: String }),
    _tslib.__metadata("design:type", Object)
], exports.UButton.prototype, "href", void 0);
_tslib.__decorate([
    decorators_js.property({ type: String, attribute: 'appearance' }),
    _tslib.__metadata("design:type", Object)
], exports.UButton.prototype, "appearance", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Boolean, attribute: 'accent' }),
    _tslib.__metadata("design:type", Boolean)
], exports.UButton.prototype, "accent", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Boolean, attribute: 'disabled' }),
    _tslib.__metadata("design:type", Boolean)
], exports.UButton.prototype, "disabled", void 0);
_tslib.__decorate([
    decorators_js.property({ type: Object }),
    _tslib.__metadata("design:type", Object)
], exports.UButton.prototype, "command", void 0);
_tslib.__decorate([
    decorators_js.property(),
    _tslib.__metadata("design:type", Object)
], exports.UButton.prototype, "commandParameter", void 0);
exports.UButton = _tslib.__decorate([
    decorators_js.customElement('u-button'),
    _tslib.__metadata("design:paramtypes", [])
], exports.UButton);
