var World = function(args){
  args = args || {}
  this.bodies = args.bodies || []
};

World.prototype.checkEdges = function(){

}

World.prototype.update = function(){

}

World.prototype.display = function(){

}

var worldRun1 = function(){
  console.log('starting world simulation 1')
  var worldView = canvasSetup('worldView')
  $('.displays').append(worldView)

  world = new World()
  iterator(1, function(){
    world.checkEdges()
    world.update()
    world.display()
  }, 1)
}
