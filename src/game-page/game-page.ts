import './game-page.css';
import { BaseElement } from '../components/base-element';
import DrawRound from './choose-level/draw-round';

class Game extends BaseElement {
  constructor() {
    super({ tag: 'section', className: 'game-page', content: 'GAME!!!' });
    const round = new DrawRound(1, 27);

    round.draw(0.7, this);
  }
}

export default Game;
