import './draw-round.css';

import UserSelect from './choose-round';
import Field from './field';
import SourceBlock from './source-block';
import Pic from '../get-pic-size/pic';
import Slicer from './pieces-maker';
import Hint from '../hints-logic/hints-view/hints';
import Switches from '../hints-logic/switches/switches';
import { BaseElement } from '../../components/base-element';
import IDKButton from '../end-of-game/idk-button/idk-button';
import CheckButton from '../end-of-game/check-continue/check/check-button';
import Statistics from '../end-of-game/statistic-button/statistic-modal/statistic-modal';
import CheckContinue from '../end-of-game/check-continue/check-continue';

export default class DrawRound extends BaseElement {
  audioSrc: string[];

  imgSrc: string;

  sentenses: string[];

  translate: string[];

  level: number;

  round: number;

  constructor(level: number, round: number) {
    super({ tag: 'section', className: 'user-interact-field' });

    const roundData = new UserSelect(level, round);

    this.translate = roundData.getTranslate();
    this.audioSrc = roundData.getAudioSrc();
    this.imgSrc = roundData.getImgSrc();
    this.sentenses = roundData.getSentenses();

    this.level = level;
    this.round = round;

    this.draw(0.6);
  }

  private async getSizes(scale: number) {
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

    const hints = new Hint(this.translate, this.audioSrc);

    const switches = new Switches(
      hints.translateBlock,
      hints.audioHint,
      this.imgSrc
    );

    const field = new Field(sizes, ...slicedImg.linesArr);
    const sources = new SourceBlock(
      slicedImg.piecesArr,
      slicedImg.linesArr,
      sizes.fieldWidth
    );

    const checkButton = new CheckButton(
      slicedImg.linesArr,
      this.level,
      this.round
    );

    const checkContinue = new CheckContinue(checkButton);

    const idkButton = new IDKButton(
      slicedImg.piecesArr,
      slicedImg.linesArr,
      sources,
      checkButton
    );

    const statistics = new Statistics();

    this.addListener('empty', () => {
      hints.updateHintsData();
      sources.updatePieces();
      idkButton.updateListener();
      checkButton.updateCounter();
      checkContinue.transformToCheck();
    });

    this.appendChildren(
      switches,
      hints,
      field,
      sources,
      idkButton,
      checkContinue,
      statistics
    );
  }
}
