import './check-button.css';
import Div from '../../../../components/divElement';
import LocalStorage from '../../../../helpers/localStorage';

export default class CheckButton extends Div {
  lines: Div[];

  currentLine: Div;

  count: number;

  level: number;

  round: number;

  constructor(lines: Div[], level: number, round: number) {
    super({ className: 'check-button', content: 'Check' });

    this.level = level;
    this.round = round;

    this.lines = lines;
    this.count = 0;

    this.currentLine = this.lines[this.count];

    this.addClass('disabled');

    this.addListener('click', this.showCheck);

    this.addListener('check', () => {
      this.transformToContinue();
    });
  }

  transformToContinue = () => {
    const isAllCorrect = !this.check().includes(false);

    if (isAllCorrect) {
      this.currentLine.setStyles({ pointerEvents: 'none' });

      this.element.dispatchEvent(
        new CustomEvent('to-continue', {
          bubbles: true,
          detail: { count: this.count, level: this.level, round: this.round },
        })
      );

      this.addToStatistics();
    }
  };

  addToStatistics() {
    const sentenseArr = this.getRightLine().map((elem) => elem.textContent);
    const sentenseStr = sentenseArr.join(' ');

    const statistic = document.querySelector<HTMLElement>('.statistics-modal');

    if (statistic) {
      statistic.dispatchEvent(
        new CustomEvent('add-correct', {
          bubbles: true,
          detail: {
            sentense: sentenseStr,
          },
        })
      );
    }
  }

  check(): boolean[] {
    const userLine = this.getUserLine();
    const rightLine = this.getRightLine();

    const isCorrectArr = userLine.map((_, i) => {
      const isImageHint = LocalStorage.get('hints-data')?.image === 'true';
      return isImageHint
        ? userLine[i].id === rightLine[i].id
        : userLine[i].textContent === rightLine[i].textContent;
    });

    return isCorrectArr;
  }

  showCheck = () => {
    const userLine = this.getUserLine();
    const places = this.check();

    userLine.forEach((elem, i) => {
      const wrapper = elem as HTMLElement;
      const piece = wrapper.querySelector<HTMLElement>('.piece');

      if (!piece) throw new Error('No pices!');

      piece.style.textShadow = places[i]
        ? '1px 1px 10px #00ff00'
        : '1px 1px 10px red';

      setTimeout(() => {
        piece.style.textShadow = '1px 1px 10px black';
      }, 3000);
    });
  };

  private getRightLine = (): Element[] => {
    return this.currentLine.getChildren().sort((a, b) => +a.id - +b.id);
  };

  private getUserLine = (): Element[] => {
    return this.currentLine.getChildren();
  };

  public updateCounter() {
    this.count += 1;

    this.currentLine = this.lines[this.count];
  }
}
