import { LitElement } from "lit";

export namespace LitHelper {

  /// 상위노드를 검색하면서 해당속성명을 찾아서 가져옵니다.
  export function findContext(propertyName: string, element?: any) {
    // @ts-ignore
    let node: any = element ?? this;
    while (node) {
      if (node[propertyName]) {
        return node[propertyName];
      }
  
      let shadowNode = node;
      while(shadowNode && shadowNode.shadowRoot) {
        shadowNode = shadowNode.shadowRoot;
        if(shadowNode[propertyName]) {
          return shadowNode[propertyName];
        }
      }
      node = node.parentNode || node.host;
    }
  };

  export function aware(element: LitElement) {

    // element 에 findContext 함수를 추가
    let el = element as any;
    if (el.__proto__.findContext != true) {
      el.__proto__.findContext = findContext;
    }
  }
}

(LitElement.prototype as any).findContext = LitHelper.findContext;