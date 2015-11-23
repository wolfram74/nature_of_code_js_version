function Walker(args){
  args = args || {}
  this.x = args.x || 0
  this.y = args.y || 0
  this.position = args.position || new Vector([0,0])
  this.canvas = args.canvas || $('canvas').first()
};

Walker.prototype.display = function(){
  var context = this.canvas[0].getContext('2d');
  var yOff = this.canvas.height()/2
  var xOff = this.canvas.width()/2
  context.fillStyle = "rgba(0,0,0,1)"
  var x = this.position.values[0]
  var y = this.position.values[1]
  context.fillRect(x+xOff, yOff-y, 1, 1)
}

Walker.prototype.step = function(){
  var choice = parseInt(Math.random()*4)
  this.position.add( new Vector([(1-choice)%2,(2-choice)%2]))
}

Walker.prototype.nineStep = function(){
  this.position.add( new Vector([parseInt(Math.random()*3)-1,parseInt(Math.random()*3)-1]))
}

Walker.prototype.gaussianStep = function(){
  this.position.add( new Vector([gaussianBoxMuller(),gaussianBoxMuller()]))
  // alternative approach,
  // uniform distribution for theta,
  // gaussian radial,
  // trig to cartesian
}


var walkerRun = function(){
  var w = new Walker()
  for(var i=0; i<10000; i++){
    // w.step()
    // w.nineStep()
    w.gaussianStep()
    w.display()
  }
}
