import Div from '../../components/divElement';
import { BaseElement } from '../../components/base-element';

export default class Field extends Div {
  constructor(
    {
      fieldWidth,
      fieldHeight,
    }: {
      fieldWidth: number;
      fieldHeight: number;
    },
    ...child: (BaseElement | HTMLElement | null)[]
  ) {
    super({ className: 'field' }, ...child);

    this.element.style.width = `${fieldWidth}px`;
    this.element.style.height = `${fieldHeight}px`;
  }
}
