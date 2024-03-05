import BaseElement from '../../components/base-element';

class Form {
  form: BaseElement<HTMLFormElement>;

  constructor(formId: string) {
    this.form = new BaseElement({ tag: 'form', id: formId });
  }
}

export default Form;
