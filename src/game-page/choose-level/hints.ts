import { BaseElement } from '../../components/base-element';
import Div from '../../components/divElement';

export default class Hint extends BaseElement {
  translate: Div;

  audio: HTMLAudioElement;

  translateText: string[];

  audioSrc: string[];

  constructor(translateText: string[], audioSrc: string[]) {
    super({ tag: 'section', className: 'hint' });

    this.translate = new Div({ className: 'translate' });
    this.audio = document.createElement('audio');

    this.translateText = translateText;
    this.audioSrc = audioSrc;
  }

  addData() {
    const currentTranslate = this.translateText.shift();
    const currentSrc = this.audioSrc.shift();

    if (currentTranslate && currentSrc) {
      this.translate.setContent(currentTranslate);
      this.audio.src = `src/sources/data/${currentSrc}`;
    }
  }
}
