function Walker(args){
  args = args || {}
  this.x = args.x || 0
  this.y = args.y || 0
  this.canvas = args.canvas || $('canvas').first()
};

Walker.prototype.display = function(){

}
