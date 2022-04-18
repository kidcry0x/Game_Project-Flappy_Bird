const { ccclass, property } = cc._decorator;

@ccclass
export default class GameUi extends cc.Component {
  @property(cc.Node)
  getReady: cc.Node;

  @property(cc.Node)
  gameOver: cc.Node;

  @property(cc.Node)
  startMenu: cc.Node;

  @property(cc.Button)
  playButton: cc.Button;
  
  @property(cc.Label)
  scoreLabel: cc.Label;

  start() {
    const clickEventHandler = new cc.Component.EventHandler();
    clickEventHandler.target = this.node; // This node is the node to which your event handler code component belongs
    clickEventHandler.component = "game-ui";// This is the code file name
    clickEventHandler.handler = "restartGame";

    this.playButton.clickEvents.push(clickEventHandler);
  }
  
  hideStartMenu() {
    this.startMenu.active = false;
  }

  hideGetReady() {
    this.getReady.active = false;
  }

  showGameOver() {
    this.gameOver.active = true;
  }

  hideGameOver() {
    this.gameOver.active = false;
  }

  showStartMenu() {
    this.startMenu.active = true;
  }

  showPlayButton() {
    this.playButton.node.active = true;
  }

  hidePlayButton() {
    this.playButton.node.active = false;
  }

  showScore() {
    this.scoreLabel.node.active = true;
  }

  restartGame() {
    this.node.dispatchEvent(new cc.Event.EventCustom('restart', true));
  }
}
