import './form.css';
import { BaseElement } from '../../components/base-element';
import Div from '../../components/divElement';
import Input from './input/input';
import Label from './label/label';

type InputValue = {
  name: FormDataEntryValue | null;
  surname: FormDataEntryValue | null;
};

class Form extends BaseElement<HTMLFormElement> {
  inputValues: InputValue;

  constructor() {
    const nameInput = new Input('text', 'userName', '3', '^[A-Z][\\-a-zA-z]+$');
    const surnameInput = new Input(
      'text',
      'userSurname',
      '4',
      '^[A-Z][\\-a-zA-z]+$'
    );
    super(
      { tag: 'form', className: 'log-form' },
      new Div(
        { className: 'log-form__userData' },
        new Label({ content: 'Your Name: ' }, nameInput)
      ),
      new Div(
        { className: 'log-form__userData' },
        new Label({ content: 'Your Surname: ' }, surnameInput)
      ),
      new Div({ className: 'log-form__submit' }, new Input('submit'))
    );

    this.inputValues = {
      name: '',
      surname: '',
    };

    this.element.addEventListener('submit', this.saveValueOfInput);
  }

  private saveValueOfInput = (event: Event) => {
    event.preventDefault();

    const dataForm = new FormData(this.getElement());
    this.inputValues.name = dataForm.get('userName');
    this.inputValues.surname = dataForm.get('userSurname');

    window.localStorage.setItem('logData', JSON.stringify(this.inputValues));
  };
}

export default Form;
