import Div from '../../components/divElement';
import { BaseElement } from '../../components/base-element';

const briefContent = {
  begin:
    'In this game, you will be able to improve your English language skills as well as learn about the paintings of famous artists from the past!',
  main: 'The essence of the game is simple: there are scattered puzzle pieces with words, and your task is to collect sentences from the pieces. Collecting piece by piece you uncover parts of the picture, which you will be able to see in full at the end of the round. If you feel stuck, click on the "I do not know" button, this will automatically complete one sentence for you.',
  end: 'Click on the "Start" button and immerse yourself in the world of art!',
};

class Brief extends Div {
  constructor() {
    super(
      { className: 'brief' },
      new BaseElement({
        tag: 'p',
        content: briefContent.begin,
      }),
      new BaseElement({
        tag: 'p',
        content: briefContent.main,
      }),
      new BaseElement({
        tag: 'p',
        content: briefContent.end,
      })
    );
  }
}

export default Brief;
