import Div from '../../../../components/divElement';
import LocalStorage from '../../../../helpers/localStorage';
import Audio from '../../hints-view/audio/audio-view';

export default class AudioSwitch extends Div {
  audioHint: Audio;

  constructor(audioHint: Audio) {
    super({ className: 'switch', content: 'audio' });
    this.audioHint = audioHint;

    this.addListener('click', this.audioToogle);

    if (LocalStorage.get('hints-data')?.audio === 'false') {
      this.classList().add('disabled');
    }
  }

  updateLocalStorage() {
    const switchData = LocalStorage.get('hints-data');

    if (!switchData) throw new Error('No data about hints!');

    if (this.classList().contains('disabled')) {
      switchData.audio = 'false';
    } else {
      switchData.audio = 'true';
    }
    LocalStorage.save('hints-data', switchData);
  }

  audioToogle = () => {
    if (this.classList().contains('disabled')) {
      this.audioHint.setStyles({ opacity: '1' });
      this.classList().remove('disabled');
    } else {
      this.audioHint.setStyles({ opacity: '0' });
      this.classList().add('disabled');
    }
    this.updateLocalStorage();
  };
}
