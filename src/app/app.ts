import './global.css';
import StartPage from '../startPage/startPage';
import EntryPage from '../enrtyPage/enrtyPage';
import { BaseElement } from '../components/base-element';
import Router from '../helpers/router';
import Game from '../game-page/game-page';

export default class App {
  container: HTMLElement;

  router: Router;

  constructor() {
    this.container = document.body;

    const routes = this.createRoutes();
    this.router = new Router(routes);
  }

  public run() {
    this.router.navigate('game-page');
  }

  createRoutes() {
    return [
      {
        path: 'entry-page',
        callback: () => {
          this.setContent(new EntryPage(this.router));
        },
      },
      {
        path: 'start-page',
        callback: () => {
          this.setContent(new StartPage());
        },
      },
      {
        path: 'game-page',
        callback: () => {
          this.setContent(new Game());
        },
      },
    ];
  }

  private setContent(content: BaseElement) {
    this.container.innerHTML = '';
    this.container.append(content.getElement());
  }
}
