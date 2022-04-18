import Bird from "./bird";
import GameState from "./game-state";
import GameUi from "./game-ui";
import PipeControl from "./pipe-control";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
  gameUi: GameUi;
  gameState: GameState = GameState.READY;
  bird: Bird;
  pipeControl: PipeControl;

  onLoad() {
    this.gameState = GameState.READY;
    this.gameUi = this.node.getComponent(GameUi);
    this.bird = cc.find("Canvas/Bird").getComponent(Bird);
    this.pipeControl = this.node.getComponent(PipeControl);

    this.node.on('dead', () => {
      this.gameState = GameState.OVER;
      this.gameUi.showGameOver();
      this.gameUi.showPlayButton();
    });

    this.node.on('start', () => {
      this.gameState = GameState.PLAYING;
      this.gameUi.hideStartMenu();
      this.gameUi.hideGetReady();
      this.gameUi.showScore();
    });

    this.node.on('restart', () => {
      this.gameState = GameState.PLAYING;
      this.gameUi.hideStartMenu();
      this.gameUi.hideGameOver();
      this.gameUi.hidePlayButton();
      this.bird.restart();
      this.pipeControl.restart();
      this.gameUi.scoreLabel.string = "0";
    });
  }
}
