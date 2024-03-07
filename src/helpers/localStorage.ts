import nonNullable from '../utilits/nonNullable';

type LocalData = {
  [key: string]: string;
};

export default class LocalStorage {
  static save(key: string, data: string) {
    const JSONdata = JSON.stringify(data);
    window.localStorage.setItem(key, JSONdata);
  }

  static get(key: string): LocalData | null {
    const data = localStorage.getItem(key);
    if (nonNullable(data)) {
      return JSON.parse(data);
    }

    return null;
  }

  static clear() {
    window.localStorage.clear();
  }
}
