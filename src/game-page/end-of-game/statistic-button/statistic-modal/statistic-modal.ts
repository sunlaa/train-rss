import Div from '../../../../components/divElement';

export default class Statistics extends Div {
  constructor() {
    super({ className: 'statistics-modal' });

    this.element.addEventListener('add-correct', (event) => {
      const customEvent = event as CustomEvent;
      const { sentense } = customEvent.detail;
      this.addSentenceCorrect(sentense);
    });
  }

  addSentenceCorrect = (sentense: string) => {
    const parag = new Div({ content: sentense });
    this.append(parag);
  };
}
