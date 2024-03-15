import Div from '../../components/divElement';
import SelectBase from './select-base';
import { data } from '../choose-level/choose-round';
import DrawRound from '../choose-level/draw-round';
import { BaseElement } from '../../components/base-element';
import LocalStorage from '../../helpers/localStorage';

const levelCount = data.length;

export default class SelectMenu extends Div {
  levelSelect: HTMLSelectElement;

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

    this.levelSelect = new SelectBase(levelCount).getElement();
    this.roundSelect = new SelectBase(data[0].roundsCount);

    const userLevel = LocalStorage.get('level-data');

    if (userLevel) {
      this.roundView = new DrawRound(+userLevel.level, +userLevel.round);

      this.levelSelect.value = userLevel.level;
      this.roundSelect.getElement().value = userLevel.round;
    } else {
      this.roundView = new DrawRound(1, 1);
    }

    this.levelSelect.addEventListener('change', this.chooseLevel);
    this.roundSelect.addListener('change', this.chooseRound);

    this.appendChildren(this.levelSelect, this.roundSelect);

    this.gamePage.append(this.roundView);
  }

  chooseLevel = () => {
    this.level = +this.levelSelect.value;
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

    if (round > data[level - 1].roundsCount && level === 6) {
      this.roundView = new DrawRound(1, 1);

      this.levelSelect.value = '1';
      this.roundSelect.getElement().value = '1';
    } else if (round > data[level - 1].roundsCount) {
      this.roundView = new DrawRound(level + 1, 1);
      this.levelSelect.value = `${level + 1}`;
      this.roundSelect.getElement().value = '1';
    } else {
      this.roundView = new DrawRound(level, round);
      this.levelSelect.value = `${level}`;
      this.roundSelect.getElement().value = `${round}`;
    }
    this.gamePage.append(this.roundView);
  }

  updateRoundList(roundCount: number) {
    this.roundSelect.updateOption(roundCount);
  }
}
