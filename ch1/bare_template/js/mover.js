var Mover = function(args){
  args = args || {}
  this.canvas = args.canvas || $('canvas').first()
  var yOff = this.canvas.height()/2
  var xOff = this.canvas.width()/2
  this.location = args.location || new Vector([xOff,yOff])
  this.velocity = args.velocity || new Vector(
    [Math.random()*4-2,Math.random()*4-2]
    )
};

Mover.prototype.update = function(){
  this.location.add(this.velocity)
};

Mover.prototype.checkEdges=function(){
  //works if square canvas, so what if it's brittle, look at that iterator function!
  this.location.modulus(this.canvas.height())
};

Mover.prototype.display = function(){
  var context = this.canvas[0].getContext('2d');
  var x = this.location.values[0]
  var y = this.location.values[1]
  context.beginPath()
  context.clearRect(0, 0, this.canvas.width(), this.canvas.height());
  context.fillStyle = "rgba(0,0,0,1)"
  context.arc(x, this.canvas.height()-y, 10, 0, 2*Math.PI)
  context.fill()
  context.closePath()
}

var moverRun1 = function(){
  var mov = new Mover()
  iterator(10000, function(){
    mov.update()
    mov.checkEdges()
    mov.display()
  }, 1)
}

var iterator = function(cycles, callback, delay){
  delay = delay || 0
  if(cycles > 0){
    setTimeout(
      function(){
        callback();
        iterator(cycles-1, callback, delay)
      },
      delay)
  }
}
