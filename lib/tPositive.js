module.exports = function(expected, actual, options){
  var tolerance = (options && options.tolerance) || 0;
  var floatPrecision = (options && options.floatPrecision) ||10000;

  var sortedExpected = expected.sort(function(a, b){return a-b;});
  var sortedActual = actual.sort(function(a, b){return a-b;});

  var tPositive = 0, j = 0;

  for(var i = 0; i < actual.length; i++){

    while((sortedActual[i] - tolerance) > sortedExpected[j]){
      j++;
    }

    if(Math.abs(floatPrecision*sortedActual[i] - floatPrecision*sortedExpected[j]) <= floatPrecision*tolerance){
      tPositive++;
      j++; //each expected can be counted only once
    }

  }

  return tPositive;

};
