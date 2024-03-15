import './idk-button.css';
import Div from '../../../components/divElement';

export default class IDKButton extends Div {
  pieces: Div[][];

  lines: Div[];

  count: number;

  constructor(pieces: Div[][], lines: Div[]) {
    super({ className: 'idk-button', content: "I don't know" });

    this.pieces = pieces;
    this.lines = lines;

    this.count = 0;
  }
}
