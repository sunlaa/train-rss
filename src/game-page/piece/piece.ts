import Div from '../../components/divElement';
import { ParamsOmitTag } from '../../components/base-element';
import nonNullable from '../../utilits/nonNullable';

export default class Piece extends Div {
  shiftX: number;

  shiftY: number;

  constructor(params: ParamsOmitTag) {
    super(params);

    this.element.draggable = true;

    this.shiftX = 0;
    this.shiftY = 0;

    this.element.onclick = this.click;
    this.element.onmousedown = this.mousedown;
    this.addListener('dragstart', (e) => e.preventDefault());
  }

  private mousedown = (event: MouseEvent) => {
    this.shiftX = event.clientX - this.element.getBoundingClientRect().left;
    this.shiftY = event.clientY - this.element.getBoundingClientRect().top;

    document.addEventListener('mousemove', this.mousemove);
    this.element.onmouseup = this.mouseup;
  };

  private mousemove = (event: MouseEvent) => {
    document.body.append(this.element);

    this.element.style.position = 'absolute';
    this.element.style.zIndex = '1000';
    this.element.style.left = `${event.pageX - this.shiftX}px`;
    this.element.style.top = `${event.pageY - this.shiftY}px`;
  };

  private mouseup = () => {
    document.removeEventListener('mousemove', this.mousemove);
    this.element.onmouseup = null;
  };

  private click = (event: Event) => {
    const clikedElem = event.currentTarget;
    if (nonNullable(clikedElem) && clikedElem instanceof HTMLElement) {
      const parentClass = clikedElem.parentElement?.className;
      if (parentClass === 'source-block') {
        const line = document.querySelector('.line');
        if (nonNullable(line)) line.append(this.element);
      } else if (parentClass === 'line') {
        const source = document.querySelector('.source-block');
        if (nonNullable(source)) source.append(this.element);
      }
    }
  };
}
