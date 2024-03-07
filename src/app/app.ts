import './global.css';
// import EntryPage from '../enrtyPage/enrtyPage';
import StartPage from '../startPage/startPage';

export default class App {
  container: HTMLElement;

  constructor() {
    this.container = document.body;
  }

  public run() {
    // this.container.append(new EntryPage().getElement());
    this.container.append(new StartPage().getElement());
  }
}
