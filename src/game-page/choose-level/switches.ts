import { BaseElement } from '../../components/base-element';
import Div from '../../components/divElement';

export default class Switches extends BaseElement {
  translate: Div;

  audio: HTMLAudioElement;

  imgSrc: string;

  constructor(translate: Div, audio: HTMLAudioElement, imgSrc: string) {
    super({ tag: 'section', className: 'switches' });
    this.translate = translate;
    this.audio = audio;
    this.imgSrc = imgSrc;
  }
}
