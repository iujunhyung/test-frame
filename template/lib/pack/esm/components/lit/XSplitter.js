import { __decorate, __metadata, __awaiter } from '../../_virtual/_tslib.js';
import { css, LitElement, html } from 'lit';
import { property, query, customElement } from 'lit/decorators.js';

let XSplitter = class XSplitter extends LitElement {
    constructor() {
        super(...arguments);
        this.orientation = "horizontal";
        this.isDragging = false;
        this.initValue = 0;
    }
    connectedCallback() {
        const _super = Object.create(null, {
            connectedCallback: { get: () => super.connectedCallback }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.connectedCallback.call(this);
            yield this.updateComplete;
            if (this.orientation === 'horizontal') {
                this.style.minWidth = '2px';
                this.style.maxWidth = '2px';
                this.host.style.height = '100%';
                this.host.style.width = '2px';
                this.thumb.style.width = '8px';
                this.thumb.style.height = '20px';
                this.thumb.style.top = "calc(50% - 10px)";
                this.thumb.style.left = "-3px";
                this.thumb.style.cursor = "ew-resize";
            }
            else {
                this.style.minHeight = '2px';
                this.style.maxHeight = '2px';
                this.host.style.width = '100%';
                this.host.style.height = '2px';
                this.thumb.style.height = '8px';
                this.thumb.style.width = '20px';
                this.thumb.style.left = "50%";
                this.thumb.style.top = "-3px";
                this.thumb.style.cursor = "ns-resize";
            }
            this.onMouseDown = this.onMouseDown.bind(this);
            this.onMouseMove = this.onMouseMove.bind(this);
            this.onMouseUp = this.onMouseUp.bind(this);
            this.onKeyDown = this.onKeyDown.bind(this);
            this.thumb.addEventListener('mousedown', this.onMouseDown);
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
            document.addEventListener('keydown', this.onKeyDown);
        });
    }
    onMouseDown(e) {
        this.isDragging = true;
        this.classList.add('dragging');
        this.initValue = this.orientation == 'horizontal'
            ? e.clientX
            : e.clientY;
    }
    onMouseMove(e) {
        if (!this.isDragging)
            return;
        if (this.orientation === 'horizontal') {
            const dx = e.clientX - this.initValue;
            this.host.style.left = `${dx}px`;
        }
        else {
            const dy = e.clientY - this.initValue;
            this.host.style.top = `${dy}px`;
        }
    }
    onMouseUp(e) {
        if (!this.isDragging)
            return;
        this.isDragging = false;
        this.classList.remove('dragging');
        if (this.orientation == 'horizontal') {
            this.host.style.left = '0px';
        }
        else {
            this.host.style.top = '0px';
        }
        const distance = this.orientation === 'horizontal'
            ? e.clientX - this.initValue
            : e.clientY - this.initValue;
        this.dispatchEvent(new CustomEvent('on-dragged', {
            detail: distance
        }));
    }
    onKeyDown(e) {
        if (!this.isDragging)
            return;
        if (e.key == 'Escape') {
            this.isDragging = false;
            this.classList.remove('dragging');
            if (this.orientation == 'horizontal') {
                this.host.style.left = '0px';
            }
            else {
                this.host.style.top = '0px';
            }
        }
    }
    render() {
        return html `
      <div id="host">
        <div id="thumb">
        </div>
      </div>
    `;
    }
};
XSplitter.styles = [
    css `

    :host {
      background: transparent;
      position: relative;
    }

    #host {
      visibility: hidden;
      background: #7a7a7a;

      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;

      z-index: 9999;
    }

    #thumb {
      background: red;
      border-radius: 4px;
      visibility: hidden;
      position: absolute;
    }

    :host(:hover) #thumb {
      visibility: visible;
    }

    :host(.dragging) #thumb,:host(.dragging) #host {
      visibility: visible;
    }
    `
];
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], XSplitter.prototype, "orientation", void 0);
__decorate([
    query('#host'),
    __metadata("design:type", HTMLElement)
], XSplitter.prototype, "host", void 0);
__decorate([
    query('#thumb'),
    __metadata("design:type", HTMLElement)
], XSplitter.prototype, "thumb", void 0);
XSplitter = __decorate([
    customElement('x-splitter')
], XSplitter);

export { XSplitter };
