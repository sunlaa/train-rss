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
    this.audio.controls = true;

    this.translateText = translateText;
    this.audioSrc = audioSrc;

    this.updateData();
    this.appendChildren(this.translate, this.audio);
  }

  updateData() {
    const currentTranslate = this.translateText.shift();
    const currentSrc = this.audioSrc.shift();

    if (currentTranslate && currentSrc) {
      this.translate.setContent(currentTranslate);
      this.audio.src = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${currentSrc}`;
    }
  }
}
