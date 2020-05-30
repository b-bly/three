import BoardController from './board-controller';

export default class Game {
  boardController = null;
  options;

  constructor(options = {}) {
    this.options = options;
    this.init();
  }

  init() {
    this.boardController = new BoardController({
      containerEl: this.options.containerEl,
      assetsUrl: this.options.assetsUrl
    });

    this.boardController.drawBoard();
  }
}