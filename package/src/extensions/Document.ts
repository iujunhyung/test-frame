function findElementsWithSelector(selector: string, root = document) {
  const elements = Array.from(root.querySelectorAll('*'));
  const matchingElements: Array<HTMLElement> = [];

  elements.forEach((element) => {
    if (element.shadowRoot) {
      // @ts-ignore
      const shadowElements = findElementsWithSelector(selector, element.shadowRoot);
      matchingElements.push(...shadowElements);
    }

    if (element.matches(selector)) {
      // @ts-ignore
      matchingElements.push(element);
    }
  });

  return matchingElements;
}

Document.prototype.findElementsWithSelector = findElementsWithSelector;

export {}