import App from './app/app';
// import UserSelect from './game-page/choose-level/choose-round';
// import Pic from './game-page/get-pic-size/pic';
import DrawRound from './game-page/choose-level/draw-round';

const app = new App();
app.run();

// const select = new UserSelect(1, 1);

// const src = select.getImgSrc();

// const piece = new Pic(src);

// piece.getSizes().then((val) => [val.height, val.width]);

const round = new DrawRound(3, 17);

round.draw(1);
