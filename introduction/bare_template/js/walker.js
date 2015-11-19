function Walker(args){
  args = args || {}
  this.x = args.x || 0
  this.y = args.y || 0
  this.canvas = args.canvas || $('canvas').first()
};

Walker.prototype.display = function(){
  var context = this.canvas[0].getContext('2d');
  var yOff = this.canvas.height()/2
  var xOff = this.canvas.width()/2
  context.fillStyle = "rgba(0,0,0,1)"
  context.fillRect(this.x+xOff, yOff-this.y, 1, 1)
}

Walker.prototype.step = function(){
  var choice = parseInt(Math.random()*4)
  this.x += (1-choice)%2
  this.y += (2-choice)%2
}

var testRun = function(){
  var bleh = new Walker()
  for(var i=0; i<10000; i++){
    bleh.step()
    bleh.display()
  }
}
