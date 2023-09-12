import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js';

import { ElementMixin } from '@iyu-web/core/ElementBaseMixin';
import { getPropertyMeta } from '@iyu-web/core/PropertyMeta';

import { isObservableObject, runInAction } from 'mobx';

import {
  fastTextField,
  fastTextArea,
  fastNumberField,
  fastCheckbox,
  fastCombobox,
  fastOption,
  provideFASTDesignSystem,
} from "@microsoft/fast-components";

provideFASTDesignSystem().register(
  fastTextField(),
  fastTextArea(),
  fastNumberField(),
  fastCheckbox(),
  fastCombobox(),
  fastOption(),
);

export enum InputTypes {
  text,
  email,
  password,
  tel,
  url,
  checkbox,
  number,
  date,
  time,
  datetime
}

@customElement('u-input')
export class UInput extends ElementMixin(LitElement) {

  static styles = [
    css`
    :host {
      display: block;
    }

    :host(:focus-within) {
      outline: none;
    }

    fast-text-field {
      display: block;
      margin: 2px 0px;
    }

    fast-text-area {
      display: block;
      margin: 2px 0px;
    }

    fast-number-field {
      display: block;
      margin: 2px 0px;      
    }
    
    fast-checkbox {
      margin: 4px 0px 4px 0px;
    }
    `
  ];

  @property({type: InputTypes})
  type: InputTypes | string = InputTypes.text;

  @property()
  value:any = null;
  
  @property({type: String})
  label: string | null = null;

  @property({type: String})
  hint: string | null = null;

  @property({type: Boolean})
  required = false;

  @property({type: Object})
  context: any = null;

  @property({type: String})
  path: string | null = null;

  @property({type: Boolean, attribute: 'skip-update'})
  skipUpdate: boolean = false; // context[path] = value; 값이 변경될 때 업데이트하지 않습니다.

  @property({type: Boolean})
  readonly: boolean = false;

  @property({type: Boolean, attribute: 'auto-focus'})
  autoFocus: boolean = false;

  @property({type: Boolean, attribute: true})
  multiline: boolean = false;

  @property({type: Function})
  updatedAction: ((path: string, value: any, context: any) => void) | null = null;
  
  private lastContext: any = null;
  private lastPath: string | null = null;

  protected override async updated(_changedProperties: any) {
    await this.updateComplete;
    
    if (this.context && this.path) {

      if (this.context == this.lastContext && this.path == this.lastPath) return;
      
      this.lastContext = this.context;
      this.lastPath = this.path;
      
      this.autoWire(this.context, this.path);
    }
  }
  
  autoWire(context: any, path: string) {
    var options = getPropertyMeta(context, path);
    if (options) {
      if (options.label) {
        this.label = options.label;
      }

      if (options.hint) {
        this.hint = options.hint;
      }
      
      if (options.required) {
        this.required = options.required;
      }

      if (options.type) {
        let typeName = (<any>options.type).name;

        if (typeName == "String") {
          this.type = InputTypes.text;
        }

        if (typeName == "Boolean") {
          this.type = InputTypes.checkbox;
        }

        if (typeName == "Number") {
          this.type = InputTypes.number;
        }
      }

      if (options.format) {
        let inputType = InputTypes[<any>options.format];
        
        if (inputType == undefined) {
          throw `not suppreted ${options.format}`
        } else {
          this.type = inputType;
        }
      }
    }
    
    if (this.hint == null) {
      if (this.label) {
        this.hint = this.label;
      } else {
        this.hint = path;
      }
    }
    
    let v = context[path];
    this.value = v == undefined ? '' : v;
  }
  
  render() {

    return html`
      ${this.renderInput()}
      ${this.renderError()}
    `;
  }
  
  renderInput() {
    if (this.type == InputTypes.checkbox || this.type == InputTypes[InputTypes.checkbox]) {
      return this.renderCheckbox();

    } else if (this.type == InputTypes.email || this.type == InputTypes[InputTypes.email]) {
      return this.renderText('email');

    } else if (this.type == InputTypes.number || this.type == InputTypes[InputTypes.number]) {
      return this.renderNumber();

    } else if (this.type == InputTypes.date || this.type == InputTypes[InputTypes.date]) {
      return html`<input type="date">`;

    } else if (this.type == InputTypes.time || this.type == InputTypes[InputTypes.time]) {
      return html`<input type="time">`;      

    } else if (this.type == InputTypes.datetime || this.type == InputTypes[InputTypes.datetime]) {
      return html`<input type="datetime-local">`;
      
    } else {
      let inputType = this.type;
      if (typeof this.type == "number") {
        inputType = InputTypes[this.type];
      }
      if (this.multiline) {
        return this.renderTextArea(`${inputType}`);
      } else {
        return this.renderText(`${inputType}`);
      }
    }
  }

  renderError() {
    return html``;
  }
  
  renderText(type?: string | null) {
    
    return html `
    <fast-text-field @change=${(e: any) => {
        this.value = e.target.value.trim();
        this.onChange(this.value);
        e.cancelBubble = true;
      }}
      type=${type}
      .value=${this.value} 
      placeholder=${this.hint ?? this.label} 
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}>
      ${this.label && this.required ? html`<span style="color:red;">&#42;</span>` : html``}
      ${this.label}
    </fast-text-field>
    `;
  }

  renderTextArea(type?: string | null) {
    
    return html `
    <fast-text-area @change=${(e: any) => {
        this.value = e.target.value.trim();
        this.onChange(this.value);
        e.cancelBubble = true;
      }} 
      type=${type}
      .value=${this.value} 
      placeholder=${this.hint ?? this.label}
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}>
      ${this.label && this.required ? html`<span style="color:red;">&#42;</span>` : html``}
      ${this.label}
    </fast-text-area>
    `;
  }

  renderCheckbox() {
    return html `
    <fast-checkbox @change=${(e: any) => {
        this.value = e.target.currentChecked;
        this.onChange(this.value);
        e.cancelBubble = true;      
      }} 
      ?checked=${this.value}
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}
    >${this.label}</fast-checkbox>`;
  }

  renderNumber() {
    
    return html `
    <fast-number-field @change=${(e: any) => {
        this.value = e.target.value !== null ? Number(e.target.value) : null;
        this.onChange(this.value);
        e.cancelBubble = true;
      }}
      .value=${this.value} 
      placeholder=${this.hint ?? this.label} 
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}>
      ${this.label && this.required ? html`<span style="color:red;">&#42;</span>` : html``}
      ${this.label}
    </fast-number-field>
    `;
  }

  onChange(value: any) {
    if (this.type == InputTypes.number || this.type == InputTypes[InputTypes.number]) {
      if (value == '') {
        value = null;
      }
    }
    
    const event = new CustomEvent('change', { detail: {value: value} }); //, bubbles: true, composed: true, cancelable: true
    this.dispatchEvent(event);

    if (this.skipUpdate != true && this.context && this.path) {
      if (isObservableObject(this.context)) {
        runInAction(() => {
          this.context[this.path!] = value;
        });
      } else {
        this.context[this.path] = value;
      }
    }

    if (this.updatedAction && this.path) {
      this.updatedAction(this.path, value, this.context);
    }
  }
}