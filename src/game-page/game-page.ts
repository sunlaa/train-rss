import './game-page.css';
import { BaseElement } from '../components/base-element';
import Select from './select-list/select-menu';

class Game extends BaseElement {
  constructor() {
    super({ tag: 'section', className: 'game-page', content: 'GAME!!!' });

    const select = new Select(this);
    this.append(select);
  }
}

export default Game;
