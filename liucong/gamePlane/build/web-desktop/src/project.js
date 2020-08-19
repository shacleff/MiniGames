window.__require=function e(t,n,i){function o(a,r){if(!n[a]){if(!t[a]){var c=a.split("/");if(c=c[c.length-1],!t[c]){var h="function"==typeof __require&&__require;if(!r&&h)return h(c,!0);if(s)return s(c,!0);throw new Error("Cannot find module '"+a+"'")}a=c}var l=n[a]={exports:{}};t[a][0].call(l.exports,function(e){return o(t[a][1][e]||e)},l,l.exports,e,t,n,i)}return n[a].exports}for(var s="function"==typeof __require&&__require,a=0;a<i.length;a++)o(i[a]);return o}({bullet:[function(e,t,n){"use strict";cc._RF.push(t,"8db4ecxcY5EvZONzFLxnXlp","bullet"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.speed_x=0,this.speed_y=400,this.audio=this.node.getComponent(cc.AudioSource)},start:function(){},onCollisionEnter:function(e,t){this.node.removeFromParent(),this.audio.play()},update:function(e){var t=this.speed_x*e,n=this.speed_y*e;this.node.x+=t,this.node.y+=n,(this.node.y>=540||this.node.x>=360||this.node.x<=-360)&&this.node.removeFromParent()}}),cc._RF.pop()},{}],enemy:[function(e,t,n){"use strict";cc._RF.push(t,"fd0f1n0OtlGaIGySOk83nlJ","enemy"),cc.Class({extends:cc.Component,properties:{enemy_skin:{default:[],type:cc.SpriteFrame},player_path:"Canvas/player"},onLoad:function(){this.speed_x=0,this.speed_y=-200,this.anim=this.node.getChildByName("anim"),this.root=cc.find("Canvas"),this.game_scene=cc.find("Canvas").getComponent("game"),this.flag=0},onCollisionEnter:function(e,t){this.anim.getComponent(cc.Animation).play(),this.scheduleOnce(function(){this.node.removeFromParent()},.2),this.game_scene.add_score()},update:function(e){var t=this.speed_x*e,n=this.speed_y*e;this.node.x+=t,this.node.y+=n,this.node.y<-1e3&&this.node.removeFromParent()}}),cc._RF.pop()},{}],game:[function(e,t,n){"use strict";cc._RF.push(t,"99fd9dTfk5Mga6MkC25wcmI","game");var i=e("enemy");cc.Class({extends:cc.Component,properties:{is_enbale:!0,is_debug:!0,groups_prefab:{default:[],type:cc.Prefab},enemy_component:{default:null,type:i},score_path:"Canvas/killnum/label/num"},onLoad:function(){if(this.is_enbale){var e=cc.director.getCollisionManager();e.enabled=!0,this.is_debug&&(e.enabledDebugDraw=!0)}this.kill_num=0,this.score=cc.find(this.score_path).getComponent(cc.Label),this.player=cc.find("Canvas/player").getComponent("play"),this.playagain=this.node.getChildByName("playagain"),this.playagain.zIndex=100},start:function(){this._gen_random_group(),this.player.play_shoot_more_bullet()},add_score:function(){this.kill_num++,this.score.string=""+this.kill_num},_gen_random_group:function(){var e=Math.random()*this.groups_prefab.length+1;(e=Math.floor(e))>=this.groups_prefab.length&&(e=this.groups_prefab.length);var t=cc.instantiate(this.groups_prefab[e-1]);this.node.addChild(t),t.x=360*(Math.random()-.5),t.y=100*Math.random()+450,this.scheduleOnce(this._gen_random_group.bind(this),1*Math.random()+2)},play_again:function(){cc.director.loadScene("game")}}),cc._RF.pop()},{enemy:"enemy"}],play:[function(e,t,n){"use strict";cc._RF.push(t,"c189bUpEbNDZKCrQJP5iaY+","play"),cc.Class({extends:cc.Component,properties:{enemy_path:"Canvas/enemy",bullet_prefab:{type:cc.Prefab,default:null},player_prefab:{type:cc.Prefab,default:null}},onLoad:function(){this.anim=this.node.getChildByName("anim"),this.node.on(cc.Node.EventType.TOUCH_MOVE,function(e){var t=e.getDelta();this.node.x+=t.x,this.node.y+=t.y,this.node.x>=720&&(this.node.x=720),this.node.x<=-720&&(this.node.x=-720),this.node.y<=-1280&&(this.node.y=-1280)}.bind(this),this.node),this.shoot_flag=3,this.root=cc.find("Canvas"),this.palyAgain=cc.find("Canvas/playagain")},start:function(){},onCollisionEnter:function(e,t){this.anim.getComponent(cc.Animation).play(),this.scheduleOnce(function(){this.node.removeFromParent(),this.palyAgain.active=!0},1)},play_shoot_bullet:function(){this.schedule(this._shoot_bullet.bind(this),.3)},_shoot_bullet:function(){if(2==this.shoot_flag){var e=cc.instantiate(this.bullet_prefab);this.node.parent.addChild(e),e.x=this.node.x,e.y=this.node.y}},play_shoot_more_bullet:function(){this.schedule(this._shoot_more_bullet.bind(this),.3)},_shoot_more_bullet:function(){if(3==this.shoot_flag){for(var e=[],t=0;t<3;t++)e[t]=cc.instantiate(this.bullet_prefab),this.node.parent.addChild(e[t]);e[0].x=this.node.x,e[0].y=this.node.y,e[1].x=this.node.x-25,e[1].y=this.node.y,e[1].getComponent("bullet").speed_x=-50,e[2].x=this.node.x+25,e[2].y=this.node.y,e[2].getComponent("bullet").speed_x=50}}}),cc._RF.pop()},{}]},{},["bullet","enemy","game","play"]);