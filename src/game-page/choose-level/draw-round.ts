import UserSelect from './choose-round';
import Pic from '../get-pic-size/pic';
import Field from './field';
import Slicer from './pieces-maker';
import SourceBlock from './source-block';

export default class DrawRound {
  audioSrc: string[];

  imgSrc: string;

  sentenses: string[];

  translate: string[];

  constructor(level: number, round: number) {
    const roundData = new UserSelect(level, round);

    this.audioSrc = roundData.getAudioSrc();
    this.imgSrc = roundData.getImgSrc();
    this.sentenses = roundData.getSentenses();
    this.translate = roundData.getTranslate();
  }

  draw(scale: number) {
    const picData = new Pic(this.imgSrc);
    const realSrc = picData.src;
    picData.getSizes().then((size) => {
      const width = size.width * scale;
      const height = size.height * scale;
      const slicer = new Slicer(
        {
          fieldWidth: width,
          fieldHeight: height,
        },
        realSrc,
        this.sentenses
      );
      const slicedImg = slicer.cutImage();

      const field = new Field(
        {
          fieldWidth: width,
          fieldHeight: height,
        },
        ...slicedImg.linesArr
      );

      const sources = new SourceBlock(slicedImg.piecesArr);
      sources.addNewPieces(1);

      document.body.append(field.getElement());
      document.body.append(sources.getElement());
    });
  }
}
