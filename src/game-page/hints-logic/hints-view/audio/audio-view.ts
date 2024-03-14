export default class Audio extends HTMLAudioElement {
  constructor(audioSrc: string) {
    super();
    this.src = audioSrc;
    this.controls = true;
  }

  updateSrc(newSrc: string) {
    this.src = newSrc;
  }
}
