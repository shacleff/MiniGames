//我的飞机的创建及控制
cc.Class({
    extends: cc.Component,

    properties: {
        //速度
        speed:0,
        //限定飞机运动范围
        maxPositionX:320,
        minPositionX:-320,
        maxPositionY:480,
        minPositionY:-480,
    },

    onKeyDown (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.s:
                this.accBack = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
            case cc.macro.KEY.w:
                this.accUp = true;
                break;
            case cc.macro.KEY.space:
                this.accSpace = true;
                break;
        }
    },

    onKeyUp (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.s:
                this.accBack = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
            case cc.macro.KEY.w:
                this.accUp = false;
                break;
            case cc.macro.KEY.space:
                this.accSpace = false;
                break;
        }
    },
    touchMove:function(event){
        let delta = event.touch.getDelta();
        this.x += delta.x;
        this.y += delta.y;
    },
    destroySelf:function(){
        this.node.destroy();
    },
    onLoad:function(){
        this.accLeft=false;//左
        this.accBack=false;//后
        this.accRight=false;//右
        this.accUp=false;//前
        this.accSpace = false;//定住
        this.mySpeedx = 0;
        this.mySpeedy = 0;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        //触摸事件
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this.node);
        //this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
    },

    onDestroy:function(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
        //this.node.off(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
    },

    start:function () {
    },
    update:function(dt){
         // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.mySpeedx=0;
            this.mySpeedy=0;
            this.mySpeedx -= this.speed ; //左
        } else if (this.accBack) {
            this.mySpeedx=0;
            this.mySpeedy=0;
            this.mySpeedy -= this.speed ; //后
        }else if (this.accRight) {
            this.mySpeedx=0;
            this.mySpeedy=0;
            this.mySpeedx += this.speed; //右
            
        }else if (this.accUp) {
            this.mySpeedx=0;
            this.mySpeedy=0;
            this.mySpeedy += this.speed ; //前
        }
        else if (this.accSpace){
            this.mySpeedx=0;
            this.mySpeedy=0;
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.mySpeedx;
        this.node.y += this.mySpeedy;
        if(this.node.x>this.maxPositionX-this.node.width/2){
            this.node.x=this.maxPositionX-this.node.width/2;
        }
        else if(this.node.x<this.minPositionX+this.node.width/2){
            this.node.x=this.minPositionX+this.node.width/2;
        }
        if(this.node.y>this.maxPositionY-this.node.height/2){
            this.node.y=this.maxPositionY-this.node.height/2;
        }
        else if(this.node.y<this.minPositionY+this.node.height/2){
            this.node.y=this.minPositionY+this.node.height/2;
        }

    },

});
