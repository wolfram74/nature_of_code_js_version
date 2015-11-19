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

var testRun = function(){
  var bleh = new Walker({canvas: $('canvas').first()})
  for(var i=0; i<100; i++){
    console.log(i)
    bleh.x = i
    bleh.display()
  }
}
