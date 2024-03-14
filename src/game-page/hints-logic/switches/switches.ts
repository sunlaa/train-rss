import './switches.css';
import { BaseElement } from '../../../components/base-element';
import Div from '../../../components/divElement';
import Translate from '../hints-view/translate/translate-view';
import Audio from '../hints-view/audio/audio-view';

export default class Switches extends BaseElement {
  translateBlock: Translate;

  audioHint: Audio;

  imgSrc: string;

  translateSwitch: Div;

  audioSwitch: Div;

  imageSwitch: Div;

  constructor(translateBlock: Translate, audioHint: Audio, imgSrc: string) {
    super({ tag: 'section', className: 'switches' });

    this.translateBlock = translateBlock;
    this.audioHint = audioHint;
    this.imgSrc = imgSrc;

    this.translateSwitch = new Div({ className: 'switch' });
    this.audioSwitch = new Div({ className: 'switch' });
    this.imageSwitch = new Div({ className: 'switch' });
  }
}
