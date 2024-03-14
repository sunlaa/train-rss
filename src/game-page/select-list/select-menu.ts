import Div from '../../components/divElement';
import SelectBase from './select-base';
import { data } from '../choose-level/choose-round';
import DrawRound from '../choose-level/draw-round';
import { BaseElement } from '../../components/base-element';

const levelCount = data.length;

export default class SelectMenu extends Div {
  levelSelect: SelectBase;

  roundSelect: SelectBase;

  roundView: DrawRound;

  level: number;

  gamePage: BaseElement;

  constructor(gamePage: BaseElement) {
    super({
      className: 'selection-block',
      styles: {
        alignSelf: 'flex-start',
      },
    });

    this.gamePage = gamePage;
    this.level = 1;

    this.levelSelect = new SelectBase(levelCount);
    this.roundSelect = new SelectBase(data[0].roundsCount);

    this.roundView = new DrawRound(1, 1);

    this.levelSelect.addListener('change', this.chooseLevel);
    this.roundSelect.addListener('change', this.chooseRound);

    this.appendChildren(this.levelSelect, this.roundSelect);
    this.gamePage.append(this.roundView);
  }

  chooseLevel = () => {
    this.level = +this.levelSelect.getElement().value;
    const roundCount = data[this.level - 1].roundsCount;

    this.updateRoundList(roundCount);
    this.drawRound(this.level, 1);
  };

  chooseRound = () => {
    const round = +this.roundSelect.getElement().value;
    this.drawRound(this.level, round);
  };

  drawRound(level: number, round: number) {
    this.roundView.remove();
    this.roundView = new DrawRound(level, round);
    this.gamePage.append(this.roundView);
  }

  updateRoundList(roundCount: number) {
    this.roundSelect.updateOption(roundCount);
  }
}
