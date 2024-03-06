import './form.css';
import { BaseElement } from '../../components/base-element';
import Div from '../../components/divElement';
import Input from './input/input';
import Label from './label/label';

class Form extends BaseElement<HTMLFormElement> {
  constructor() {
    super(
      { tag: 'form', className: 'log-form' },
      new Div(
        { className: 'log-form__userData' },
        new Label(
          { content: 'Your Name: ' },
          new Input('text', 'userName', '3', '^[A-Z][\\-a-zA-z]+$')
        )
      ),
      new Div(
        { className: 'log-form__userData' },
        new Label(
          { content: 'Your Surname: ' },
          new Input('text', 'userSurname', '4', '^[A-Z][\\-a-zA-z]+$')
        )
      ),
      new Div({ className: 'log-form__submit' }, new Input('submit'))
    );
  }
}

export default Form;
