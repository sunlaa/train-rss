type Params<T extends HTMLElement> = Partial<Omit<T, 'tagName'>> & {
  tag: string;
  content?: string;
  className?: string;
};

class BaseElement<T extends HTMLElement> {
  protected element: T;

  constructor(params: Params<T>) {
    const element = document.createElement(params.tag) as T;
    if (params.className) element.classList.add(params.className);
    this.element = element;
  }

  addClass(className: string) {
    this.element.classList.add(className);
  }

  removeClass(className: string) {
    this.element.classList.remove(className);
  }

  getElement() {
    return this.element;
  }

  append(child: BaseElement<T> | HTMLElement) {
    if (child instanceof BaseElement) {
      const elem = child.getElement();
      this.element.append(elem);
    } else {
      this.element.append(child);
    }
  }

  remove() {
    this.element.remove();
  }

  addListener(event: string, callback: (e: Event) => void) {
    this.element.addEventListener(event, callback);
  }

  setAttribute(attribute: string, value: string) {
    this.element.setAttribute(attribute, value);
  }
}

export default BaseElement;
