import Game from "./game";
import GameState from "./game-state";
import IMove from "./imove";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BackgroundScroll extends cc.Component implements IMove {
  @property({ type: cc.Sprite })
  backgrounds: cc.Sprite[] = [];

  game: Game;
  
  // scrolling speed
  speed = 40;
  bgWidth = 288;

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
    for (const bg of this.backgrounds) {
      bg.node.x--;
      if (bg.node.x <= -this.bgWidth) {
        bg.node.x = this.bgWidth;
      }
    }
  }
}
