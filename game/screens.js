var PlayScreen = me.ScreenObject.extend({
  onDestroyEvent: function() {
    me.gamestat.reset("life");
  },
  onResetEvent: function() {
    me.levelDirector.loadLevel("level1");
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
	me.input.bindKey(me.input.KEY.DOWN, "down");
	me.input.bindKey(me.input.KEY.UP, "up");
    document.getElementById('game_state').innerHTML = "Just move";
    document.getElementById('instructions').innerHTML = "Arrows to move and Space to jump.";
  }
});
var TitleScreen = me.ScreenObject.extend({
  init: function() {
    this.parent(true);
    me.input.bindKey(me.input.KEY.SPACE, "jump", true);
  },
  onResetEvent: function() {
    if (this.title == null) {
      this.title = me.loader.getImage("titleScreen");
      document.getElementById('game_state').innerHTML = "";
      document.getElementById('instructions').innerHTML = ""; 
    }
  },
  update: function() {
    if (me.input.isKeyPressed('jump')) {
      me.state.change(me.state.PLAY);
    }
    return true;
  },
  draw: function(context){
    context.drawImage(this.title, 50, 50);
  }
});
