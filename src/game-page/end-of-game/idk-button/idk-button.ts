import './idk-button.css';
import Div from '../../../components/divElement';
import SourceBlock from '../../choose-level/source-block';

export default class IDKButton extends Div {
  pieces: Div[][];

  lines: Div[];

  sourceBlock: SourceBlock;

  count: number;

  constructor(pieces: Div[][], lines: Div[], sourceBlock: SourceBlock) {
    super({ className: 'idk-button', content: "I don't know" });

    this.sourceBlock = sourceBlock;

    this.pieces = pieces;
    this.lines = lines;

    this.count = 0;

    this.addListener('click', this.fillLine);
  }

  fillLine() {
    // this.sourceBlock.innerHTML = '';

    // this.sourceBlock.dispatchEvent(new Event('empty', { bubbles: true }));
    const currentLine = this.lines[this.count];
    const currentPieces = this.pieces[this.count];

    currentLine.getElement().innerHTML = '';
    currentLine.appendChildren(...currentPieces);
  }
}
