export default class Pic {
  src: string;

  constructor(src: string) {
    this.src = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${src}`;
  }

  async getSizes() {
    return new Promise<{ width: number; height: number }>((resolve, reject) => {
      const image = new Image();
      image.src = this.src;
      image.onload = () => {
        resolve({ width: image.width, height: image.height });
      };
      image.onerror = (err) => {
        reject(err);
      };
    });
  }
}
