import Div from '../../../components/divElement';
import CheckButton from './check/check-button';
import ContinueButton from './continue/continue-button';

export default class CheckContinue extends Div {
  continueButton: ContinueButton;

  checkButton: CheckButton;

  constructor(checkButton: CheckButton) {
    super({ className: 'check-continue' });

    this.checkButton = checkButton;
    this.continueButton = new ContinueButton(0, 0, 0);

    this.append(this.checkButton);
    this.append(this.continueButton);

    this.addListener('to-continue', (event) => {
      const customEvent = event as CustomEvent;
      const { count } = customEvent.detail;
      const { level } = customEvent.detail;
      const { round } = customEvent.detail;

      this.transformToContinue(count, level, round);
    });

    this.addListener('to-check', this.transformToCheck);
  }

  transformToContinue = (count: number, level: number, round: number) => {
    const idkButton = document.querySelector<HTMLElement>('.idk-button');
    if (idkButton) idkButton.style.pointerEvents = 'none';

    this.checkButton.setStyles({ display: 'none' });

    this.continueButton.remove();
    this.continueButton = new ContinueButton(count, level, round);
    this.append(this.continueButton);

    this.continueButton.setStyles({ display: '' });
  };

  transformToCheck = () => {
    this.continueButton.setStyles({ display: 'none' });
    this.checkButton.setStyles({ display: '' });
    this.checkButton.addClass('disabled');
  };
}
