import TurnTable from "./TurnTable";

const { ccclass } = cc._decorator;

@ccclass
export default class SceneGame extends cc.Component {
    betNode: cc.Node = null;
    turnTable: TurnTable = null;
    start() {
        cc.debug.setDisplayStats(false);
        this.betNode = this.node.getChildByName('下注');
        this.turnTable = cc.find('转盘', this.node).getComponent(TurnTable);
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    }

    private touchStart(event: cc.Event.EventTouch) {
        let pos = event.getLocation();
        for (let i = this.betNode.childrenCount - 1; i >= 0; --i) {
            let node = this.betNode.children[i];
            if (this.isInRect(pos.x, pos.y, node.x - node.width / 2, node.y - node.height / 2, node.width, node.height)) {
                this.turnTable.turnTo(i);
                cc.tween(node).to(0.1, { scale: 0.8 }).to(0.1, { scale: 1 }).start();
                break;
            }
        }
    }

    private isInRect(px: number, py: number, rectX: number, rectY: number, rectW: number, rectH: number): boolean {
        if (px < rectX) return false;
        if (px > rectX + rectW) return false;
        if (py < rectY) return false;
        if (py > rectY + rectH) return false;
        return true;
    }
}
