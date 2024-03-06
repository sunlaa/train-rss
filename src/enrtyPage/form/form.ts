import './form.css';
import { BaseElement } from '../../components/base-element';
import Div from '../../components/divElement';
// import Input from './input/input';
// import Label from './label/label';

// type InputValue = {
//   name: string;
//   surname: string;
// };

// class Form extends BaseElement<HTMLFormElement> {
//   inputValues: InputValue;

//   constructor() {
//     const nameInput = new Input('text', 'userName', '3', '^[A-Z][\\-a-zA-z]+$');
//     const surnameInput = new Input(
//       'text',
//       'userSurname',
//       '4',
//       '^[A-Z][\\-a-zA-z]+$'
//     );
//     super(
//       { tag: 'form', className: 'log-form' },
//       new Div(
//         { className: 'log-form__userData' },
//         new Label({ content: 'Your Name: ' }, nameInput)
//       ),
//       new Div(
//         { className: 'log-form__userData' },
//         new Label({ content: 'Your Surname: ' }, surnameInput)
//       ),
//       new Div({ className: 'log-form__submit' }, new Input('submit'))
//     );

//     this.inputValues = {
//       name: '',
//       surname: '',
//     };

//     this.element.addEventListener('keyup', this.updateValueOfInput);
//   }

//   private updateValueOfInput(event: Event) {
//     const field = event.target;
//     if (field instanceof HTMLInputElement) {

//     }
//   }
// }

class Form extends BaseElement {
  constructor() {
    super(
      { tag: 'form', className: 'log-form' },
      new Div(
        { className: 'log-form__userData' },
        new BaseElement(
          { tag: 'label', content: 'Your name: ' },
          new BaseElement<HTMLInputElement>({
            tag: 'input',
            type: 'text',
            name: 'userName',
            minLength: 3,
            pattern: '^[A-Z][\\-a-zA-z]+$',
          })
        )
      ),
      new Div(
        { className: 'log-form__userData' },
        new BaseElement(
          { tag: 'label', content: 'Your name: ' },
          new BaseElement<HTMLInputElement>({
            tag: 'input',
            type: 'text',
            name: 'userSurname',
            minLength: 4,
            pattern: '^[A-Z][\\-a-zA-z]+$',
          })
        )
      ),
      new Div(
        { className: 'log-form__submit' },
        new BaseElement<HTMLInputElement>({ tag: 'input', type: 'submit' })
      )
    );
  }
}

export default Form;
