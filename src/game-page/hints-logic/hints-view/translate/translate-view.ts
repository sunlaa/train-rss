import Div from '../../../../components/divElement';
import LocalStorage from '../../../../helpers/localStorage';

export default class Translate extends Div {
  translate: string;

  constructor(translate: string) {
    super({ className: 'translate-block', content: translate });

    this.translate = translate;
    if (LocalStorage.get('hints-data')?.translate === 'false') {
      this.setStyles({ opacity: '0' });
    }
  }

  updateTranslate(newTranslate: string) {
    this.setContent(newTranslate);
  }
}
