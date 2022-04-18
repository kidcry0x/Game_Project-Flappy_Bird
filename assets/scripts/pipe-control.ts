import Game from "./game";
import GameState from "./game-state";
import IMove from "./imove";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PipeControl extends cc.Component implements IMove {
  @property(cc.Prefab)
  pipePrefab: cc.Prefab = null;

  game: Game;

  pipes: cc.Node[] = [null, null, null];

  onLoad() {
    this.game = this.node.getComponent(Game);
  }

  start() {
    // init pipes
    // stores pipes into an array for recycling
    for (let i = 0; i < this.pipes.length; i++) {
      this.pipes[i] = cc.instantiate(this.pipePrefab);
      this.node.getChildByName('Pipe').addChild(this.pipes[i]);
  
      this.pipes[i].x = 170 + 200 * i;
      this.pipes[i].y = this.randomY();
    }
  }
  
  restart() {
    for (let i = 0; i < this.pipes.length; i++) {
      this.pipes[i].x = 170 + 200 * i;
      this.pipes[i].y = this.randomY();
    }
  }

  update() {
    if (this.game.gameState === GameState.PLAYING) {
      this.move();
    }
  }
  
  move() {
    // move pipes
    for (let i = 0; i < this.pipes.length; i++) {
      this.pipes[i].x -= 1.0;
      if (this.pipes[i].x <= -170) {
          this.pipes[i].x = 430;
  
          this.pipes[i].y = this.randomY();
      }
    }
  }

  // random y position for pipes
  randomY() {
    const minY = -110;
    const maxY = 110;
    return minY + Math.random() * (maxY - minY);
  }
}
