import Game from "./game";
import GameState from "./game-state";
import IMove from "./imove";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Base extends cc.Component implements IMove {
  @property({ type: cc.Sprite })
  bases: cc.Sprite[] = [];

  game: Game;
  
  // scrolling speed
  speed = 60;
  baseWidth = 336;

  onLoad() {
    this.game = cc.find("Canvas").getComponent(Game);
  }
  
  // do scrolling with update
  update (dt: number) {
    if (this.game.gameState !== GameState.OVER) {
      this.move();
    }
  }

  move(): void {
    for (const base of this.bases) {
      base.node.x--;
      if (base.node.x <= -this.baseWidth) {
        base.node.x = this.baseWidth;
      }
    }
  }
}
