import './game-page.css';
import { BaseElement } from '../components/base-element';
import Select from './select-list/select-menu';

class Game extends BaseElement {
  constructor() {
    super({ tag: 'section', className: 'game-page' });

    const select = new Select(this);

    this.append(select);
    this.element.addEventListener('next-round', (event) => {
      const customEvent = event as CustomEvent;
      const { level } = customEvent.detail;
      const { round } = customEvent.detail;
      select.drawRound(level, round);
    });
  }
}

export default Game;
