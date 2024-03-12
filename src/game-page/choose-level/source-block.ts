import './source-block.css';
import Div from '../../components/divElement';
import Piece from '../piece/piece';
// import Field from './field';

const gaps = 100;

export default class SourceBlock extends Div {
  piecesMatrix: Piece[][];

  constructor(piecesMatrix: Piece[][], blockWidth: number) {
    super({
      className: 'source-block',
      styles: {
        width: `${blockWidth + gaps}px`,
      },
    });

    this.addListener('empty', this.updatePieces);

    this.piecesMatrix = piecesMatrix;
  }

  random = () => {
    const currentLine = this.piecesMatrix.shift();
    if (!currentLine) throw new Error('No pieces!');
    for (let i = currentLine.length; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentLine[i], currentLine[j]] = [currentLine[j], currentLine[i]];
    }
    return currentLine;
  };

  updatePieces = () => {
    const randomLine = this.random();
    this.appendChildren(randomLine);
  };
}
