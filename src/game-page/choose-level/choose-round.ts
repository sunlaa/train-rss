import data1 from '../../sources/data/wordCollectionLevel1.json';
import data2 from '../../sources/data/wordCollectionLevel2.json';
import data3 from '../../sources/data/wordCollectionLevel3.json';
import data4 from '../../sources/data/wordCollectionLevel4.json';
import data5 from '../../sources/data/wordCollectionLevel5.json';
import data6 from '../../sources/data/wordCollectionLevel6.json';

const data: Json[] = [data1, data2, data3, data4, data5, data6];

type SentenseData = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
};

type RoundData = {
  levelData: {
    id: string;
    name: string;
    imageSrc: string;
    cutSrc: string;
    author: string;
    year: string;
  };
  words: SentenseData[];
};

type Json = {
  rounds: RoundData[];
  roundsCount: number;
};

export default class UserSelect {
  level: number;

  round: number;

  roundData: RoundData;

  sentensesData: SentenseData[];

  constructor(level: number, round: number) {
    this.level = level;
    this.round = round;

    this.roundData = this.getData();
    this.sentensesData = this.roundData.words;
  }

  private getData(): RoundData {
    const level = data[this.level - 1];
    return level.rounds[this.round - 1];
  }

  getImgSrc(): string {
    return this.roundData.levelData.imageSrc;
  }

  getSentenses(): string[] {
    return this.sentensesData.map((elem) => elem.textExample);
  }

  getTranslate(): string[] {
    return this.sentensesData.map((elem) => elem.textExampleTranslate);
  }

  getAudioSrc(): string[] {
    return this.sentensesData.map((elem) => elem.audioExample);
  }
}
