var World = function(args){
  args = args || {}
  this.bodies = args.bodies || []
  this.features = args.features || []
  this.canvas = args.canvas || $('canvas').first()
  this.noEdge = args.noEdge || false
  this.rule = args.rule || function(body){
    body.applyForce( new Vector([.5,.25]))
  };
  this.time = 0
};

World.prototype.checkEdges = function(){
  if(!this.noEdge){
    for(var i=0; i<this.bodies.length; i++){
      this.bodies[i].checkEdges()
    };
  };
}

World.prototype.update = function(){
  for(var i=0; i<this.bodies.length; i++){
    this.rule(this.bodies[i])
    for(var j=0; j<this.features.length; j++){
      this.features[j].effect(this.bodies[j])
    };
  };
  for(var i=0; i<this.bodies.length; i++){
    this.bodies[i].update()
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

var worldDrivenDampedHarmonic = function(){
  var worldView = canvasSetup('worldView')
  $('.displays').append(worldView)
  var bodies = []
  var center = worldView.width()/2
  for(var i = 0; i < 99; i++){
    var bodyArgs = {
      mass: 4,
      location: new Vector([center,i*4+4]),
      group: true,
      canvas: worldView
    };
    bodies.push(new Mover(bodyArgs))
  };
  world = new World({
    bodies: bodies,
    canvas: worldView,
    noEdge: true,
    rule: function(body){
      var xOff = body.maxX/2
      var springForce = new Vector([
        .01*(xOff-body.location.values[0]),
        0])
      var velocity = Vector.copy(body.velocity)
      var dampingForce = velocity.mult(-0.0005)
      var drivingForce = new Vector([0.01, 0])
      var sineValue = Math.sin((this.time/100)*(body.location.values[1]/60))
      body.applyForce(springForce)
      body.applyForce(dampingForce)
      body.applyForce(drivingForce.mult(sineValue))
    }
  })
  iterator(100000, function(){
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

var isochronous = function(){
  var worldView = canvasSetup('worldView')
  $('.displays').append(worldView)
  var bodies = []
  var rad
  var theta
  var x
  var y
  var dTheta = 6.28/16
  for(var i = 0; i < 15; i++){
    rad = 10+i*10
    theta = dTheta + i*dTheta
    x = rad*Math.cos(theta)
    y = rad*Math.sin(theta)
    var bodyArgs = {
      mass: 25,
      location: new Vector([x+200,y+200]),
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
      var yOff = body.maxY/2
      body.applyForce(new Vector([
        .01*(xOff-body.location.values[0]),
        .01*(yOff-body.location.values[1])]
        )
      )
    }
  })
  iterator(10000, function(){
    world.checkEdges()
    world.update()
    world.display()
  }, 1)

}
