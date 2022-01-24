module.exports = function(expected, actual, options){
  var tolerance = (options && options.tolerance) || null;
  var floatPrecision = (options && options.floatPrecision) ||10000;
  var tPositive = 0, j = 0;
  
  if(actual.length === 0){
    if(options.format === 'detailed'){
      return [];
    } else {
      return 0;
    }
  }
  
  const tPositiveIndexes = [];

  var type = typeof(actual[0]);
  
  if(type === "string"){
    
    
    if(typeof(tolerance) === 'number'){
      throw (new Error('Tolerance is not working with type string'))
    }
    var sortedExpected = expected.map((value, index) => ({value, index})).sort(function(a, b){return ('' + a.value).localeCompare(b.value);});
    var sortedActual = actual.map((value, index) => ({value, index})).sort(function(a, b){return ('' + a.value).localeCompare(b.value);});

    for(var i = 0; i < sortedActual.length; i++){
      while((j < sortedExpected.length) && (sortedActual[i].value.localeCompare(sortedExpected[j].value) > 0)){
        j++;
      }

      if((j < sortedExpected.length) && sortedActual[i].value.localeCompare(sortedExpected[j].value) === 0){
        tPositiveIndexes.push([sortedExpected[j].value, sortedActual[i].index])
        j++; //each expected can be counted only once
      }
    }
  } else if(type === 'number'){
    if(typeof(tolerance) !== 'number'){
      tolerance = 0;
    }    
    var sortedExpected = expected.map((value, index) => ({value, index})).sort(function(a, b){return a.value-b.value;});
    var sortedActual = actual.map((value, index) => ({value, index})).sort(function(a, b){return a.value-b.value;});
    for(var i = 0; i < sortedActual.length; i++){
      while(j < sortedExpected.length && (sortedActual[i].value - tolerance) > sortedExpected[j].value){
        j++;
      }

      if((j < sortedExpected.length) && Math.abs(floatPrecision*sortedActual[i].value - floatPrecision*sortedExpected[j].value) <= floatPrecision*tolerance){
        tPositiveIndexes.push([sortedExpected[j].index,sortedActual[i].index])
        j++; //each expected can be counted only once
      }
    }    
  } else {
    throw (new Error('type '+type+' is not implemented yet'))
  }
  
  if(options && options.format === 'detailed'){
    return tPositiveIndexes;
  } else {
    return tPositiveIndexes.length;
  }
};
