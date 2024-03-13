import './listener-handler.css';
import Div from '../../components/divElement';

function dropOnEmptyPlace(to: HTMLElement, element: HTMLElement) {
  const place = to.querySelector('.placeholder');
  if (place) {
    const nextElem = place.nextElementSibling;
    place.remove();
    to.insertBefore(element, nextElem);
  } else {
    to.append(element);
  }
}

function createEmptyPlace(from: HTMLElement, element: HTMLElement) {
  if (from.lastElementChild === element) {
    return;
  }
  const placeholder = new Div({
    className: 'placeholder',
    styles: {
      width: `${element.offsetWidth}px`,
      backgroundColor: 'transparent',
    },
  });

  from.replaceChild(placeholder.getElement(), element);
}

function getAfterElement(line: HTMLDivElement, x: number) {
  const lineInnerPieces = [...line.querySelectorAll('.wrapper:not(.dragging)')];
  const placeholders = [...line.querySelectorAll('.placeholder')];

  const lineInner = [...lineInnerPieces, ...placeholders];

  const res: { offset: number; element?: HTMLElement } = lineInner.reduce(
    (closest, piece) => {
      const picesSize = piece.getBoundingClientRect();
      const offset = x - picesSize.left - picesSize.width / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset, element: piece };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY }
  );
  if (res.element) {
    return res.element;
  }
  return null;
}

export default class ListenerHandler {
  currentPieces: Div[];

  currentLine: HTMLDivElement;

  sourceBlock: HTMLDivElement;

  currentDraggble: HTMLElement | null;

  constructor(
    currentPieces: Div[],
    currentLine: Div,
    sourceBlock: HTMLDivElement
  ) {
    this.currentPieces = currentPieces;
    this.currentLine = currentLine.getElement();
    this.sourceBlock = sourceBlock;

    this.currentDraggble = null;
  }

  private lastDrop = () => {
    const picesInSources = this.sourceBlock.querySelectorAll('.wrapper');
    if (picesInSources.length === 0) {
      this.removeListeners();
      this.sourceBlock.dispatchEvent(new Event('empty', { bubbles: true })); // Будет дргое событие!
    }
  };

  addListeners() {
    this.currentPieces.forEach((piece) => {
      if (piece) {
        const puzzle = piece.getElement();
        puzzle.draggable = true;
        piece.addListener('click', this.click);
        piece.addListener('dragstart', this.dragstart);
        piece.addListener('dragend', this.dragend);
      }
    });

    this.sourceBlock.addEventListener('dragover', this.dropOnSource);

    this.currentLine.addEventListener('dragover', this.dropOnLine);
  }

  removeListeners() {
    this.currentPieces.forEach((piece) => {
      if (piece) {
        const puzzle = piece.getElement();
        puzzle.draggable = false;
        piece.removeListener('click', this.click);
        piece.removeListener('dragstart', this.dragstart);
        piece.removeListener('dragend', this.dragend);
      }
    });

    this.sourceBlock.removeEventListener('dragover', this.dropOnSource);

    this.currentLine.removeEventListener('dragover', this.dropOnLine);
  }

  private dragstart = (event: Event) => {
    const draggable = event.currentTarget as HTMLElement;
    this.currentDraggble = draggable;

    draggable.classList.add('dragging');
  };

  private dragend = () => {
    if (this.currentDraggble) this.currentDraggble.classList.remove('dragging');
    this.lastDrop();
  };

  private dropOnLine = (event: MouseEvent) => {
    event.preventDefault();
    if (!this.currentDraggble) throw new Error('No dragble element!');

    const parent = this.currentDraggble.parentElement;

    if (parent) {
      if (parent.classList.contains('line')) {
        const afterElem = getAfterElement(this.currentLine, event.clientX);
        if (afterElem === null) {
          this.currentLine.append(this.currentDraggble);
        } else {
          this.currentLine.insertBefore(this.currentDraggble, afterElem);
        }
        return;
      }
    }

    createEmptyPlace(this.sourceBlock, this.currentDraggble);

    dropOnEmptyPlace(this.currentLine, this.currentDraggble);
  };

  private dropOnSource = (event: Event) => {
    event.preventDefault();
    if (!this.currentDraggble) throw new Error('No dragble element!');

    if (
      this.currentDraggble.parentElement?.classList.contains('source-block')
    ) {
      return;
    }

    createEmptyPlace(this.currentLine, this.currentDraggble);

    dropOnEmptyPlace(this.sourceBlock, this.currentDraggble);
  };

  private click = (event: Event) => {
    const clickedPiece = event.currentTarget as HTMLElement;
    const parent = clickedPiece.parentElement;
    if (!parent) throw new Error('No pices parent!');

    if (parent.classList.contains('source-block')) {
      createEmptyPlace(this.sourceBlock, clickedPiece);

      dropOnEmptyPlace(this.currentLine, clickedPiece);
    } else {
      createEmptyPlace(this.currentLine, clickedPiece);

      dropOnEmptyPlace(this.sourceBlock, clickedPiece);
    }

    this.lastDrop();
  };
}
