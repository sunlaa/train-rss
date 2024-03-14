import './switches.css';
import { BaseElement } from '../../../components/base-element';
import Div from '../../../components/divElement';
import Translate from '../hints-view/translate/translate-view';
import Audio from '../hints-view/audio/audio-view';
import TranslateSwitch from './translate-switch/translate-switch';
import LocalStorage from '../../../helpers/localStorage';
import AudioSwitch from './audio-switch/audio-switch';

export default class Switches extends BaseElement {
  imgSrc: string;

  imageSwitch: Div;

  constructor(translateBlock: Translate, audioHint: Audio, imgSrc: string) {
    super(
      { tag: 'section', className: 'switches' },
      new TranslateSwitch(translateBlock),
      new AudioSwitch(audioHint)
    );

    if (!LocalStorage.get('hints-data')) {
      LocalStorage.save('hints-data', {
        translate: 'true',
        audio: 'true',
        image: 'true',
      });
    }

    this.imgSrc = imgSrc;

    this.imageSwitch = new Div({ className: 'switch', content: 'image' });

    this.appendChildren(this.imageSwitch);
  }
}
