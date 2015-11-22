function gaussianBoxMuller(mean, sigma){
  mean = Number(mean) || 0
  sigma = Number(sigma) || 1
  var twoPi = 2* 3.141592
  var thet = twoPi*Math.random()
  var rad = Math.pow(-2* Math.log(Math.random()), .5)
  var normalDistribution = rad* Math.sin(thet)
  return mean + normalDistribution*sigma
};

var arbitraryDistro = function(weightFunction){
  //weight function should be a function of 1 variable that takes a number between 0 and 1, and maps it to 0 and 1
  // possible enhancement would be to enable caching of the previously used weight function.
  weightFunction = weightFunction || function(i){return i}
  while(true){
    var output = Math.random();
    var threshold = weightFunction(sample);
    var sample = Math.random();
    if(sample < threshold){ return output};
  };
};

var quadCurve = function(i){
  return i*i
};

var expoCurve= function(i){
  return (Math.E**i-1)/(Math.E-1)
}
