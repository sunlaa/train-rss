import Div from '../../components/divElement';
import { ParamsOmitTag } from '../../components/base-element';

export default class Piece extends Div {
  shiftX: number;

  shiftY: number;

  lineNum: number;

  constructor(params: ParamsOmitTag, lineNum: number) {
    super(params);

    this.lineNum = lineNum;

    this.element.draggable = true;

    this.shiftX = 0;
    this.shiftY = 0;

    // this.element.onmousedown = this.mousedown;
    this.element.onclick = this.click;
  }

  // private mousedown = (event: MouseEvent) => {
  //   this.shiftX = event.clientX - this.element.getBoundingClientRect().left;
  //   this.shiftY = event.clientY - this.element.getBoundingClientRect().top;

  //   document.addEventListener('mousemove', this.mousemove);
  //   this.element.onmouseup = this.mouseup;
  // };

  // private mousemove = (event: MouseEvent) => {
  //   // document.body.append(this.element);

  //   this.element.style.position = 'absolute';
  //   this.element.style.zIndex = '1000';
  //   this.element.style.left = `${event.pageX - this.shiftX}px`;
  //   this.element.style.top = `${event.pageY - this.shiftY}px`;
  // };

  // private mouseup = (event: MouseEvent) => {
  //   this.element.hidden = true;
  //   const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  //   this.element.hidden = false;
  //   console.log(elemBelow);

  //   if (elemBelow?.classList.contains(`line-${this.lineNum}`)) {
  //     elemBelow.append(this.element);
  //     this.element.style.position = 'static';
  //   } else {
  //     const source = document.querySelector<HTMLElement>('.source-block');
  //     if (!nonNullable(source)) throw new Error('No');
  //     source.append(this.element);
  //     this.element.style.position = 'static';
  //   }

  //   document.removeEventListener('mousemove', this.mousemove);
  //   this.element.onmouseup = null;
  // };

  private click = () => {
    const parent = this.element.parentNode;

    if (parent && parent instanceof HTMLElement) {
      const line = document.querySelector<HTMLElement>(`.line-${this.lineNum}`);
      const sources = document.querySelector<HTMLElement>('.source-block');

      if (!line || !sources) throw new Error('No element!');

      if (sources.childElementCount === 1) {
        const empty = new Event('empty');
        sources.dispatchEvent(empty);
      }

      if (parent.classList.contains('source-block')) {
        line.append(this.element);
      }
      if (parent.classList.contains('line')) {
        sources.append(this.element);
      }
    }
  };
}
