var World = function(args){
  args = args || {}
  this.bodies = args.bodies || []
  this.canvas = args.canvas || $('canvas').first()
  this.rule = args.rule || function(body){
    body.applyForce( new Vector([.5,.25]))
  };
};

World.prototype.checkEdges = function(){
  for(var i=0; i<this.bodies.length; i++){
    this.bodies[i].checkEdges()
  };
}

World.prototype.update = function(){
  for(var i=0; i<this.bodies.length; i++){
    this.applyRule(this.bodies[i])
  };
  for(var i=0; i<this.bodies.length; i++){
    this.bodies[i].update()
  };
};

World.prototype.applyRule = function(body){
  this.rule(body)
};

World.prototype.display = function(){
  var context = this.canvas[0].getContext('2d');
  context.clearRect(0, 0, this.canvas.width(), this.canvas.height());
  for(var i=0; i<this.bodies.length; i++){
    this.bodies[i].display()
  };
}

var worldRun1 = function(){
  var worldView = canvasSetup('worldView')
  $('.displays').append(worldView)
  var bodies = []
  for(var i = 0; i < 15; i++){
    var bodyArgs = {
      mass: i*i*3,
      location: new Vector([1,1]),
      group: true,
      canvas: worldView
    };
    bodies.push(new Mover(bodyArgs))
  };
  world = new World({
    bodies: bodies,
    canvas: worldView
  })
  iterator(10000, function(){
    world.checkEdges()
    world.update()
    world.display()
  }, 1)
}

var worldRunHarmonic = function(){
  var worldView = canvasSetup('worldView')
  $('.displays').append(worldView)
  var bodies = []
  for(var i = 0; i < 15; i++){
    var bodyArgs = {
      mass: i*i*3,
      location: new Vector([50,i*20+20]),
      group: true,
      canvas: worldView
    };
    bodies.push(new Mover(bodyArgs))
  };
  world = new World({
    bodies: bodies,
    canvas: worldView,
    rule: function(body){
      var xOff = body.maxX/2
      body.applyForce(new Vector([
        .01*(xOff-body.location.values[0]),
        0]))
    }
  })
  iterator(10000, function(){
    world.checkEdges()
    world.update()
    world.display()
  }, 1)
}
