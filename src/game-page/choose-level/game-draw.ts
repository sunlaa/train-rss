import UserSelect from './choose-round';
import Pic from '../get-pic-size/pic';

export default class DrawGame {
  audioSrc: string[];

  imgSrc: string;

  sentenses: string[];

  translate: string[];

  // sizes: { fieldWidth: number; fieldHeight: number };

  constructor(level: number, round: number) {
    const roundData = new UserSelect(level, round);

    this.audioSrc = roundData.getAudioSrc();
    this.imgSrc = roundData.getImgSrc();
    this.sentenses = roundData.getSentenses();
    this.translate = roundData.getTranslate();
  }

  async getSizes(scale: number) {
    const picture = new Pic(this.imgSrc);
    const sizes = await picture.getSizes();
    this.imgSrc = picture.src;
    return {
      fieldWidth: sizes.width * scale,
      fieldHeight: sizes.height * scale,
    };
  }
}
