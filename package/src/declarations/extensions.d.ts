declare global {

  interface Document {
    __Debug__: any;
  
    findElementsWithSelector(selector: string): HTMLElement[];
  }

  interface Location {
    getQueryParameter(key: string): string | null;
  }

  interface HTMLElement {
    isCursorInElement(e: MouseEvent): boolean;
  }
  
  interface Array<T> {
    
    last(): T | undefined;
    /**
    * 배열의 원소 항목을 교체합니다.
    * @param keySelector - 교체할 항목을 찾습니다.
    * @param newItem - 이 요소로 교체합니다.
    */
    replaceBy(keySelector: (item: T) => any, newItem: T): boolean;
    
    /**
     * 배열의 원소 항목을 추가하거나 교체합니다.
     */
    upsert(keySelector: (item: T) => any, item: T): void;
    
    /**
    * 배열의 원소 항목을 제거합니다.
    * @param keySelector - 제거할 항목을 찾습니다.
    */    
    removeBy(keySelector: (item: T) => any): boolean;

    remove(item: T): boolean;

    contains(item: T): boolean;

    sortBy(keyFn: (item: T) => any): T[];

    except(excepts: T[]): T[];

    groupBy<TKey>(keySelector: (item: T) => TKey): Array<{ key: TKey, value: T[] }>;
  }
  
  interface String {
    /**
    * 검색된 문자열 이전 문자열을 가져옵니다. (검색어 기준 왼쪽)
    * @param search - 검색할 문자열입니다.
    * @param last - default false
    */    
    left(search: string, last?: boolean): string;
    /**
    * 검색된 문자열 이후 문자열을 가져옵니다. (검색어 기준 오른쪽)
    * @param search - 검색할 문자열입니다.
    * @param last - default true
    */
    right(search: string, last?: boolean): string;
  }
  
  interface URLSearchParams {
    /**
    * 대소문자를 구분하지 않고 쿼리값을 가져옵니다.
    * @param name - 가져올 쿼리의 이름입니다.
    */
    getCaseIgnore(name: string): string | null;
  }

  interface Object {
    [key: string]: any;
  }
}

export {}