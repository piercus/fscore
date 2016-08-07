module.exports = function(expected, actual, options){
  var tolerance = (options && options.tolerance) || 0;
  var floatPrecision = (options && options.floatPrecision) ||10000;

  var sortedExpected = expected.sort();
  var sortedActual = actual.sort();

  var tPositive = 0, j = 0;

  for(var i = 0; i < actual.length; i++){
    while((sortedActual[i] - tolerance) > sortedExpected[j]){
      j++;
    }
    //console.log(sortedActual[i],sortedExpected[j], Math.abs(floatPrecisionsortedActual[i] - sortedExpected[j]), tolerance);
    if(Math.abs(floatPrecision*sortedActual[i] - floatPrecision*sortedExpected[j]) <= floatPrecision*tolerance){
      tPositive++;
      j++; //each expected can be counted only once
    }
  }

  return tPositive;

};
