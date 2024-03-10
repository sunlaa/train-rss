import './source-block.css';
import Div from '../../components/divElement';

export default class SourceBlock extends Div {
  piecesMatrix: HTMLElement[][];

  constructor(piecesMatrix: HTMLElement[][]) {
    super({ className: 'source-block' });

    this.piecesMatrix = piecesMatrix;
  }

  addNewPieces(lineNum: number) {
    const currentLine = this.piecesMatrix[lineNum - 1];
    for (let i = currentLine.length; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentLine[i], currentLine[j]] = [currentLine[j], currentLine[i]];
    }

    this.appendChildren(currentLine);
  }
}
