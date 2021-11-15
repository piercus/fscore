var tP = require("./tPositive.js")

module.exports = function(expected, actual, options, tPositive){
  if(typeof(tPositive) !== "number"){
    tPositive = tP(expected, actual, options);
  }
  
  if(options && options.format === 'detailed'){
    const tPositiveActualItems = tPositive.map(a => a[1]);
    return {
      tPositiveIndexes: tPositive,
      fPositiveIndexes: actual.map((value, index) => ({value, index})).filter((_,index) => !tPositiveActualItems.includes(index)).map(({index}) => index),
      precision: tPositive.length / actual.length
    }
  } else {
    return tPositive/actual.length;
  }
};