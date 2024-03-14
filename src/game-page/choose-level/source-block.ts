import './source-block.css';
import Div from '../../components/divElement';
import ListenerHandler from './listener-handler';

const gaps = 100;

export default class SourceBlock extends Div {
  piecesMatrix: Div[][];

  lineArr: Div[];

  counter: number;

  constructor(piecesMatrix: Div[][], lineArr: Div[], blockWidth: number) {
    super({
      className: 'source-block',
      styles: {
        width: `${blockWidth + gaps}px`,
      },
    });

    this.counter = 0;
    this.lineArr = lineArr;
    this.piecesMatrix = piecesMatrix;
  }

  addEvents(pices: Div[], lines: Div) {
    const handlerAdd = new ListenerHandler(pices, lines, this.element);
    handlerAdd.addListeners();
  }

  random = () => {
    const currentPieces = this.piecesMatrix[this.counter];
    for (let i = currentPieces.length; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentPieces[i], currentPieces[j]] = [
        currentPieces[j],
        currentPieces[i],
      ];
    }
    return currentPieces;
  };

  addPieces = () => {
    const randomPieces = this.random();
    const currentLine = this.lineArr[this.counter];

    this.addEvents(randomPieces, currentLine);

    this.element.innerHTML = '';
    this.appendChildren(...randomPieces);
    this.counter += 1;
  };

  updatePieces = () => {
    this.addPieces();
  };
}
