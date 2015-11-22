var Bucket = function(args){
  args = args || {}
  this.color = args.color || [0,0,0]
  this.x = args.x || 0
  this.y = args.y || 0
  this.canvas = args.canvas || $('canvas').first()
}

Bucket.prototype.dribble = function(){
  var x = parseInt(this.x + gaussianBoxMuller(0, 30))
  var y = parseInt(this.y + gaussianBoxMuller(0, 30))
  var yOff = this.canvas.height()/2
  var xOff = this.canvas.width()/2
  x = xOff + x
  y = yOff - y
  var context = this.canvas[0].getContext('2d');
  var r = this.color[0]
  var g = this.color[1]
  var b = this.color[2]
  // console.log(x, y)
  context.beginPath()
  context.fillStyle = 'rgba('+r+','+g+','+b+','+'0.1)'
  context.arc(x, y, 10, 0, 2*Math.PI)
  // context.arc(x, y, 10, 0, 6.2832)
  context.fill()
  context.closePath()
};

var bucketRun = function(){
  var redBuck = new Bucket({color: [255,0,0]})
  var blueBuck = new Bucket({color: [0,255,0], x:20, y:45})
  var greenBuck = new Bucket({color: [0,0,255], x:-20, y:45})
  for(var i=0; i<1000; i++){
    redBuck.dribble()
    greenBuck.dribble()
    blueBuck.dribble()
  }
}

var canv = function(){
  var cont = $('canvas')[0].getContext('2d')
  cont.arc(100,100, 15, 0, 2* Math.PI)
  cont.fillStyle= 'rgba(255,0,0,.1)'
  cont.fill();
}
