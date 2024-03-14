import Div from '../../../../components/divElement';

export default class Translate extends Div {
  translate: string;

  constructor(translate: string) {
    super({ className: 'translate-block', content: translate });

    this.translate = translate;
  }

  updateTranslate(newTranslate: string) {
    this.setContent(newTranslate);
  }
}
