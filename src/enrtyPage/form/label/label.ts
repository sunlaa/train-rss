import BaseElement from '../../../components/base-element';

class Label {
  label: BaseElement<HTMLLabelElement>;

  constructor(labelText: string) {
    this.label = new BaseElement({ tag: 'label', content: labelText });
  }
}

export default Label;
