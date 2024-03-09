export default class PieceMaker {
  src: string;

  constructor(src: string) {
    this.src = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${src}`;
  }
}
