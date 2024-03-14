import './form.css';
import { BaseElement } from '../../components/base-element';
import Div from '../../components/divElement';
import Input from './input/input';
import Label from './label/label';
import Router from '../../helpers/router';
import LocalStorage from '../../helpers/localStorage';

export type InputValue = {
  name: string;
  surname: string;
};

class Form extends BaseElement<HTMLFormElement> {
  inputValues: InputValue;

  router: Router;

  constructor(router: Router) {
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

    this.router = router;

    this.inputValues = {
      name: '',
      surname: '',
    };

    const handler = this.submitHandler.bind(this);
    this.element.addEventListener('submit', handler);
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    this.getInputValue();
    this.saveInputValue();
    if (this.inputValues.name !== '' && this.inputValues.surname !== '') {
      this.moveToStartPage();
    }
  }

  private getInputValue() {
    const dataForm = new FormData(this.getElement());
    this.inputValues.name = `${dataForm.get('user-name')}`;
    this.inputValues.surname = `${dataForm.get('userSurname')}`;
  }

  private saveInputValue() {
    LocalStorage.save('logData', this.inputValues);
  }

  private moveToStartPage() {
    this.router.navigate('start-page');
  }
}

export default Form;
