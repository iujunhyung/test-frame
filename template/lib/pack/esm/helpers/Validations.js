import { getPropertyMeta } from '../core/PropertyMeta.js';

var Validations;
(function (Validations) {
    function validateEmail(value) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    }
    Validations.validateEmail = validateEmail;
    function validateTel(value) {
        const regex = /^(?:|\+\d+\s*)(?:|\d{2,3}(?:|\-))\d{3,4}(?:|\-)\d{4}$/;
        return regex.test(value);
    }
    Validations.validateTel = validateTel;
    function validatePath(obj, path) {
        var _a;
        let errors = [];
        const meta = getPropertyMeta(obj, path);
        if (meta == null)
            return errors;
        const key = `[${(_a = meta.label) !== null && _a !== void 0 ? _a : path}]`;
        const value = obj[path];
        // null 체크
        if (meta.required && (value == null || value.length < 1)) {
            errors.push(`Required ${key} Field`);
            return errors;
        }
        if (value == null || value.length < 1)
            return errors;
        // length 체크
        if (meta.minLength && meta.minLength > value.length) {
            errors.push(`At least ${meta.minLength} characters are required for ${key}`);
        }
        if (meta.maxLength && meta.maxLength < value.length) {
            errors.push(`Up to ${meta.maxLength} characters are allowed for ${key}`);
        }
        // format 체크
        if (meta.format) {
            if (meta.format == "email" && validateEmail(value) != true) {
                errors.push(`${key} is not an email format`);
            }
            else if (meta.format == "tel" && validateTel(value) != true) {
                errors.push(`${key} is not a phone number format`);
            } // else if 포멧에 의한 Validation 추가
        }
        // regex 체크
        if (meta.regex) {
            let r = meta.regex.test(value);
            if (r == false) {
                errors.push(`${key} is not a valid format.`);
            }
        }
        return errors;
    }
    Validations.validatePath = validatePath;
    function validate(obj, ...paths) {
        let errors = [];
        paths.forEach(path => {
            validatePath(obj, path).forEach(e => {
                errors.push(e);
            });
        });
        return errors;
    }
    Validations.validate = validate;
    function validateObj(obj) {
        let errors = [];
        Object.keys(obj).forEach((key) => {
            validatePath(obj, key).forEach(e => {
                errors.push(e);
            });
        });
        return errors;
    }
    Validations.validateObj = validateObj;
})(Validations || (Validations = {}));

export { Validations };
