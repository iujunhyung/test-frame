import { getPropertyMeta } from "@src/core/decorators/PropertyMeta";

export namespace Validations {
  export function validateEmail(value: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  export function validateTel(value: string): boolean {
    const regex = /^(?:|\+\d+\s*)(?:|\d{2,3}(?:|\-))\d{3,4}(?:|\-)\d{4}$/;
    return regex.test(value);
  }
  
  export function validatePath(obj: any, path: string) : string[] {

    let errors: string[] = [];

    const meta = getPropertyMeta(obj, path);
    if (meta == null) return errors;

    const key = `[${meta.label ?? path}]`;
    const value = obj[path];

    // null 체크
    if (meta.required && (value == null || value.length < 1)) {
      errors.push(`Required ${key} Field`);
      return errors;
    }

    if (value == null || value.length < 1) return errors;
    
    // length 체크
    if (meta.minLength && meta.minLength > value.length) {
      errors.push(`At least ${meta.minLength} characters are required for ${key}`)
    }
    if (meta.maxLength && meta.maxLength < value.length) {
      errors.push(`Up to ${meta.maxLength} characters are allowed for ${key}`)
    }

    // format 체크
    if (meta.format) {
      if (meta.format == "email" && validateEmail(value) != true) {
        errors.push(`${key} is not an email format`)

      } else if (meta.format == "tel" && validateTel(value) != true) {
        errors.push(`${key} is not a phone number format`)
      } // else if 포멧에 의한 Validation 추가
    }
    
    // regex 체크
    if (meta.regex) {
      let r = meta.regex.test(value);
      if (r == false) {
        errors.push(`${key} is not a valid format.`)
      }
    }
    
    return errors;
  }

  export function validate(obj: any, ...paths: string[]) : string[] {
    let errors: string[] = [];

    paths.forEach(path => {
      validatePath(obj, path).forEach(e => {
        errors.push(e);
      });
    });

    return errors;
  }

  export function validateObj(obj: any) : string[] {
    let errors: string[] = [];

    Object.keys(obj).forEach((key) => {
      validatePath(obj, key).forEach(e => {
        errors.push(e);
      });
    });
    
    return errors;
  }
}