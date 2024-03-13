import UserSelect from './choose-round';
import Field from './field';
import SourceBlock from './source-block';
import Pic from '../get-pic-size/pic';
import Slicer from './pieces-maker';

export default class DrawRound {
  audioSrc: string[];

  imgSrc: string;

  sentenses: string[];

  translate: string[];

  constructor(level: number, round: number) {
    const roundData = new UserSelect(level, round);

    this.translate = roundData.getTranslate();
    this.audioSrc = roundData.getAudioSrc();
    this.imgSrc = roundData.getImgSrc();
    this.sentenses = roundData.getSentenses();
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

  async draw(scale: number) {
    const sizes = await this.getSizes(scale);

    const slicer = new Slicer(sizes, this.imgSrc, this.sentenses);
    const slicedImg = slicer.cutImage();

    const field = new Field(sizes, ...slicedImg.linesArr);
    const sources = new SourceBlock(
      slicedImg.piecesArr,
      slicedImg.linesArr,
      sizes.fieldWidth
    );

    document.addEventListener('empty', sources.updatePieces);
    sources.addPieces();

    document.body.append(field.getElement());
    document.body.append(sources.getElement());
  }
}
