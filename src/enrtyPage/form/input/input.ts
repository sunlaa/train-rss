import BaseElement from '../../../components/base-element';

export default class Input {
  input: BaseElement<HTMLInputElement>;

  constructor(inputType: string, inputName: string) {
    this.input = new BaseElement({ tag: 'input' });
    this.input.setAttribute('type', inputType);
    this.input.setAttribute('name', inputName);
  }
}
