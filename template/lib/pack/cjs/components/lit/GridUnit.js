'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var lit = require('lit');
var decorators_js = require('lit/decorators.js');

exports.GridUnit = class GridUnit extends lit.LitElement {
    constructor() {
        super(...arguments);
        this.orientation = "horizontal";
        this.init = "5:5"; // 초기비율
    }
    firstUpdated(_changedProperties) {
        const _super = Object.create(null, {
            firstUpdated: { get: () => super.firstUpdated }
        });
        return _tslib.__awaiter(this, void 0, void 0, function* () {
            _super.firstUpdated.call(this, _changedProperties);
            yield this.updateComplete;
            this.load();
        });
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('orientation')) {
            this.style.setProperty('--flex-direction', this.orientation === 'horizontal' ? 'row' : 'column');
        }
    }
    render() {
        return lit.html `
      <div id="item1">
        <slot name="item1"></slot>
      </div>
      <x-splitter orientation=${this.orientation} @on-dragged=${this.onDragged}></x-splitter>
      <div id="item2">
        <slot name="item2"></slot>
      </div>
    `;
    }
    onDragged(e) {
        if (e.detail) {
            let v = e.detail;
            this.resize(v);
        }
    }
    resize(v) {
        if (this.orientation === "horizontal") {
            let item1Width = this.item1.clientWidth;
            let item2Width = this.item2.clientWidth;
            let totalWidth = item1Width + item2Width;
            let item1WidthPercent = (item1Width + v) / totalWidth * 100;
            let item2WidthPercent = (item2Width - v) / totalWidth * 100;
            this.item1.style.width = `${item1WidthPercent}%`;
            this.item2.style.width = `${item2WidthPercent}%`;
        }
        else {
            let item1Height = this.item1.clientHeight;
            let item2Height = this.item2.clientHeight;
            let totalHeight = item1Height + item2Height;
            let item1HeightPercent = (item1Height + v) / totalHeight * 100;
            let item2HeightPercent = (item2Height - v) / totalHeight * 100;
            this.item1.style.height = `${item1HeightPercent}%`;
            this.item2.style.height = `${item2HeightPercent}%`;
        }
        this.save();
    }
    save() {
        if (this.key) {
            let sizeRatio;
            if (this.orientation === "horizontal") {
                sizeRatio = JSON.stringify({
                    width1: this.item1.style.width,
                    width2: this.item2.style.width
                });
            }
            else {
                sizeRatio = JSON.stringify({
                    height1: this.item1.style.height,
                    height2: this.item2.style.height
                });
            }
            localStorage.setItem(this.key, sizeRatio);
        }
    }
    load() {
        if (this.key) {
            let sizeRatio = localStorage.getItem(this.key);
            if (sizeRatio) {
                let parsedRatio = JSON.parse(sizeRatio);
                if (this.orientation === "horizontal") {
                    this.item1.style.width = parsedRatio.width1;
                    this.item2.style.width = parsedRatio.width2;
                }
                else {
                    this.item1.style.height = parsedRatio.height1;
                    this.item2.style.height = parsedRatio.height2;
                }
                return;
            }
        }
        if (this.init && this.init.includes(":")) {
            let parts = this.init.split(":");
            let left = parseFloat(parts[0]);
            let right = parseFloat(parts[1]);
            let total = left + right;
            if (left && right && total != 0) {
                left = (left / total) * 100;
                right = (right / total) * 100;
                if (this.orientation === "horizontal") {
                    this.item1.style.width = `${left}%`;
                    this.item2.style.width = `${right}%`;
                }
                else {
                    this.item1.style.height = `${left}%`;
                    this.item2.style.height = `${right}%`;
                }
            }
        }
    }
};
exports.GridUnit.styles = lit.css `
    :host {
      position: relative;
      display: flex;
      flex-direction: var(--flex-direction, row);
      width: 100%;
      height: 100%;
    }

    #item1, #item2 {
      flex-grow: 1;
    }
  `;
_tslib.__decorate([
    decorators_js.property({ type: String }),
    _tslib.__metadata("design:type", String)
], exports.GridUnit.prototype, "key", void 0);
_tslib.__decorate([
    decorators_js.property({ type: String }),
    _tslib.__metadata("design:type", String)
], exports.GridUnit.prototype, "orientation", void 0);
_tslib.__decorate([
    decorators_js.property({ type: String }),
    _tslib.__metadata("design:type", String)
], exports.GridUnit.prototype, "init", void 0);
_tslib.__decorate([
    decorators_js.query('#item1'),
    _tslib.__metadata("design:type", HTMLElement)
], exports.GridUnit.prototype, "item1", void 0);
_tslib.__decorate([
    decorators_js.query('#item2'),
    _tslib.__metadata("design:type", HTMLElement)
], exports.GridUnit.prototype, "item2", void 0);
exports.GridUnit = _tslib.__decorate([
    decorators_js.customElement("grid-unit")
], exports.GridUnit);
