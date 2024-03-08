import { BaseElement } from '../../components/base-element';

class StartButton extends BaseElement<HTMLAnchorElement> {
  constructor() {
    super({
      tag: 'a',
      className: 'startButton',
      content: 'Start',
      href: '#game-page',
    });
  }
}

export default StartButton;
