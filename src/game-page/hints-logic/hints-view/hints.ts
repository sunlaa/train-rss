import './hints.css';

import Translate from './translate/translate-view';
import Audio from './audio/audio-view';
import { BaseElement } from '../../../components/base-element';

export default class Hint extends BaseElement {
  translateText: string[];

  audioSrc: string[];

  translateBlock: Translate;

  audioHint: Audio;

  count: number;

  constructor(translateText: string[], audioSrc: string[]) {
    super({ tag: 'section', className: 'hint' });

    this.translateBlock = new Translate(translateText[0]);
    this.audioHint = new Audio(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${audioSrc[0]}`
    );

    this.count = 1;

    this.translateText = translateText;
    this.audioSrc = audioSrc;
  }

  updateHintsData() {
    const currentTranslate = this.translateText[this.count];
    const currentSrc = this.audioSrc[this.count];

    this.translateBlock.updateTranslate(currentTranslate);
    this.audioHint.updateSrc(
      `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${currentSrc}`
    );

    this.count += 1;
  }
}
