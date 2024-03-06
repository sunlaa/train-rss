import { BaseElement } from '../../../components/base-element';

export default class Input extends BaseElement<HTMLInputElement> {
  constructor(
    inputType: string,
    inputName?: string,
    minChar?: string,
    pattern?: string
  ) {
    super({ tag: 'input' });
    if (inputName) this.setAttribute('name', inputName);
    if (minChar) this.setAttribute('minlength', minChar);
    if (pattern) this.setAttribute('pattern', pattern);

    this.setAttribute('type', inputType);
  }
}
