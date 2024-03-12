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
    super(
      {
        className: 'field',
        styles: {
          width: `${fieldWidth}px`,
          height: `${fieldHeight}px`,
        },
      },
      ...child
    );
  }
}
