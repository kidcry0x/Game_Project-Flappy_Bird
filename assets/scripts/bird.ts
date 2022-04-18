import Game from "./game";
import GameState from "./game-state";
import GameUi from "./game-ui";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bird extends cc.Component {
  @property(Game)
  game: Game;
  @property(GameUi)
  gameUi: GameUi;

  animation: cc.Animation;
  // bird falling speed
  velocity: number = 0;

  score: number = 0;

  startY: number;

  onLoad() {
    cc.director.getCollisionManager().enabled = true;
    cc.Canvas.instance.node.on(
      cc.Node.EventType.TOUCH_START,
      this.onTouchStart,
      this
    );
    this.animation = this.getComponent(cc.Animation);
    this.startY = this.node.y;
  }

  update(dt: number) {
    if (this.game.gameState === GameState.PLAYING) {
      this.fall();
    }
  }
  
  onTouchStart(event: cc.Event.EventTouch) {
    if (this.game.gameState === GameState.PLAYING) {
      this.jump();
    } else if (this.game.gameState === GameState.READY) {
      this.node.dispatchEvent(new cc.Event.EventCustom('start', true));
    } else if (this.game.gameState === GameState.OVER) {
      this.node.dispatchEvent(new cc.Event.EventCustom('restart', true));
    }
  }
  
  onCollisionEnter (other: cc.Collider, self: cc.Collider) {
    if (other.tag === 1) {
      this.increaseScore();
    } else {
      this.die();
    }
  }

  increaseScore() {
    this.gameUi.scoreLabel.string = (++this.score).toString();
  }
  
  jump() {
    this.velocity = 3;
  }
  
  fall() {
    this.velocity -= 0.2;
    this.node.y += this.velocity;
    
    // rotate bird on falling
    let angle = (this.velocity / 2) * 30;
    if (angle >= 30) {
      angle = 30;
    }
    this.node.angle = angle;
  }
  
  die() {
    this.gameUi.showGameOver();
    this.node.dispatchEvent(new cc.Event.EventCustom('dead', true));
    this.animation.stop();
    this.score = 0;
  }

  restart() {
    this.node.y = this.startY;
    this.node.angle = 0;
    this.velocity = 0;
    this.animation.play();
  }
}
