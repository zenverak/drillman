var PlayerEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    this.parent(x, y, settings);
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    this.setVelocity(3, 3);
	this.life = 3;
	this.lastHitTime = me.timer.getTime();
	document.getElementById("life").innerHTML = this.life;
	this.gravity = 0;
  },
  update: function() {
    if (me.input.isKeyPressed('left')) { 
		 this.vel.x = -this.accel.x * me.timer.tick;
         this.direction = 'left';
	} 
    else if (me.input.isKeyPressed('right')) { 
		this.vel.x = this.accel.x * me.timer.tick;
		this.direction = "right";
	} 
    else { this.vel.x = 0; };
	if (me.input.isKeyPressed("up")){
		this.vel.y = -this.accel.y*me.timer.tick;
		this.direction = "up";
	}
	else if(me.input.isKeyPressed("down")){
		this.vel.y = this.accel.y * me.timer.tick;
		this.direction = "down";
	}
	else { this.vel.y = 0;};
    if (me.input.isKeyPressed('jump')) { this.doJump(); }
    me.game.collide(this);
    this.updateMovement();
    if (this.bottom > 480){ this.vel.y=0; }
    if (this.vel.x!=0 || this.vel.y!=0) {
      this.parent(this);
      return true;
    }
    return false;
  },
  gameOver: function() {
    me.state.change(me.state.MENU);
  },
  youWin: function() {
    me.state.change(me.state.MENU);
    document.getElementById('game_state').innerHTML = "You Win!";
    document.getElementById('instructions').innerHTML = "";
  },
  takeDamage: function() {

       // can only get hurt once every second, or 1000 milliseconds
       if(me.timer.getTime() - this.lastHitTime > 1000) {
         this.lastHitTime = me.timer.getTime();
			if(this.life>0){
				this.life--;
				this.flicker(60);
				document.getElementById("life").innerHTML = this.life;	
				if(this.life === 0){
					this.gameOver();
				}
			}
		}
	}
});

