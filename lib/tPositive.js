module.exports = function(expected, actual, options){
  var tolerance = (options && options.tolerance) || null;
  var floatPrecision = (options && options.floatPrecision) ||10000;

  var tPositive = 0, j = 0;
  
  if(actual.length === 0){
    return tPositive;
  }
  
  var type = typeof(actual[0]);
  
  if(type === "string"){
    
    
    if(typeof(tolerance) === 'number'){
      throw (new Error('Tolerance is not working with type string'))
    }
    var sortedExpected = expected.sort(function(a, b){return ('' + a).localeCompare(b);});
    var sortedActual = actual.sort(function(a, b){return ('' + a).localeCompare(b);});

    for(var i = 0; i < actual.length; i++){
      while(actual[i].localeCompare(expected[j]) > 0 && j < expected.length){
        j++;
      }

      if(actual[i].localeCompare(expected[j]) === 0){
        tPositive++;
        j++; //each expected can be counted only once
      }
    }
  } else if(type === 'number'){
    if(typeof(tolerance) !== 'number'){
      tolerance = 0;
    }    
    var sortedExpected = expected.sort(function(a, b){return a-b;});
    var sortedActual = actual.sort(function(a, b){return a-b;});
    for(var i = 0; i < actual.length; i++){
      while((sortedActual[i] - tolerance) > sortedExpected[j] && j < sortedExpected.length){
        j++;
      }

      if(Math.abs(floatPrecision*sortedActual[i] - floatPrecision*sortedExpected[j]) <= floatPrecision*tolerance){
        tPositive++;
        j++; //each expected can be counted only once
      }

    }    
  } else {
    throw (new Error('type '+type+' is not implemented yet'))
  }

  

  return tPositive;

};
