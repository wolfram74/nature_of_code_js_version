var World = function(args){
  args = args || {}
  this.bodies = args.bodies || []
  this.canvas = args.canvas || $('canvas').first()
  this.noEdge = args.noEdge || false
  this.rule = args.rule || function(body){
    body.applyForce( new Vector([.5,.25]))
  };
  this.time = 0
};

World.prototype.checkEdges = function(){
  for(var i=0; i<this.bodies.length; i++){
    this.bodies[i].checkEdges()
  };
}

World.prototype.update = function(){
  for(var i=0; i<this.bodies.length; i++){
    this.rule(this.bodies[i])
  };
  if(!this.noEdge){
    for(var i=0; i<this.bodies.length; i++){
      this.bodies[i].update()
    };
  };
  this.time +=1
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

World.prototype.KEcalc = function(){
  var tote = 0
  for(var i=0; i<this.bodies.length; i++){
    var speed = this.bodies[i].velocity.mag()
    tote += this.bodies[i].mass * Math.pow(speed, 2)
  };
  return tote
};

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
};

var worldDampedHarmonic = function(){
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
      var springForce = new Vector([
        .01*(xOff-body.location.values[0]),
        0])
      var velocity = Vector.copy(body.velocity)
      var dampingForce = velocity.mult(-0.005)
      body.applyForce(springForce)
      body.applyForce(dampingForce)
    }
  })
  iterator(10000, function(){
    world.checkEdges()
    world.update()
    world.display()
  }, 1)
};

var worldRunInteractions = function(){
  var worldView = canvasSetup('worldView')
  $('.displays').append(worldView)
  var bodies = []
  var randI = function(i){return Math.random()*i}
  for(var i = 0; i < 15; i++){
    var bodyArgs = {
      mass: 40,
      location: new Vector([randI(400),randI(400),]),
      velocity: new Vector([randI(1),randI(1),]),
      group: true,
      canvas: worldView
    };
    bodies.push(new Mover(bodyArgs))
  };
  world = new World({
    bodies: bodies,
    canvas: worldView,
    rule: function(body){
      for(var i=0; i<this.bodies.length; i++){
        var other = this.bodies[i]
        var sep = Vector.sub(body.location, other.location)
        var dist = sep.mag()
        if( dist > .1 && dist < 20){
          body.applyForce(sep)
        }
      };
    }
  })
  iterator(10000, function(){
    world.checkEdges()
    world.update()
    world.display()
    console.log(world.KEcalc())
  }, 1)
}
