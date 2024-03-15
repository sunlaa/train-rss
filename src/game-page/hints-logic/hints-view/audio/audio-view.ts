import LocalStorage from '../../../../helpers/localStorage';

export default class Audio {
  element: HTMLAudioElement;

  constructor(audioSrc: string) {
    this.element = document.createElement('audio');
    this.element.src = audioSrc;
    this.element.controls = true;

    if (LocalStorage.get('hints-data')?.audio === 'false') {
      this.setStyles({ opacity: '0' });
    }
  }

  updateSrc(newSrc: string) {
    this.element.src = newSrc;
  }

  play() {
    this.element.play();
  }

  getElement() {
    return this.element;
  }

  setStyles(styles: Partial<CSSStyleDeclaration>) {
    Object.assign(this.element.style, styles);
  }
}
