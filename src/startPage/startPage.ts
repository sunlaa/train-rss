import './startPage.css';
import { BaseElement } from '../components/base-element';
import Title from '../enrtyPage/title/title';
import Greet from './greet/greet';
import StartButton from './startBtn/startButton';
import Brief from './brief/brief';

class StartPage extends BaseElement {
  constructor() {
    super(
      { tag: 'section', className: 'start-page' },
      new Title(),
      new Greet(),
      new Brief(),
      new StartButton()
    );
  }
}

export default StartPage;
