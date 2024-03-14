import Div from '../../../../components/divElement';
import LocalStorage from '../../../../helpers/localStorage';
import Translate from '../../hints-view/translate/translate-view';

export default class TranslateSwitch extends Div {
  translateBlock: Translate;

  constructor(translateBlock: Translate) {
    super({ className: 'switch', content: 'translate' });

    this.translateBlock = translateBlock;
    this.addListener('click', this.translateToogle);

    if (LocalStorage.get('hints-data')?.translate === 'false') {
      this.classList().add('disabled');
    }
  }

  updateLocalStorage() {
    const switchData = LocalStorage.get('hints-data');

    if (!switchData) throw new Error('No data about hints!');

    if (this.classList().contains('disabled')) {
      switchData.translate = 'false';
    } else {
      switchData.translate = 'true';
    }
    LocalStorage.save('hints-data', switchData);
  }

  translateToogle = () => {
    if (this.classList().contains('disabled')) {
      this.translateBlock.setStyles({ opacity: '1' });
      this.classList().remove('disabled');
    } else {
      this.translateBlock.setStyles({ opacity: '0' });
      this.classList().add('disabled');
    }
    this.updateLocalStorage();
  };
}
