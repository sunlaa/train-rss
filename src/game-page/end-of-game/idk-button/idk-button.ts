import './idk-button.css';
import Div from '../../../components/divElement';
import SourceBlock from '../../choose-level/source-block';

export default class IDKButton extends Div {
  pieces: Div[][];

  lines: Div[];

  currentPieces: Div[];

  currentLine: Div;

  sourceBlock: SourceBlock;

  count: number;

  constructor(pieces: Div[][], lines: Div[], sourceBlock: SourceBlock) {
    super({ className: 'idk-button', content: "I don't know" });

    this.pieces = pieces;
    this.lines = lines;

    this.count = 0;

    this.sourceBlock = sourceBlock;
    this.currentPieces = this.pieces[this.count];
    this.currentLine = this.lines[this.count];

    this.addListener('click', this.fillLine);
  }

  fillLine = () => {
    this.sourceBlock.getElement().innerHTML = '';

    this.currentPieces.sort((a, b) => +a.getElement().id - +b.getElement().id);

    this.currentLine.appendChildren(...this.currentPieces);
    this.sourceBlock.updatePieces();

    this.updateListener();
  };

  updateListener = () => {
    this.count += 1;
    this.currentPieces = this.pieces[this.count];
    this.currentLine = this.lines[this.count];

    this.addListener('click', this.fillLine);
  };
}
