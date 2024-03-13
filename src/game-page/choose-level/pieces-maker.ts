import Div from '../../components/divElement';
import './pieces-maker.css';

const bulgeSize = 20;
const fontSize = 10;

export default class Slicer {
  fieldWidth: number;

  fieldHeight: number;

  src: string;

  sentenses: string[];

  constructor(
    {
      fieldWidth,
      fieldHeight,
    }: {
      fieldWidth: number;
      fieldHeight: number;
    },
    src: string,
    sentenses: string[]
  ) {
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.src = src;
    this.sentenses = sentenses;
  }

  cutImage() {
    const lines = [];

    const rows = this.sentenses.length;
    const piecesMatrix: Div[][] = Array.from({ length: rows }, () => []);

    for (let y = 0; y < rows; y += 1) {
      const sentense = this.sentenses[y].split(' ');
      const countPiecesInLine = sentense.length;

      const sentenseCharCount = sentense.reduce((acc, elem) => {
        const words = acc;
        const res = words + elem.length;
        return res;
      }, 0);

      let passedWidth = 0;

      const line = new Div({
        className: 'line',
        styles: { height: `${this.fieldHeight / rows}px` },
      });

      line.addClass(`line-${y}`);

      lines.push(line);

      for (let x = 0; x < countPiecesInLine; x += 1) {
        const contentWidth = sentense[x].length * fontSize;
        const padding =
          (this.fieldWidth - sentenseCharCount * fontSize) / countPiecesInLine;
        const pieceWidth = contentWidth + padding;

        const pieceHeight = this.fieldHeight / rows;

        const wrapper = new Div({
          className: 'wrapper',
          id: `${x}`,
        });

        const backSize = `${this.fieldWidth}px ${this.fieldHeight}px`;

        const piece = new Div({
          className: 'piece',
          content: sentense[x],
          styles: {
            height: `${pieceHeight}px`,
            width: `${pieceWidth}px`,
            backgroundImage: `url('${this.src}')`,
            backgroundSize: backSize,
            backgroundPosition: `-${passedWidth}px ${(this.fieldHeight / rows) * -y}px`,
          },
        });

        piece.setStyles({ width: `${pieceWidth}px` });

        const topValue = this.fieldHeight / rows / 2 - bulgeSize / 2;

        const bulge = new Div({
          className: 'bulge',
          styles: {
            width: `${bulgeSize}px`,
            height: `${bulgeSize}px`,
            top: `${topValue}px`,
            left: `-${bulgeSize / 2}px`,
            backgroundImage: `url('${this.src}')`,
            backgroundSize: backSize,
            backgroundPosition: `-${passedWidth - bulgeSize / 2}px ${(this.fieldHeight / rows) * -y - topValue}px`,
          },
        });

        passedWidth += pieceWidth;

        switch (x) {
          case 0: {
            piece.setStyles({
              mask: `radial-gradient(
              circle at ${pieceWidth}px 50%,
              transparent 0,
              transparent ${bulgeSize / 2}px,
              black ${bulgeSize / 2}px
            )`,
            });
            break;
          }
          case countPiecesInLine - 1: {
            wrapper.append(bulge);
            break;
          }
          default: {
            piece.setStyles({
              mask: `radial-gradient(
              circle at ${pieceWidth}px 50%,
              transparent 0,
              transparent ${bulgeSize / 2}px,
              black ${bulgeSize / 2}px
            )`,
            });
            wrapper.append(bulge);
          }
        }

        line.append(wrapper); // в DOMе вставляем в линии пазлы
        wrapper.append(piece); // в DOMе вставляем состоявляющие в пазлы

        piecesMatrix[y][x] = wrapper;
      }
    }

    return { piecesArr: piecesMatrix, linesArr: lines };
  }
}
