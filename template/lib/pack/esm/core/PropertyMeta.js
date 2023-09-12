import 'reflect-metadata';

const propertyKeyName = "propertyMeta";
const propertyMetaKey = Symbol(propertyKeyName);
const objectName = "Object";
const __propertyMeta = {};
// @ts-ignore
document.__propertyMeta__ = __propertyMeta;
function propertyMeta(metadata) {
    return (target, propertyKey) => {
        // 1. Reflect 에 메타데이터를 등록합니다.
        Reflect.defineMetadata(propertyMetaKey, metadata, target, propertyKey);
        // 2. Reflect 에 문제가 있을 경우를 대비해서 __propertyMeta 에도 등록합니다.
        const key = target.constructor.name;
        if (__propertyMeta[key] === undefined) {
            __propertyMeta[key] = {};
        }
        __propertyMeta[key][propertyKey] = metadata;
    };
}
function getPropertyMeta(target, propertyKey) {
    // 1. Reflect 에서 메타데이터를 가져옵니다.
    const metadata = Reflect.getMetadata(propertyMetaKey, target, propertyKey);
    // 2. Reflect 에서 메타데이터를 못가져왔을 경우 __propertyMeta 에서 가져옵니다.
    if (metadata === undefined) {
        const key = target.constructor.name;
        if (__propertyMeta[key] === undefined) {
            if (target.constructor.name === objectName) {
                return undefined;
            }
            else {
                return getPropertyMeta(__propertyMeta, propertyKey);
            }
        }
        else {
            return __propertyMeta[key][propertyKey];
        }
    }
    return metadata;
}

export { getPropertyMeta, propertyMeta };
