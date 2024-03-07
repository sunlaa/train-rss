import { BaseElement } from '../../components/base-element';
import LocalStorage from '../../helpers/localStorage';
import nonNullable from '../../utilits/nonNullable';

class Greet extends BaseElement {
  name: string;

  surname: string;

  constructor() {
    super({ tag: 'h1', className: 'greeting' });
    this.name = '';
    this.surname = '';
    this.setUserData();
    this.setContent(`Hello there, ${this.name} ${this.surname}!!!`);
  }

  setUserData() {
    const dataObj = LocalStorage.get('logData');
    if (nonNullable(dataObj)) {
      this.name = dataObj.name;
      this.surname = dataObj.surname;
    }
  }
}

export default Greet;
