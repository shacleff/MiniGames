const Enum = require("Constant");

cc.Class({
    extends: cc.Component,

    properties: {
        snakeNode: cc.Node,
        wallNode: cc.Node,
        appleNode: cc.Node,
        gameOverNode: cc.Node,
        totalScore: cc.Label,
        maxScore: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.initData();
        this.initUI();
    },

    start() {
        this.onEvent();
    },

    onEvent() {
        this.offEvent();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this), this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this), this);
    },

    offEvent() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this), this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this), this);
    },

    initData() {
        this._snakes = [];
        this._walls = [];
        this._apples = [];
        this._enemySnakes = [];     // 人机蛇
        this._randomCount = 0;
        this.level = 5;
        this.score = 0;
        this.current_dir = Enum.Direction.Left;
        this.setMaxScoreLabel();
    },

    initUI() {
        if (this.level == Enum.Level.Level_1) {
            this.initUI_1();
        } else if (this.level == Enum.Level.Level_2) {
            this.initUI_2();
        } else if (this.level == Enum.Level.Level_3) {
            this.initUI_3();
        } else if (this.level == Enum.Level.Level_4) {
            this.initUI_4();
        } else if (this.level == Enum.Level.Level_5) {
            this.initUI_5();
            // 驱动人机蛇
            this.driverEnemySanke(Enum.Level_Speed["Level_" + this.level]);
        }
        // 驱动
        this.driverSanke(Enum.Level_Speed["Level_" + this.level]);
    },

    initUI_1() {
        this.deskClear();
        // 蛇本体
        this.initSnake(0, 0, Enum.Direction.Left, 4);
        // 地图
        var wallPos = [];
        for (let i = -1 * Enum.Design_Cell_Width; i <= Enum.Design_Cell_Width; i++) {
            for (let j = -1 * Enum.Design_Cell_Height; j <= Enum.Design_Cell_Height; j++) {
                if (i == -1 * Enum.Design_Cell_Width || i == Enum.Design_Cell_Width || j == -1 * Enum.Design_Cell_Height || j == Enum.Design_Cell_Height) {
                    wallPos.push({ posX: i, posY: j });
                }
            }
        }
        this.initMap(wallPos);
        // 苹果
        this.initApples(1);
    },

    initUI_2() {
        this.deskClear();
        // 蛇本体
        this.initSnake(0, 0, Enum.Direction.Left, 4);
        // 地图
        var wallPos = [];
        for (let i = -1 * Enum.Design_Cell_Width; i <= Enum.Design_Cell_Width; i++) {
            for (let j = -1 * Enum.Design_Cell_Height; j <= Enum.Design_Cell_Height; j++) {
                if (i == -1 * Enum.Design_Cell_Width || i == Enum.Design_Cell_Width || j == -1 * Enum.Design_Cell_Height || j == Enum.Design_Cell_Height) {
                    wallPos.push({ posX: i, posY: j });
                }
            }
        }
        wallPos.push({ posX: 0, posY: Math.floor(Enum.Design_Cell_Height / 2) });
        wallPos.push({ posX: 0, posY: -1 * Math.floor(Enum.Design_Cell_Height / 2) });
        this.initMap(wallPos);
        // 苹果
        this.initApples(2);
    },

    initUI_3() {
        this.deskClear();
        // 蛇本体
        this.initSnake(0, 0, Enum.Direction.Left, 4);
        // 地图
        var wallPos = [];
        for (let i = -1 * Enum.Design_Cell_Width; i <= Enum.Design_Cell_Width; i++) {
            for (let j = -1 * Enum.Design_Cell_Height; j <= Enum.Design_Cell_Height; j++) {
                if (i == -1 * Enum.Design_Cell_Width || i == Enum.Design_Cell_Width || j == -1 * Enum.Design_Cell_Height || j == Enum.Design_Cell_Height) {
                    wallPos.push({ posX: i, posY: j });
                }
            }
        }
        for (let i = -2; i <= 2; i++) {
            wallPos.push({ posX: i, posY: Math.floor(Enum.Design_Cell_Height / 2) });
            wallPos.push({ posX: i, posY: -1 * Math.floor(Enum.Design_Cell_Height / 2) });
        }
        this.initMap(wallPos);
        // 苹果
        this.initApples(3);
    },

    initUI_4() {
        this.deskClear();
        // 蛇本体
        this.initSnake(0, 0, Enum.Direction.Left, 4);
        // 地图
        var wallPos = [];
        for (let i = -1 * Enum.Design_Cell_Width; i <= Enum.Design_Cell_Width; i++) {
            for (let j = -1 * Enum.Design_Cell_Height; j <= Enum.Design_Cell_Height; j++) {
                if (i == -1 * Enum.Design_Cell_Width || i == Enum.Design_Cell_Width || j == -1 * Enum.Design_Cell_Height || j == Enum.Design_Cell_Height) {
                    wallPos.push({ posX: i, posY: j });
                }
                if ((i == 13 && j >= 5 && j <= 7) || (i >= 12 && i <= 14 && j == 6)) {
                    wallPos.push({ posX: i, posY: j });
                }
                if ((i == -13 && j >= 5 && j <= 7) || (i <= -12 && i >= -14 && j == 6)) {
                    wallPos.push({ posX: i, posY: j });
                }
                if ((i == -13 && j <= -5 && j >= -7) || (i <= -12 && i >= -14 && j == -6)) {
                    wallPos.push({ posX: i, posY: j });
                }
                if ((i == 13 && j <= -5 && j >= -7) || (i >= 12 && i <= 14 && j == -6)) {
                    wallPos.push({ posX: i, posY: j });
                }
            }
        }
        this.initMap(wallPos);
        // 苹果
        this.initApples(4);
    },

    initUI_5() {
        this.deskClear();
        // 蛇本体
        this.initSnake(-4, 0, Enum.Direction.Left, 4);
        // 人机蛇
        this.initEnemySnake(4, 0, Enum.Direction.Right, 4);
        // 地图
        var wallPos = [];
        for (let i = -1 * Enum.Design_Cell_Width; i <= Enum.Design_Cell_Width; i++) {
            for (let j = -1 * Enum.Design_Cell_Height; j <= Enum.Design_Cell_Height; j++) {
                if (i == -1 * Enum.Design_Cell_Width || i == Enum.Design_Cell_Width || j == -1 * Enum.Design_Cell_Height || j == Enum.Design_Cell_Height) {
                    wallPos.push({ posX: i, posY: j });
                }
                if ((i == 13 && j >= 5 && j <= 7) || (i >= 12 && i <= 14 && j == 6)) {
                    wallPos.push({ posX: i, posY: j });
                }
                if ((i == -13 && j >= 5 && j <= 7) || (i <= -12 && i >= -14 && j == 6)) {
                    wallPos.push({ posX: i, posY: j });
                }
                if ((i == -13 && j <= -5 && j >= -7) || (i <= -12 && i >= -14 && j == -6)) {
                    wallPos.push({ posX: i, posY: j });
                }
                if ((i == 13 && j <= -5 && j >= -7) || (i >= 12 && i <= 14 && j == -6)) {
                    wallPos.push({ posX: i, posY: j });
                }
            }
        }
        for (let i = -2; i <= 2; i++) {
            wallPos.push({ posX: i, posY: Math.floor(Enum.Design_Cell_Height / 2) });
            wallPos.push({ posX: i, posY: -1 * Math.floor(Enum.Design_Cell_Height / 2) });
        }
        this.initMap(wallPos);
        // 苹果
        this.initApples(4);
    },

    deskClear() {
        // 清理蛇
        if (this._snakes && this._snakes.length > 0) {
            for (let i = 0; i < this._snakes.length; i++) {
                let _snake = this._snakes[i];
                _snake.destroyRes();
            }
        }
        // 清理苹果
        if (this._apples && this._apples.length > 0) {
            for (let i = 0; i < this._apples.length; i++) {
                let _apple = this._apples[i];
                _apple.destroyRes();
            }
        }
        // 清理地图
        if (this._walls && this._walls.length > 0) {
            for (let i = 0; i < this._walls.length; i++) {
                let _wall = this._walls[i];
                _wall.destroyRes();
            }
        }
        // 清理数据
        this.initLevelData();
    },

    initLevelData() {
        this._snakes = [];
        this._walls = [];
        this._apples = [];
        this.current_dir = Enum.Direction.Left;
    },

    initApples(size) {
        for (let i = 0; i < size; i++) {
            this.buildApple();
        }
    },

    initApple(_apple) {
        let { posX, posY } = this.getRandomCellPosition();
        return _apple.init(posX, posY);
    },

    buildApple() {
        let prefab = app.prefabMgr.getPrefabByName("Apple");
        var apple = cc.instantiate(prefab);
        apple.parent = this.appleNode;
        var _apple = apple.getComponent("Apple");
        _apple.setGameLogic(this);
        _apple.reset();
        var _apple = this.initApple(_apple);
        this._apples.push(_apple);
    },

    getRandomCellPosition() {
        if (this._randomCount >= 30) {
            cc.error("找不到有效的坐标，游戏自动结束！！！");
            this.runGameOver();
            return;
        }
        var randomX = Math.floor(Math.random() * (Enum.Design_Cell_Width * 2 - 1)) - (Enum.Design_Cell_Width - 1);
        var randomY = Math.floor(Math.random() * (Enum.Design_Cell_Height * 2 - 1)) - (Enum.Design_Cell_Height - 1);
        if (this.isNotVaildPos(randomX, randomY)) {
            this._randomCount += 1;     // 循环次数加1
            return this.getRandomCellPosition();
        }
        this._randomCount = 0;
        return { posX: randomX, posY: randomY };
    },

    isNotVaildPos(randomX, randomY) {
        var flag = false;
        // 不在蛇数组
        for (let i = 0; i < this._snakes.length; i++) {
            let _body = this._snakes[i];
            let { posX, posY } = _body.getCellPosition();
            if (posX == randomX && posY == randomY) {
                flag = true;
                break;
            }
        }
        // 不在人机蛇数组
        for (let i = 0; i < this._enemySnakes.length; i++) {
            let _body = this._enemySnakes[i];
            let { posX, posY } = _body.getCellPosition();
            if (posX == randomX && posY == randomY) {
                flag = true;
                break;
            }
        }
        // 不在苹果上
        for (let i = 0; i < this._apples.length; i++) {
            let _apple = this._apples[i];
            let { posX, posY } = _apple.getCellPosition();
            if (posX == randomX && posY == randomY) {
                flag = true;
                break;
            }
        }
        // 不在墙上
        for (let i = 0; i < this._walls.length; i++) {
            let _wall = this._walls[i];
            let { posX, posY } = _wall.getCellPosition();
            if (posX == randomX && posY == randomY) {
                flag = true;
                break;
            }
        }
        return flag;
    },

    initMap(wallCellPosArray) {
        if (wallCellPosArray == null || wallCellPosArray.length == 0) {
            return;
        }
        wallCellPosArray.forEach(element => {
            let { posX, posY } = element;
            var prefab = app.prefabMgr.getPrefabByName("Wall");
            var wallNode = cc.instantiate(prefab);
            wallNode.parent = this.wallNode;
            let _wall = wallNode.getComponent("Wall").init(posX, posY);
            this._walls.push(_wall);
        });
    },

    /**
     * 我方蛇
     * @param {*} headPosX 
     * @param {*} headPosY 
     * @param {*} headDir 
     * @param {*} totalLength 
     */
    initSnake(headPosX, headPosY, headDir, totalLength) {
        // 头部初始化
        var prefab = app.prefabMgr.getPrefabByName("SnakeHead");
        var headNode = cc.instantiate(prefab);
        headNode.parent = this.snakeNode;
        headNode.zIndex = 100;
        this._head = headNode.getComponent("SnakeHead").init(headPosX, headPosY, headDir);
        this._snakes.push(this._head);
        // 身体初始化
        this.buildBody(totalLength - 1);
    },

    /**
     * 敌方蛇
     * @param {*} headPosX 
     * @param {*} headPosY 
     * @param {*} headDir 
     * @param {*} totalLength 
     */
    initEnemySnake(headPosX, headPosY, headDir, totalLength) {
        // 头部初始化
        var prefab = app.prefabMgr.getPrefabByName("SnakeHead");
        var headNode = cc.instantiate(prefab);
        headNode.parent = this.snakeNode;
        headNode.zIndex = 100;
        this._enemyHead = headNode.getComponent("SnakeHead").init(headPosX, headPosY, headDir);
        this._enemySnakes.push(this._enemyHead);
        // 身体初始化
        this.buildEnemyBody(totalLength - 1);
    },

    buildBody(size) {
        if (!size) {
            cc.error("The size of building snake body is null or zero");
            return;
        }
        for (let i = 0; i < size; i++) {
            this.initBody();
        }
    },

    buildEnemyBody(size) {
        if (!size) {
            cc.error("The size of building snake body is null or zero");
            return;
        }
        for (let i = 0; i < size; i++) {
            this.initEnemyBody();
        }
    },

    initBody(hide) {
        hide = hide || false;
        var prefab = app.prefabMgr.getPrefabByName("SnakeBody");
        let bodyNode = cc.instantiate(prefab);
        bodyNode.parent = this.snakeNode;
        bodyNode.zIndex = 1;
        let _lastBody = this.getLastBody(this._snakes);
        let { posX, posY } = this.getNextCellPosByNode(_lastBody, false);
        let lastDir = _lastBody.getDirection();
        var _body = bodyNode.getComponent("SnakeBody").init(posX, posY, lastDir, _lastBody, hide);
        this._snakes.push(_body);
    },

    initEnemyBody(hide) {
        hide = hide || false;
        var prefab = app.prefabMgr.getPrefabByName("SnakeBody");
        let bodyNode = cc.instantiate(prefab);
        bodyNode.parent = this.snakeNode;
        bodyNode.zIndex = 1;
        let _lastBody = this.getLastBody(this._enemySnakes);
        let { posX, posY } = this.getNextCellPosByNode(_lastBody, false);
        let lastDir = _lastBody.getDirection();
        var _body = bodyNode.getComponent("SnakeBody").init(posX, posY, lastDir, _lastBody, hide);
        this._enemySnakes.push(_body);
    },

    snakeTimer() {
        // 渲染身体
        for (let i = this._snakes.length - 1; i > 0; i--) {
            let _snake = this._snakes[i];
            var _pre = _snake.getPreBody();
            if (_pre != null) {
                let { posX, posY } = _pre.getCellPosition();
                let dir = _pre.getDirection();
                _snake.init(posX, posY, dir, _pre);
            }
        }
        // 渲染头
        let { posX, posY } = this.getNextCellPosByNode(this._head, true);
        let dir = this._head.getDirection();
        if (this.isVaildDir(dir, this.current_dir)) {
            dir = this.current_dir;
        }
        this._head.init(posX, posY, dir);
        // 是否吃到苹果
        let { flag, _apple } = this.isEatApple(posX, posY);
        if (flag) {
            this.gainScore(_apple.getAppleScore());
            this.initApple(_apple);
            this.grow();
        }
        // 是否游戏结束
        if (this.isGameOver(posX, posY)) {
            this.runGameOver();
        }
    },

    snakeEnemyTimer() {
        this.onEnemySnakeAutoDriver();
        cc.log();
        // 渲染身体
        for (let i = this._enemySnakes.length - 1; i > 0; i--) {
            let _enemySnake = this._enemySnakes[i];
            var _pre = _enemySnake.getPreBody();
            if (_pre != null) {
                let { posX, posY } = _pre.getCellPosition();
                let dir = _pre.getDirection();
                _enemySnake.init(posX, posY, dir, _pre);
            }
        }
        // 渲染头
        let { posX, posY } = this.getNextCellPosByNode(this._enemyHead, true);
        let dir = this._enemyHead.getDirection();
        if (this.isVaildDir(dir, this.current_enemy_dir)) {
            dir = this.current_enemy_dir;
        }
        this._enemyHead.init(posX, posY, dir);
        // 是否吃到苹果
        let { flag, _apple } = this.isEatApple(posX, posY);
        if (flag) {
            this.initApple(_apple);
            this.enemyGrow();
        }
    },

    onEnemySnakeAutoDriver() {
        var vaildPos = this.getVaildPosByAutoDriver();
        if (vaildPos.length == 0) {
            // 取消人机蛇的自动驾驶
            this.unschedule(this.driverEnemySanke);
            this.gainScore(Math.ceil(Enum.Level_Score.Level_5 / 2));
            for (let i = 0; i < this._enemySnakes.length; i++) {
                let _body = this._enemySnakes[i];
                _body.destroyRes();
            }
            return;
        }
        var randomIndex = Math.floor(Math.random() * vaildPos.length);
        this.current_enemy_dir = this.getDirectionByAutoDriver(vaildPos[randomIndex]);
    },

    getDirectionByAutoDriver(randomPos) {
        var enemyHeadPos = this._enemyHead.getCellPosition();
        var deltaX = randomPos.posX - enemyHeadPos.posX;
        var deltaY = randomPos.posY - enemyHeadPos.posY;
        if (deltaX < 0) {
            return Enum.Direction.Left;
        }
        if (deltaX > 0) {
            return Enum.Direction.Right;
        }
        if (deltaY > 0) {
            return Enum.Direction.Up;
        }
        if (deltaY < 0) {
            return Enum.Direction.Down;
        }
    },

    getVaildPosByAutoDriver() {
        let { posX, posY } = this._enemyHead.getCellPosition();
        var vaildPos = [];
        if (!this.isNotVaildPos({ posX: posX + 1, posY: posY })) {
            vaildPos.push({ posX: posX + 1, posY: posY });
        }
        if (!this.isNotVaildPos({ posX: posX, posY: posY + 1 })) {
            vaildPos.push({ posX: posX, posY: posY + 1 });
        }
        if (!this.isNotVaildPos({ posX: posX, posY: posY - 1 })) {
            vaildPos.push({ posX: posX, posY: posY - 1 });
        }
        if (!this.isNotVaildPos({ posX: posX - 1, posY: posY })) {
            vaildPos.push({ posX: posX - 1, posY: posY });
        }
        return vaildPos;
    },

    grow() {
        this.initBody(true);
    },

    enemyGrow() {
        this.initEnemyBody(true);
    },

    gainScore(score) {
        this.score += score;
        this.totalScore.string = this.formatScore(this.score);
        // 判断过关
        if (this.score > Enum.Level_Score["Level_" + this.level]) {
            this.level += 1;
            this.initUI();
        }
    },

    formatScore(score) {
        if (score < 10) {
            return "0" + score;
        } else {
            return score;
        }
    },

    /**
     * 判断该坐标上是否有苹果
     * @param {*} headPosX 
     * @param {*} headPosY 
     */
    isEatApple(headPosX, headPosY) {
        for (let i = 0; i < this._apples.length; i++) {
            let _apple = this._apples[i];
            let { posX, posY } = _apple.getCellPosition();
            if (posX == headPosX && posY == headPosY) {
                return { flag: true, _apple: _apple }
            }
        }
        return { flag: false }
    },

    runGameOver() {
        // 取消所有定时器
        this.unscheduleAllCallbacks();
        // 取消所有的苹果定时器
        for (let i = 0; i < this._apples.length; i++) {
            let _apple = this._apples[i];
            _apple.reset();
        }
        // 取消事件监听
        this.offEvent();
        // 闪动
        this.addBlinkAnim();
        // show "GameOver"
        this.addGameOverAnim();
        // 上传分数
        this.setMaxScore();
    },

    setMaxScore() {
        var maxScore = this.getMaxScore();
        if (this.score > maxScore) {
            cc.sys.localStorage.setItem(Enum.Secret_Key, this.score);
            this.setMaxScoreLabel();
        }
    },

    setMaxScoreLabel() {
        this.maxScore.string = this.formatScore(this.getMaxScore());
    },

    getMaxScore() {
        return cc.sys.localStorage.getItem(Enum.Secret_Key) || 0;
    },

    addGameOverAnim() {
        this.gameOverNode.setScale(0);
        this.gameOverNode.active = true;
        this.gameOverNode.runAction(cc.sequence(cc.scaleTo(1, 1.2), cc.scaleTo(0.2, 1), cc.rotateBy(2, 360)));
    },

    addBlinkAnim() {
        for (let i = 0; i < this._snakes.length; i++) {
            let _body = this._snakes[i];
            _body.node.runAction(cc.repeatForever(cc.blink(0.5, 1)));
        }
    },

    isGameOver(headPosX, headPosY) {
        // 撞墙
        for (let i = 0; i < this._walls.length; i++) {
            const _wall = this._walls[i];
            let { posX, posY } = _wall.getCellPosition();
            if (headPosX == posX && headPosY == posY) {
                return true;
            }
        }
        // 撞身体
        for (let i = 1; i < this._snakes.length; i++) {
            const _body = this._snakes[i];
            let { posX, posY } = _body.getCellPosition();
            if (headPosX == posX && headPosY == posY) {
                return true;
            }
        }
        return false;
    },

    /**
     * 判断按键方向是否可用
     * @param {*} currentDir 当前蛇的运行方向
     * @param {*} targetDir 键盘获取的目标转向
     */
    isVaildDir(currentDir, targetDir) {
        if (targetDir == null) {
            return false;
        }
        if (currentDir == Enum.Direction.Left && targetDir == Enum.Direction.Right) {
            return false;
        }
        if (currentDir == Enum.Direction.Right && targetDir == Enum.Direction.Left) {
            return false;
        }
        if (currentDir == Enum.Direction.Up && targetDir == Enum.Direction.Down) {
            return false;
        }
        if (currentDir == Enum.Direction.Down && targetDir == Enum.Direction.Up) {
            return false;
        }
        if (currentDir == Enum.Direction.Left && targetDir == Enum.Direction.Left) {
            return false;
        }
        if (currentDir == Enum.Direction.Right && targetDir == Enum.Direction.Right) {
            return false;
        }
        if (currentDir == Enum.Direction.Up && targetDir == Enum.Direction.Up) {
            return false;
        }
        if (currentDir == Enum.Direction.Down && targetDir == Enum.Direction.Down) {
            return false;
        }
        return true;
    },

    getLastBody(_snakes) {
        if (_snakes && _snakes.length > 0) {
            return _snakes[_snakes.length - 1];
        }
        cc.error("This snakes is null");
    },

    speedUp() {
        if (this.isRunSpeedUp) {
            return;
        }
        this.speed = 2 * this.getCurrentLevelSpeed();
        this.speedDriver();
        this.isRunSpeedUp = true;
    },

    speedDown() {
        this.speed = this.getCurrentLevelSpeed();
        this.speedDriver();
        this.isRunSpeedUp = false;
    },

    driverSanke(speed) {
        this.speed = speed;
        this.isRunSpeedUp = false;
        this.speedDriver();
    },

    driverEnemySanke(speed) {
        this.enemySpeed = speed;
        this.speedEnemyDriver();
    },

    speedDriver() {
        this.unschedule(this.snakeTimer);
        this.schedule(this.snakeTimer, this.speed, this);
        this.snakeTimer();
    },

    speedEnemyDriver() {
        this.unschedule(this.snakeEnemyTimer);
        this.schedule(this.snakeEnemyTimer, this.enemySpeed, this);
        this.snakeEnemyTimer();
    },

    getCurrentLevelSpeed() {
        return Enum.Level_Speed["Level_" + this.level];
    },

    /**
     * 获取指定节点的下一个坐标，注意：有方向
     * @param {*} _body 
     * @param {*} isForwad 
     */
    getNextCellPosByNode(_body, isForwad) {
        var dir = _body.getDirection();
        let { posX, posY } = _body.getCellPosition();
        switch (dir) {
            case Enum.Direction.Left:
                return { posX: isForwad ? posX - 1 : posX + 1, posY: posY };
            case Enum.Direction.Down:
                return { posX: posX, posY: isForwad ? posY - 1 : posY + 1 };
            case Enum.Direction.Right:
                return { posX: isForwad ? posX + 1 : posX - 1, posY: posY };
            case Enum.Direction.Up:
                return { posX: posX, posY: isForwad ? posY + 1 : posY - 1 };
        }
    },

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.e:
                // 加速
                // this.speedDown();
                break;
        }
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                // 记录当前方向
                this.current_dir = Enum.Direction.Left;
                break;
            case cc.macro.KEY.w:
                // 记录当前方向
                this.current_dir = Enum.Direction.Up;
                break;
            case cc.macro.KEY.d:
                // 记录当前方向
                this.current_dir = Enum.Direction.Right;
                break;
            case cc.macro.KEY.s:
                // 记录当前方向
                this.current_dir = Enum.Direction.Down;
                break;
            case cc.macro.KEY.e:
                // 加速
                // this.speedUp();
                break;
        }
    },
});
